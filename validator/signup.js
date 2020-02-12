const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateSignupInput(data) {
  let errors = {};

  data.fname = !isEmpty(data.fname) ? data.fname : "";
  data.lname = !isEmpty(data.lname) ? data.lname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.role = !isEmpty(data.role) ? data.role : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isLength(data.fname, { min: 2, max: 30 })) {
    errors.fname = "Must be between 2 to 30 characters";
  }
  if (Validator.isEmpty(data.fname)) {
    errors.fname = "First Name field is required";
  }
  if (!Validator.isLength(data.lname, { min: 2, max: 30 })) {
    errors.lname = "Must be between 2 to 30 characters";
  }
  if (Validator.isEmpty(data.lname)) {
    errors.lname = "Last Name field is required";
  }
  if (Validator.isEmpty(data.role)) {
    errors.role = "Role field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters long";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
