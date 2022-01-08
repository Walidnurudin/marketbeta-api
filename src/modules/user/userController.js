const userModel = require("./userModel");
const responseWrapper = require("../../helper/wrapper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, gender, password } = req.body;

      if (!name || !email || !gender || !password) {
        return responseWrapper.response(
          res,
          400,
          "Please complete all field",
          null
        );
      }

      const emailUser = await userModel.findOne({ email: email });
      if (emailUser) {
        return responseWrapper.response(res, 400, "Email already exist", null);
      }

      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(password, salt);

      const result = await userModel.create({
        name,
        email,
        gender,
        password: passwordHash,
      });

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

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return responseWrapper.response(
          res,
          400,
          "Please complete all field",
          null
        );
      }

      const user = await userModel.findOne({ email: email });
      if (!user) {
        return responseWrapper.response(res, 400, "Email not registered", null);
      }

      const isPassword = bcrypt.compareSync(password, user.password);
      if (!isPassword) {
        return responseWrapper.response(res, 400, "Wrong password", null);
      }

      const newUser = { ...user.toObject() };
      delete newUser.password;

      const token = jwt.sign({ ...newUser }, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });

      return responseWrapper.response(res, 200, "Success login", {
        id: newUser._id,
        token,
      });
    } catch (error) {
      return responseWrapper.response(
        res,
        400,
        `Bad request: ${error.message}`,
        null
      );
    }
  },

  getUser: async (req, res) => {
    try {
      const { _id } = req.decodeToken;

      const user = await userModel.findOne({ _id: _id });
      if (!user) {
        return responseWrapper.response(
          res,
          404,
          `User by id ${_id} not found!`,
          null
        );
      }

      const newUser = { ...user.toObject() };
      delete newUser.password;
      delete newUser.__v;

      return responseWrapper.response(
        res,
        200,
        "Success get data user",
        newUser
      );
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
