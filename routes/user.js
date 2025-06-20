const { signUpController, loginController } = require("../controllers/authController");
const { signUpValidation, loginValidation } = require("../Middlewares/authValidation");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("WELCOME FREEMIUM");
});

router.post("/login", loginValidation, loginController);

router.post("/signup", signUpValidation, signUpController );

router.post("/logout", (req, res) => {
  res.send("logout page");
});

module.exports = router;
