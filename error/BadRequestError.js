const CustomError = require("./CustomError");
const { StatusCodes } = require("http-status-codes");

class BadRequestError extends CustomError {
  constructor(message) {
    super(message);
    this.status = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
