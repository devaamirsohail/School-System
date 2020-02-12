//import user model
const User = require("../models/User");

//import validator
const validateSignupInput = require("../validator/signup");

//Test Controller
exports.test = (req, res) => {
  return res.status(400).json("Test");
};
//Test Controller
exports.signup = (req, res) => {
  return res.status(400).json("Test");
};
