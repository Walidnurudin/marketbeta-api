const userModel = require("./userModel");
const responseWrapper = require("../../helper/wrapper");

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, gender, password } = req.body;

      const emailUser = await userModel.findOne({ email: email });
      if (emailUser) {
        return responseWrapper.response(res, 400, "Email already exist", null);
      }

      const result = await userModel.create({ name, email, gender, password });

      return responseWrapper.response(res, 200, "Success register", result);
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
