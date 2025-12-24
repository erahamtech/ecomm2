const Review = require("../models/review.models");
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const ApiError = require("../utils/api-error");
const ApiResponse = require("../utils/response");
const asyncHandler = require("../utils/async-handler");
const ORDER_STATUS = require("../constants/order-status");

exports.createReview = asyncHandler(async (req, res) => {
  const { productId, rating, comment } = req.body;

  const hasPurchased = await Order.exists({
    user: req.user._id,
    "items.product": productId,
    status: ORDER_STATUS.DELIVERED
  });

  const isVerified = !!hasPurchased;

  const review = await Review.create({
    product: productId,
    user: req.user._id,
    rating,
    comment,
    isVerifiedPurchase: isVerified
  });

  // recompute product rating
  const agg = await Review.aggregate([
    { $match: { product: review.product } },
    {
      $group: {
        _id: "$product",
        avgRating: { $avg: "$rating" },
        total: { $sum: 1 }
      }
    }
  ]);

  const stats = agg[0];
  await Product.findByIdAndUpdate(productId, {
    averageRating: stats?.avgRating || 0,
    totalReviews: stats?.total || 0
  });

  res.status(201).json(new ApiResponse(true, review, "Review added"));
});
