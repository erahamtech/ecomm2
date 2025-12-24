const Cart = require("../models/cart.models");
const Product = require("../models/product.model");
const ApiError = require("../utils/api-error");
const ApiResponse = require("../utils/response");
const asyncHandler = require("../utils/async-handler");

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
};

// Add or update cart item
exports.addItem = asyncHandler(async (req, res) => {
  const { productId, variantId, quantity = 1 } = req.body;
  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, "Product not found");
  
  const variant = product.variants.id(variantId);

  if (!variant) {
  // if (!variant || !variant.isActive) {
    throw new ApiError(404, "Variant not found");
  }

  if (quantity > variant.stock) {
    throw new ApiError(400, "Insufficient stock");
  }

  const cart = await getOrCreateCart(req.user._id);

  const existing = cart.items.find(
    (i) => i.product.toString() === productId && i.variantId.toString() === variantId
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ product: productId, variantId, quantity });
  }

  await cart.save();
  res.json(new ApiResponse(true, cart, "Cart updated"));
});

exports.removeItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const cart = await getOrCreateCart(req.user._id);

  cart.items.id(itemId)?.remove();
  await cart.save();

  res.json(new ApiResponse(true, cart, "Item removed"));
});

exports.getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product"
  );
  res.json(new ApiResponse(true, cart || { items: [] }));
});

// Merge guest cart into user cart
exports.mergeGuestCart = asyncHandler(async (req, res) => {
  const { guestItems = [] } = req.body;
  const cart = await getOrCreateCart(req.user._id);

  for (const gi of guestItems) {
    const existing = cart.items.find(
      (i) =>
        i.product.toString() === gi.productId &&
        i.variantId.toString() === gi.variantId
    );
    if (existing) existing.quantity += gi.quantity;
    else
      cart.items.push({
        product: gi.productId,
        variantId: gi.variantId,
        quantity: gi.quantity
      });
  }

  await cart.save();
  res.json(new ApiResponse(true, cart, "Cart merged"));
});
