const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const { ROLE_ADMIN } = require("../constants/roles");
const adminController = require("../controllers/admin.controller");

router.use(auth, authorize(ROLE_ADMIN));

router.get("/analytics", adminController.getAnalytics);
router.get("/orders/export", adminController.exportOrdersCsv);

module.exports = router;
