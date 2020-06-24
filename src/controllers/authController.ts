import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import Validator from "validator";
import * as expressJwt from "express-jwt";

import { JWT_SECRET } from "../config/constants";
import { conn } from "../config/mysql";

//import validator
import isEmpty from "../validator/is-empty";

import { IUser } from "../Interfaces/user.interface";

export class authController {
  //Register Controller

  Register = async (req: Request, res: Response) => {
    const { errors, isValid } = this.validateRegisterInput(req.body);

    //Check Validation
    if (isValid.includes(false)) {
      return res.status(400).json(errors);
    }
    //Register Controller
    const { fname, lname, email, role } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, async (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: "Something went wrong, try again!"
          });
        }
        const password = hash;
        conn.query(
          "SELECT * FROM users WHERE email = ?",
          email,
          (err, user) => {
            if (err) {
              return res.status(500).json({
                error: "Something went wrong, try again!"
              });
            }
            if (!user[0]) {
              conn.query(
                "INSERT INTO users SET ?",
                {
                  fname,
                  lname,
                  email,
                  role,
                  password
                },
                (err, user) => {
                  if (err) {
                    return res.status(500).json({
                      error: "Something went wrong, try again!"
                    });
                  }
                  res.json({
                    message: "User Registered Successfully."
                  });
                }
              );
            } else {
              errors.email = "Email already exists";
              return res.status(400).json(errors);
            }
          }
        );
      });
    });
  };
  //Login Controller
  Login = async (req: Request, res: Response) => {
    const { errors, isValid } = this.validateLoginInput(req.body);

    //Check Validation
    if (isValid.includes(false)) {
      return res.status(400).json(errors);
    }
    const { email, password } = req.body;
    //Check for user

    conn.query("SELECT * FROM users WHERE email = ?", email, (err, user) => {
      if (err) {
        return res.status(500).json({
          error: "Something went wrong, try again!"
        });
      }
      if (Object.keys(user[0]).length !== 0) {
        bcrypt.compare(password, user[0].password).then(isMatch => {
          //authenticate
          if (!isMatch) {
            errors.password = "Password incorrect";
            return res.status(400).json(errors);
          }
          // Sign token and send to user
          const token = jwt.sign(
            {
              id: user[0].id,
              role: user[0].role
            },
            JWT_SECRET,
            {
              expiresIn: "24h"
            }
          );
          const { id, fname, lname, email } = user[0];
          return res.json({
            token,
            user: { id, fname, lname, email }
          });
        });
      } else {
        return res.status(400).json({
          error: "User not found, Please Signup."
        });
      }
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
  //Authenticate user with token
  requireSignin = expressJwt({
    credentialsRequired: true,
    secret: JWT_SECRET //req.user
  });
}
