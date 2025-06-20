const Joi = require("joi");

const signUpValidation = async (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(100).required(),

    fullname: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(50).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: "Bad request", error: error.details[0].message });
  }

  next();
};

const loginValidation = async (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(100),
    email: Joi.string().email(),
    password: Joi.string().min(6).max(50).required(),
  }).xor("username", "email"); 

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: "Bad request", error: error.details[0].message });
  }

  next();
};

module.exports = { signUpValidation, loginValidation };
