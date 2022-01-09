const responseWrapper = require("../helper/wrapper");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  authentication: async (req, res, next) => {
    let token = req.headers.authorization;
     if (!token) {
      return responseWrapper.response(res, 403, "Please login first");
    }

    token = token.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
      if (err) {
        return responseWrapper.response(res, 400, err.message);
      }

      req.decodeToken = result;
      next();
    });
  },
};
