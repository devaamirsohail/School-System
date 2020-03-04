import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import Validator from "validator";

import { JWT_SECRET } from "../config/constants";

//import validator
import isEmpty from "../validator/is-empty";

//import user model
import User from "../models/User";

import { IUser } from "../models/User";

export class authController {
  //Register Controller
  Register = (req: Request, res: Response) => {
    const { errors, isValid } = this.validateRegisterInput(req.body);

    //Check Validation
    if (isValid.includes(false)) {
      return res.status(400).json(errors);
    }
    //Register Controller
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
              .catch(err => {
                console.log(err);
                res.json({
                  error:
                    "Error in saving user to database, please signup again."
                });
              });
          });
        });
      }
    });
  };
  //Login Controller
  Login = (req: Request, res: Response) => {
    const { errors, isValid } = this.validateLoginInput(req.body);

    //Check Validation
    if (isValid.includes(false)) {
      return res.status(400).json(errors);
    }
    const { email, password } = req.body;
    //Check for user
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return res.status(400).json({
            error: "User not found, Please Signup."
          });
        }
        //Check Password
        bcrypt
          .compare(password, user.password)
          .then(isMatch => {
            //authenticate
            if (!isMatch) {
              errors.password = "Password incorrect";
              return res.status(400).json(errors);
            }
            // Sign token and send to user
            const token = jwt.sign(
              {
                _id: user._id,
                role: user.role
              },
              JWT_SECRET,
              {
                expiresIn: "24h"
              }
            );
            const { _id, fname, lname, email } = user;
            return res.json({
              token,
              user: { _id, fname, lname, email }
            });
          })
          .catch(err => {
            console.log(err);
            return res.json({
              message: "Something went wrong, Please try again."
            });
          });
      })
      .catch(err => {
        console.log("Signin Error:", err);
        return res.json({
          message: "Something went wrong, Please try again."
        });
      });
  };

  //Validate Register Inputs
  validateRegisterInput = (data: IUser): any => {
    let errors = {
      fname: "",
      lname: "",
      email: "",
      role: "",
      password: ""
    };
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
  //Validate Login Inputs
  validateLoginInput = (data: IUser): any => {
    let errors = {
      email: "",
      password: ""
    };

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
    if (Validator.isEmpty(data.email)) {
      errors.email = "Email field is required";
    }

    if (Validator.isEmpty(data.password)) {
      errors.password = "Password field is required";
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  };
}
