const router = require("express").Router();
const userController = require("./userController");
const middlewareAuth = require("../../middleware/auth");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/", middlewareAuth.authentication, userController.getUser);

module.exports = router;
