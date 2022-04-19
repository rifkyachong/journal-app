const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../error");

const User = require("../model/User");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.generateToken();

  res.status(StatusCodes.CREATED).json({ username: user.username, token });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ username });

  if (!user) {
    throw new UnauthenticatedError("User hasn't been registered");
  }

  const isCorrectPassword = await user.comparePassword(password);
  if (!isCorrectPassword) {
    throw new UnauthenticatedError("Invalid password");
  }

  const token = user.generateToken();

  res.json({ username: user.username, token });
};

module.exports = { register, login };
