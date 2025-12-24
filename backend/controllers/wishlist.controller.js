const User = require("../models/user.model");
const ApiResponse = require("../utils/response");
const asyncHandler = require("../utils/async-handler");

exports.toggleWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  const user = await User.findById(req.user._id);

  const index = user.wishlist.findIndex(
    (p) => p ? p.toString() === productId : p
  );

  if (index > -1) {
    user.wishlist.splice(index, 1);
  } else {
    user.wishlist.push(productId);
  }

  await user.save();

  res.json(new ApiResponse(true, user.wishlist, "Wishlist updated"));
});

exports.getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist");
  res.json(new ApiResponse(true, user.wishlist));
});
