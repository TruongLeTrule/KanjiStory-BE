const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, password } = req.body;

  // const salt = await bcrypt.genSalt(10);
  // const hashPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({ username, password });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: err });
  }
};

const login = async (request, response) => {
  const user = await User.findOne({ email: request.body.email });
  if (!user)
    return response.status(422).send("Email or Password is not correct");

  const checkPassword = await bcrypt.compare(
    request.body.password,
    user.password
  );

  if (!checkPassword)
    return response.status(422).send("Email or Password is not correct");

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24,
  });
  response.header("auth-token", token).send(token);
};

module.exports = { register, login };
