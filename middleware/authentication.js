const { UnauthenticatedError } = require("../error");
const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const authHeader = req.headers.authentication;
  if (!authHeader) {
    throw new UnauthenticatedError("Need authentication to access this route");
  }

  if (!authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("token is needed");
  }

  const submittedToken = authHeader.split(" ")[1];
  const decoded = jwt.verify(submittedToken, process.env.JWT_SECRET);
  console.log(decoded);

  next();
};

module.exports = authentication;
