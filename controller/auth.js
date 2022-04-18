const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../error");

const User = require("../model/User");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.generateToken();

  res.status(StatusCodes.CREATED).json({ token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.find({ email });

  if (!user) {
    throw new UnauthenticatedError("User hasn't been registered");
  }

  const isCorrectPassword = await user.comparePassword(password);
  if (!isCorrectPassword) {
    throw new UnauthenticatedError("Invalid password");
  }

  const token = user.generateToken();

  res.json({ token });
};

module.exports = { register, login };
