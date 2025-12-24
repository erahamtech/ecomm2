const ApiError = require("../utils/api-error");
const { verifyAccessToken } = require("../utils/jwt");
const User = require("../models/user.model");

const auth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) throw new ApiError(401, "Not authenticated");

    const decoded = verifyAccessToken(token);
    const user = await User.findById(decoded.sub).select("isActive role addresses");

    if (!user || !user.isActive) {
      throw new ApiError(401, "User not found or inactive");
    }

    req.user = user;
    next();
  } catch (err) {
    console.log("err:", err)
    next(new ApiError(401, "Invalid or expired token"));
  }
};

module.exports = auth;
