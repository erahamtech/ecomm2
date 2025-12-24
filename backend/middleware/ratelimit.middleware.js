const rateLimit = require("express-rate-limit");

const baseRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false
});

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many auth attempts, please try again later"
});

module.exports = { baseRateLimiter, authRateLimiter };
