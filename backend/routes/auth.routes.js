const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const validate = require("../middleware/validate.middleware");
const { authRateLimiter } = require("../middleware/ratelimit.middleware");
// const {
//   registerSchema,
//   loginSchema,
//   otpRequestSchema,
//   otpVerifySchema
// } = require("../validators/auth.validators");
const auth = require("../middleware/auth.middleware");

// router.post(
//   "/register",
//   authRateLimiter,
//   // validate(registerSchema),
//   authController.register
// );

// router.post(
//   "/login",
//   authRateLimiter,
//   // validate(loginSchema),
//   authController.login
// );

router.post(
  "/otp/request",
  authRateLimiter,
  // validate(otpRequestSchema),
  authController.requestOtp
);

router.post(
  "/otp/verify",
  authRateLimiter,
  // validate(otpVerifySchema),
  authController.verifyOtp
);

router.post("/refresh-token", authController.refreshToken);

router.post("/logout", auth, authController.logout);

module.exports = router;
