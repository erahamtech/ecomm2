const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const cartController = require("../controllers/cart.controller");

router.use(auth);

router.get("/", cartController.getCart);
router.post("/add", cartController.addItem);
router.delete("/items/:itemId", cartController.removeItem);
router.post("/merge", cartController.mergeGuestCart);

module.exports = router;
