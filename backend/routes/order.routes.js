const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const orderController = require("../controllers/order.controller");

// User
router.use(auth);
router.post("/", orderController.createOrder);
router.get("/mine", orderController.listMyOrders);
router.post("/:id/cancel", orderController.cancelOrder);

// Webhook (no auth but secured by signature)
router.post("/phonepe/webhook", orderController.phonepeWebhook);

module.exports = router;
