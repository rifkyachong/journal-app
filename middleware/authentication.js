const { UnauthenticatedError } = require("../error");
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new UnauthenticatedError("Authentication Invalid"));
  }

  const submittedToken = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(submittedToken, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId, username: decoded.username };
  } catch (error) {
    return next(new UnauthenticatedError("Authentication Invalid"));
  }
  next();
};

module.exports = authentication;
