const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const userController = require("../controllers/user.controller");

router.use(auth);

router.get("/me", userController.getProfile);
router.put("/me", userController.updateProfile);

router.post("/addresses", userController.addAddress);
router.put("/addresses/:addressId", userController.updateAddress);
router.delete("/addresses/:addressId", userController.deleteAddress);

module.exports = router;
