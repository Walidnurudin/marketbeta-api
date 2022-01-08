const router = require("express").Router();
const productController = require("./productController");
const middlewareAuth = require("../../middleware/auth");

router.get("/", middlewareAuth.authentication, productController.getAllProduct);
router.post(
  "/",
  middlewareAuth.authentication,
  productController.createProduct
);
router.patch(
  "/:id",
  middlewareAuth.authentication,
  productController.updateProduct
);
router.delete(
  "/:id",
  middlewareAuth.authentication,
  productController.deleteProduct
);

module.exports = router;
