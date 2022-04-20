const { CustomError } = require("../error");
const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  console.log(err);
  let customError = {
    status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, please try again later",
  };

  // Duplicate Value Error
  if (err.code && err.code === 11000) {
    customError.status = StatusCodes.BAD_REQUEST;
    customError.msg = `Duplicate value for ${Object.keys(
      err.keyValue
    )} field, please enter another value.`;
  }

  // Validation Error
  if (err.name && err.name === "ValidationError") {
    customError.msg = err.message;
    customError.status = StatusCodes.BAD_REQUEST;
  }

  // Cast Error
  if (err.name && err.name === "CastError") {
    customError.status = StatusCodes.NOT_FOUND;
    customError.msg = `No item with id: ${err.value}`;
  }

  return res.status(customError.status).json({ msg: customError.msg });
};

module.exports = errorHandler;
