const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    maxlength: [50, "Username should at most 50 characters"],
    minlength: [3, "Username should at least 3 characters"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: [6, "Password should at least 6 characters"],
  },
  email: {
    type: String,
    required: [true, `Please provide an email`],
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.post("save", function (error, doc, next) {
  console.log(error);
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(error);
  } else {
    next();
  }
});

userSchema.methods.generateToken = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

userSchema.methods.comparePassword = async function (insertedPassword) {
  return bcrypt.compare(insertedPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
