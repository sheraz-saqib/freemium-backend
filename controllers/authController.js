const bcrypt = require("bcrypt");
const UserModal = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Op } = require("sequelize");

const signUpController = async (req, res) => {
  try {
    const { username, fullname, email, password } = req.body;

    const existingUser = await UserModal.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModal.create({
      username,
      fullname,
      email,
      password: hashedPassword,
      isActive: true,
    });

    return res
      .status(201)
      .json({ message: "Signup successful", success: true });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

const loginController = async (req, res) => {
  const errorMsg = "Authentication failed, something is wrong";

  try {
    const { username, email, password } = req.body;

    if (!password || (!email && !username)) {
      return res.status(400).json({
        message: "Please provide email or username and password",
        success: false,
      });
    }

    // Find user by either email or username
    const existingUser = await UserModal.findOne({
      where: {
        [Op.or]: [
          email ? { email } : null,
          username ? { username } : null,
        ].filter(Boolean),
      },
    });

    if (!existingUser) {
      return res.status(409).json({ message: errorMsg, success: false });
    }

  

    const isPasswordEqual = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordEqual) {
      return res.status(409).json({ message: errorMsg, success: false });
    }

   

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser.id },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      user: {
        id: existingUser.id,
        email: existingUser.email,
        username: existingUser.username,
        name: existingUser.fullname,
      },
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

module.exports = { signUpController, loginController };
