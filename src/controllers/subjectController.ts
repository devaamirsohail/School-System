import { Request, Response } from "express";
import Validator from "validator";

import { conn } from "../config/mysql";

//import validator
import isEmpty from "../validator/is-empty";

import { ISubject } from "../Interfaces/subject.interface";

export class subjectController {
  //Add Subject Controller
  AddSubject = async (req: Request, res: Response) => {
    const { errors, isValid } = this.validateAddSubjectInput(req.body);

    //Check Validation
    if (isValid.includes(false)) {
      return res.status(400).json(errors);
    }
    //Register Controller
    const newSubject: ISubject = req.body;

    conn.query("INSERT INTO subjects SET?", [newSubject], (err, subject) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: "Something went wrong, try again!"
        });
      }
      res.json({
        message: "Subject Added Successfully"
      });
    });
  };

  //Get All Subject Controller
  GetAllSubjects = (req: Request, res: Response) => {
    conn.query("SELECT * FROM subjects", (err, subjects) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          error: "Something went wrong, try again!"
        });
      }
      if (subjects.length < 1) {
        return res.status(404).json({
          error: "No Subject Found!"
        });
      }
      res.json(subjects);
    });
  };
  //Get Single Subject Controller
  GetSubject = (req: Request, res: Response) => {
    conn.query(
      "SELECT * FROM subjects WHERE id = ?",
      req.query.id,
      (err, subject) => {
        if (err) {
          return res.status(500).json({
            error: "Something went wrong, try again!"
          });
        }
        if (subject.length < 1) {
          return res.status(404).json({
            error: "Subject not found!"
          });
        }
        res.json(subject[0]);
      }
    );
  };

  //Delete Subject Controller
  DeleteSubject = (req: Request, res: Response) => {
    conn.query(
      "DELETE FROM subjects WHERE id = ?",
      req.query.id,
      (err, result) => {
        if (err) {
          return res.status(500).json({
            error: "Something went wrong, try again!"
          });
        }
        if (result.affectedRows < 1) {
          return res.status(404).json({
            error: "Subject not found!"
          });
        }
        res.json({
          success: true
        });
      }
    );
  };

  //Validate Add Subject Inputs
  validateAddSubjectInput = (data: ISubject): any => {
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
