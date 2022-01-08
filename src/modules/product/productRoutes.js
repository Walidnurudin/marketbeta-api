const router = require("express").Router();
const productController = require("./productController");
const middlewareAuth = require("../../middleware/auth");

router.post(
  "/",
  middlewareAuth.authentication,
  productController.createProduct
);

module.exports = router;
