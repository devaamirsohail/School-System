import { Request, Response } from "express";
import Validator from "validator";

//import validator
import isEmpty from "../validator/is-empty";

//import user model
import Classes from "../models/Classes";
import { conn } from "../config/mysql";

import { IClass } from "../Interfaces/classes.interface";

export class classController {
  //Add Class Controller
  AddClass = (req: Request, res: Response) => {
    const { errors, isValid } = this.validateAddClassInput(req.body);

    //Check Validation
    if (isValid.includes(false)) {
      return res.status(400).json(errors);
    }

    //Register Controller
    const classFields: IClass = req.body;
    conn.query("INSERT INTO classes SET?", [classFields], (err, classes) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: "Error in saving class to database, try again."
        });
      }
      res.json({
        message: "Class Added Successfully"
      });
    });
  };

  //Get All Classes Controller
  GetAllClasses = (req: Request, res: Response) => {
    conn.query("SELECT * FROM classes", (err, classes) => {
      if (err) {
        return res.status(500).json({
          error: "Something went wrong, try again!"
        });
      }
      if (classes.length < 1) {
        return res.status(404).json({
          error: "Class not found!"
        });
      }
      console.log(err);
      res.json(classes);
    });
  };
  //Get Single Classes Controller
  GetClass = (req: Request, res: Response) => {
    conn.query(
      "SELECT * FROM classes WHERE id = ?",
      req.query.id,
      (err, classes) => {
        if (err) {
          return res.status(500).json({
            error: "Something went wrong, try again!"
          });
        }

        if (classes.length < 1) {
          return res.status(404).json({
            error: "Class not found!"
          });
        }
        res.json(classes[0]);
      }
    );
  };

  //Update Classes Controller
  UpdateClass = (req: Request, res: Response) => {
    const { errors, isValid } = this.validateAddClassInput(req.body);

    //Check Validation
    if (isValid.includes(false)) {
      return res.status(400).json(errors);
    }

    //Register Controller
    let classFields: IClass = req.body;
    conn.query(
      "UPDATE classes set ? WHERE id = ?",
      [classFields, req.query.id],
      (err, classes) => {
        if (err) {
          return res.status(500).json({
            error: "Something went wrong, try again!"
          });
        }
        if (classes.affectedRows < 1) {
          return res.status(404).json({
            error: "Class not found!"
          });
        }
        res.json(classes);
      }
    );
  };
  //Delete Classes Controller
  DeleteClass = (req: Request, res: Response) => {
    conn.query(
      "DELETE FROM classes WHERE id = ?",
      req.query.id,
      (err, result) => {
        if (err) {
          return res.status(500).json({
            error: "Something went wrong, try again!"
          });
        }
        if (result.affectedRows < 1) {
          return res.status(404).json({
            error: "Class not found!"
          });
        }
        res.json({
          message: "Class deleted Successfully"
        });
      }
    );
  };
  //Validate Add Classes Inputs
  validateAddClassInput = (data: IClass): any => {
    let errors = {
      title: ""
    };
    data.title = !isEmpty(data.title) ? data.title : "";

    if (Validator.isEmpty(data.title)) {
      errors.title = "Title is required";
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  };
}
