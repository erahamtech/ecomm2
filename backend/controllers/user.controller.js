const User = require("../models/user.model");
const ApiError = require("../utils/api-error");
const ApiResponse = require("../utils/response");
const asyncHandler = require("../utils/async-handler");

exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(new ApiResponse(true, user));
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name },
    { new: true }
  );
  res.json(new ApiResponse(true, user, "Profile updated"));
});

exports.addAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.addresses.push(req.body);
  await user.save();
  res.json(new ApiResponse(true, user.addresses, "Address added"));
});

exports.updateAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;
  const user = await User.findById(req.user._id);

  const addr = user.addresses.id(addressId);
  if (!addr) throw new ApiError(404, "Address not found");

  Object.assign(addr, req.body);
  await user.save();
  res.json(new ApiResponse(true, user.addresses, "Address updated"));
});

exports.deleteAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;
  const user = await User.findById(req.user._id);

  const addr = user.addresses.id(addressId);
  if (!addr) throw new ApiError(404, "Address not found");

  addr.remove();
  await user.save();
  res.json(new ApiResponse(true, user.addresses, "Address deleted"));
});
