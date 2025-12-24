const dayjs = require("dayjs");
const User = require("../models/user.model");
const ApiError = require("../utils/api-error");
const ApiResponse = require("../utils/response");
const asyncHandler = require("../utils/async-handler");
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../utils/jwt");
const { generateOtp, hashOtp, sendOtp } = require("../utils/otp");

const setAuthCookies = (res, accessToken, refreshToken) => {
  const isProd = process.env.NODE_ENV === "production";

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    maxAge: 15 * 60 * 1000
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
};




// exports.register = asyncHandler(async (req, res) => {
//   const { email, phone, password, name } = req.body;

//   const existing = await User.findOne({
//     $or: [{ email }, { phone }]
//   });

//   if (existing) {
//     throw new ApiError(400, "User already exists with email or phone");
//   }

//   const user = await User.create({ email, phone, password, name });

//   const accessToken = generateAccessToken(user);
//   const refreshToken = generateRefreshToken(user, user.tokenVersion);

//   setAuthCookies(res, accessToken, refreshToken);

//   res.status(201).json(
//     new ApiResponse(true, {
//       user: {
//         id: user._id,
//         email: user.email,
//         phone: user.phone,
//         name: user.name,
//         role: user.role
//       },
//       accessToken,
//       refreshToken
//     })
//   );
// });




// exports.login = asyncHandler(async (req, res) => {
//   const { emailOrPhone, password } = req.body;

//   const user = await User.findOne({
//     $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
//   }).select("+password +isActive tokenVersion role");

//   if (!user) throw new ApiError(400, "Invalid credentials");
//   if (!user.isActive) throw new ApiError(403, "User is inactive");

//   const isMatch = await user.comparePassword(password);
//   if (!isMatch) throw new ApiError(400, "Invalid credentials");

//   const accessToken = generateAccessToken(user);
//   const refreshToken = generateRefreshToken(user, user.tokenVersion);

//   setAuthCookies(res, accessToken, refreshToken);

//   res.json(
//     new ApiResponse(true, {
//       user: {
//         id: user._id,
//         email: user.email,
//         phone: user.phone,
//         name: user.name,
//         role: user.role
//       },
//       accessToken,
//       refreshToken
//     })
//   );
// });

// OTP-based login/register
exports.requestOtp = asyncHandler(async (req, res) => {
  const { phone } = req.body;

  const otp = generateOtp();
  const otpHash = hashOtp(otp);
  const expires = dayjs().add(5, "minute").toDate();

  const user = await User.findOneAndUpdate(
    { phone },
    { phone, otpHash, otpExpiresAt: expires },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await sendOtp({ to: phone, otp });

  res.json(
    new ApiResponse(true, null, "OTP sent successfully")
  );
});

exports.verifyOtp = asyncHandler(async (req, res) => {
  const { phone, otp } = req.body;
  const otpHash = hashOtp(otp);

  const user = await User.findOne({ phone }).select(
    "+otpHash +otpExpiresAt tokenVersion"
  );
  if (!user || !user.otpHash) throw new ApiError(400, "Invalid OTP");

  if (user.otpHash !== otpHash) throw new ApiError(400, "Invalid OTP");
  if (user.otpExpiresAt < new Date()) throw new ApiError(400, "OTP expired");

  user.otpHash = undefined;
  user.otpExpiresAt = undefined;
  await user.save();

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, user.tokenVersion);

  setAuthCookies(res, accessToken, refreshToken);

  res.json(
    new ApiResponse(true, {
      user: {
        id: user._id,
        phone: user.phone,
        email: user.email,
        name: user.name,
        role: user.role
      },
      accessToken,
      refreshToken
    })
  );
});

exports.refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken || req.body.refreshToken;

  if (!token) throw new ApiError(401, "Refresh token missing");

  const decoded = verifyRefreshToken(token);

  const user = await User.findById(decoded.sub).select("tokenVersion role");
  if (!user) throw new ApiError(401, "User not found");

  if (user.tokenVersion !== decoded.tv) {
    throw new ApiError(401, "Token no longer valid");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, user.tokenVersion);

  setAuthCookies(res, accessToken, refreshToken);

  res.json(
    new ApiResponse(true, { accessToken, refreshToken }, "Token refreshed")
  );
});

exports.logout = asyncHandler(async (req, res) => {
  // bump tokenVersion to invalidate all refresh tokens
  if (req.user) {
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { tokenVersion: 1 }
    });
  }

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.json(new ApiResponse(true, null, "Logged out successfully"));
});
