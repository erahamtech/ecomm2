const mongoose = require("mongoose");
const Order = require("../models/order.model");
const Cart = require("../models/cart.models");
const Product = require("../models/product.model");
const Coupon = require("../models/coupons.models");
const ApiError = require("../utils/api-error");
const ApiResponse = require("../utils/response");
const asyncHandler = require("../utils/async-handler");
const ORDER_STATUS = require("../constants/order-status");
const { createPhonePeOrder, verifyPhonePeWebhook } = require("../utils/phonepe");

// Calculate totals + apply coupon
const calculateTotals = async (userId, couponCode) => {
  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, "Cart is empty");
  }

  let subtotal = 0;
  const orderItems = [];

  for (const item of cart.items) {
    const prod = item.product;
    const variant = prod.variants.id(item.variantId);
    // if (!variant || !variant.isActive) {
    if (!variant) {
      throw new ApiError(400, "Invalid item in cart");
    }
    if (variant.stock < item.quantity) {
      throw new ApiError(400, `Insufficient stock for ${prod.title}`);
    }

    const lineTotal = variant.price * item.quantity;
    subtotal += lineTotal;

    orderItems.push({
      product: prod._id,
      variantId: variant._id,
      title: prod.title,
      size: variant.size,
      color: variant.color,
      price: variant.price,
      quantity: item.quantity
    });
  }

  let discount = 0;
  let couponDoc = null;

  if (couponCode) {
    couponDoc = await Coupon.findOne({ code: couponCode, active: true });
    if (!couponDoc) throw new ApiError(400, "Invalid coupon");

    if (couponDoc.startsAt && couponDoc.startsAt > new Date()) {
      throw new ApiError(400, "Coupon not started yet");
    }
    if (couponDoc.expiresAt && couponDoc.expiresAt < new Date()) {
      throw new ApiError(400, "Coupon expired");
    }
    if (couponDoc.usageLimit && couponDoc.usedCount >= couponDoc.usageLimit) {
      throw new ApiError(400, "Coupon usage limit reached");
    }

    if (couponDoc.minOrderValue && subtotal < couponDoc.minOrderValue) {
      throw new ApiError(400, "Order value less than coupon min value");
    }

    if (couponDoc.type === "flat") {
      discount = couponDoc.value;
    } else {
      discount = (subtotal * couponDoc.value) / 100;
    }

    if (couponDoc.maxDiscount) {
      discount = Math.min(discount, couponDoc.maxDiscount);
    }
  }

  const total = Math.max(subtotal - discount, 0);

  return { orderItems, subtotal, discount, total, couponDoc, cart };
};

exports.createOrder = asyncHandler(async (req, res) => {
  const { addressId, couponCode } = req.body;

  const user = req.user;
  const address = user.addresses.id(addressId);
  if (!address) throw new ApiError(400, "Invalid address");

  // const session = await mongoose.startSession();
  // session.startTransaction();

  try {
    const { orderItems, subtotal, discount, total, couponDoc, cart } =
      await calculateTotals(user._id, couponCode);

    // Decrease stock
    for (const item of orderItems) {
      const prod = await Product.findById(item.product)
      // .session(session)

      const variant = prod.variants.id(item.variantId);
      if (variant.stock < item.quantity) {
        throw new ApiError(400, `Insufficient stock for ${prod.title}`);
      }
      variant.stock -= item.quantity;
      await prod.save();
      // await prod.save({ session });

      // You can check for low-stock and trigger alerts here
      if (variant.stock <= (prod.lowStockThreshold || 5)) {
        // TODO: send low-stock alert
      }
    }

    // Create order
    const order = await Order.create(
      [
        {
          user: user._id,
          items: orderItems,
          addressSnapshot: address.toObject(),
          subtotal,
          discount,
          total,
          coupon: couponDoc?._id
        }
      ],
      // { session }
    );

    const createdOrder = order[0];

    // Increment coupon usage
    if (couponDoc) {
      couponDoc.usedCount += 1;
      await couponDoc.save();
      // await couponDoc.save({ session });
    }

    // Clear cart
    cart.items = [];
    await cart.save();
    // await cart.save({ session });

    // Create PhonePe transaction
    // const phonepeRes = await createPhonePeOrder(createdOrder);
    // createdOrder.paymentReference = phonepeRes.data?.merchantTransactionId;
    // createdOrder.phonepeOrderId = phonepeRes.data?.transactionId;
    // await createdOrder.save({ session });
    await createdOrder.save();

    // await session.commitTransaction();
    // session.endSession();

    res.status(201).json(
      new ApiResponse(true, {
        orderId: createdOrder._id,
        // paymentUrl: phonepeRes.data?.instrumentResponse?.redirectInfo?.url
        paymentUrl: "http://localhost:5000/exapmle"
      })
    );
  } catch (err) {
    // await session.abortTransaction();
    // session.endSession();
    throw err;
  }
});

// PhonePe webhook (payment status)
exports.phonepeWebhook = asyncHandler(async (req, res) => {
  const valid = verifyPhonePeWebhook(req);
  if (!valid) {
    return res.status(400).send("Invalid signature");
  }

  const { merchantTransactionId, transactionId, code } = req.body.data;

  const order = await Order.findById(merchantTransactionId);
  if (!order) return res.status(404).send("Order not found");

  if (code === "PAYMENT_SUCCESS") {
    order.paymentStatus = "success";
    order.status = ORDER_STATUS.PAID;
  } else {
    order.paymentStatus = "failed";
    order.status = ORDER_STATUS.CANCELLED;

    // restore stock
    for (const item of order.items) {
      const prod = await Product.findById(item.product);
      const variant = prod.variants.id(item.variantId);
      variant.stock += item.quantity;
      await prod.save();
    }
  }

  order.paymentReference = transactionId;
  await order.save();

  res.status(200).send("OK");
});

// Order listing for user
exports.listMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort("-createdAt");
  res.json(new ApiResponse(true, orders));
});

// Cancel order (restore stock)
exports.cancelOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOne({ _id: id, user: req.user._id });

  if (!order) throw new ApiError(404, "Order not found");

  if (![ORDER_STATUS.PENDING, ORDER_STATUS.PAID].includes(order.status)) {
    throw new ApiError(400, "Order cannot be cancelled");
  }

  order.status = ORDER_STATUS.CANCELLED;
  await order.save();

  // restore stock
  for (const item of order.items) {
    const prod = await Product.findById(item.product);
    const variant = prod.variants.id(item.variantId);
    variant.stock += item.quantity;
    await prod.save();
  }

  res.json(new ApiResponse(true, order, "Order cancelled"));
});
