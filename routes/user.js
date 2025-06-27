const { signUpController, loginController } = require("../controllers/authController");
const { signUpValidation, loginValidation } = require("../Middlewares/authValidation");
const cookieAuthValidation = require("../Middlewares/cookieAuthValidation");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("WELCOME FREEMIUM");
});

router.post("/login", loginValidation, loginController);

router.post("/signup", signUpValidation, signUpController );

router.post("/logout", (req, res) => {
  res.send("logout page");
});

router.get("/products", cookieAuthValidation, (req, res) => {
  res.status(200).json([
    {
      name: "iphoneX",
      price: 45000
    },
    {
      name: "iphone11",
      price: 75000
    }
  ])
});

module.exports = router;
