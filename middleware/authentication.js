const { createCustomError } = require("../error/custom-error");
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  const authHeader = req.headers && req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      createCustomError("no token provided, authorization error", 401)
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.log("test");
    next(createCustomError("not authorized to access this route", 401));
  }
};

module.exports = authentication;
