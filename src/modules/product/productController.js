const productModel = require("./productModel");
const responseWrapper = require("../../helper/wrapper");

module.exports = {
  createProduct: async (req, res) => {
    try {
      const { name, price, desc } = req.body;

      if (!name || !price) {
        return responseWrapper.response(
          res,
          400,
          "Please completed field required",
          null
        );
      }

      await productModel.create({ name, price, desc });

      return responseWrapper.response(res, 200, "Success create product", null);
    } catch (error) {
      return responseWrapper.response(
        res,
        400,
        `Bad request: ${error.message}`,
        null
      );
    }
  },
};
