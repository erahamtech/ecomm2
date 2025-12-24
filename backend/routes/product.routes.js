const router = require("express").Router();
const productController = require("../controllers/product.controller");
const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const { ROLE_ADMIN, ROLE_SELLER } = require("../constants/roles");
const { upload } = require("../middleware/upload.middleware");

// Public
router.get("/", productController.listProducts);
router.get("/:id", productController.getProduct);

// Admin/Seller
router.post(
  "/",
  auth,
  authorize(ROLE_ADMIN, ROLE_SELLER),
  productController.createProduct
);
router.put(
  "/:id",
  auth,
  authorize(ROLE_ADMIN, ROLE_SELLER),
  productController.updateProduct
);
router.delete(
  "/:id",
  auth,
  authorize(ROLE_ADMIN, ROLE_SELLER),
  productController.deleteProduct
);

router.post(
  "/:id/images",
  auth,
  authorize(ROLE_ADMIN, ROLE_SELLER),
  upload.array("images", 5),
  productController.uploadProductImages
);

module.exports = router;
