// wishlist.routes.js
const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const wishlistController = require("../controllers/wishlist.controller");

router.use(auth);
router.get("/", wishlistController.getWishlist);
router.post("/toggle", wishlistController.toggleWishlist);

module.exports = router;