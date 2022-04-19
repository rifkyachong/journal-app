const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Untitled Journal",
      maxlength: 30,
    },
    textContent: {
      type: String,
      maxlength: 400,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Journal", JournalSchema);
