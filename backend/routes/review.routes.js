// review.routes.js
const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const reviewController = require("../controllers/review.controller");

router.use(auth);
router.post("/", reviewController.createReview);

module.exports = router;
