const jwt = require("jsonwebtoken");
require("dotenv").config();

const productAuth = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(400).json({ message: "Authentication failed" });
  }
  try {
    const decoded = jwt.verify(auth, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Authentication failed" });
  }
};

module.exports = productAuth;
