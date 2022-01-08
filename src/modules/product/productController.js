const productModel = require("./productModel");
const userModel = require("../user/userModel");
const responseWrapper = require("../../helper/wrapper");

module.exports = {
  getAllProduct: async (req, res) => {
    try {
      const data = await productModel
        .find({})
        .populate({ path: "userId", select: ["name", "email"] });

      return responseWrapper.response(
        res,
        200,
        "Success get all product",
        data
      );
    } catch (error) {
      return responseWrapper.response(
        res,
        400,
        "Please completed field required",
        null
      );
    }
  },

  createProduct: async (req, res) => {
    try {
      const { _id } = req.decodeToken;
      const { name, price, desc } = req.body;

      if (!name || !price) {
        return responseWrapper.response(
          res,
          400,
          "Please completed field required",
          null
        );
      }

      const user = await userModel.findOne({ _id: _id });

      const data = {
        userId: user._id,
        name,
        price,
        desc,
      };

      const product = await productModel.create(data);
      user.productId.push({ _id: product._id });
      await user.save();

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

  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, desc } = req.body;

      const data = {};

      name ? (data.name = name) : null;
      price ? (data.price = price) : null;
      desc ? (data.desc = desc) : null;

      await productModel.findOneAndUpdate({ _id: id }, { ...data });

      return responseWrapper.response(res, 200, `Success update product`, null);
    } catch (error) {
      return responseWrapper.response(
        res,
        400,
        `Bad request: ${error.message}`,
        null
      );
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await productModel.findOne({ _id: id });

      if (!product) {
        return responseWrapper.response(
          res,
          400,
          `Product by id ${id} not found!`,
          null
        );
      }

      await productModel.deleteOne({ _id: id });

      return responseWrapper.response(res, 200, "Success delete product", null);
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
