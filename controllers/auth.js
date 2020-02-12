const bcrypt = require("bcryptjs");

//import user model
const User = require("../models/User");

//import validator
const validateSignupInput = require("../validator/signup");

//Test Controller
exports.test = (req, res) => {
  return res.status(400).json("Test");
};
//Register Controller
exports.register = (req, res) => {
  const { errors, isValid } = validateSignupInput(req.body);
  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { fname, lname, email, role, password } = req.body;
  User.findOne({ email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({ fname, lname, email, role, password });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            return res.status(400).json({
              error: "Something went wrong, try again!"
            });
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err =>
              res.json({
                error: "Error in saving user to database, please signup again."
              })
            );
        });
      });
    }
  });
};
