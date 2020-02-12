const mongoose = require("mongoose");

//User Schema
const UserSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      trim: true,
      required: true,
      max: 50
    },
    lname: {
      type: String,
      trim: true,
      required: true,
      max: 50
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      max: 100
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: ""
    },
    resetPasswordLink: {
      data: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
