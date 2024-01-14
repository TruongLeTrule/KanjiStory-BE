const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Handle validation errors
const handleErr = (err) => {
  const errors = { username: "", password: "" };

  // If username already exists
  if (err.code === 11000) {
    errors.username = "Username already exists";
    return errors;
  }

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  if (err.message === "incorrect username") {
    errors.username = "Username doesn't exist";
  }

  if (err.message === "incorrect password") {
    errors.password = "Wrong password";
  }
  return errors;
};

const createToken = (id) => {
  return jwt.sign({ id }, "roaringleopard_secret");
};

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.create({ username, password });
    const token = createToken(user._id);
    res.status(201).json({ user: user._id, token });
  } catch (err) {
    const errors = handleErr(err);
    res.status(400).json({ errors });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.status(201).json({ user: user._id, token });
  } catch (error) {
    const errors = handleErr(error);
    res.status(400).json({ errors });
  }
};

module.exports = { register, login };
