import { Request, Response } from "express";
import Validator from "validator";

//import validator
import isEmpty from "../validator/is-empty";

//import user model
import Teacher from "../models/Teacher";
import { conn } from "../config/mysql";

import { ITeacher } from "../Interfaces/teacher.interface";

export class teacherController {
  //Add Teacher Controller
  AddTeacher = (req: Request, res: Response) => {
    const { errors, isValid } = this.validateAddTeacherInput(req.body);

    //Check Validation
    if (isValid.includes(false)) {
      return res.status(400).json(errors);
    }
    //Register Controller
    const teacherFields = req.body;

    conn.query("INSERT INTO teachers SET?", [teacherFields], (err, teacher) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: "Error in saving teacher to database, try again."
        });
      }
      res.json({
        message: "Teacher Added Successfully"
      });
    });
  };

  //Get All Teacher Controller
  GetAllTeachers = (req: Request, res: Response) => {
    conn.query("SELECT * FROM teachers", (err, teachers) => {
      if (err) {
        return res.status(500).json({
          error: "Something went wrong, try again!"
        });
      }
      if (teachers.length < 1) {
        return res.status(404).json({
          error: "No Teacher Found!"
        });
      }
      res.json(teachers);
    });
  };
  //Get Single Teacher Controller
  GetTeacher = (req: Request, res: Response) => {
    conn.query(
      "SELECT * FROM teachers WHERE id = ?",
      req.query.id,
      (err, teacher) => {
        if (err) {
          return res.status(500).json({
            error: "Something went wrong, try again!"
          });
        }
        if (teacher.length < 1) {
          return res.status(404).json({
            error: "Teacher not found!"
          });
        }
        res.json(teacher[0]);
      }
    );
  };

  //Update Teacher Controller
  UpdateTeacher = (req: Request, res: Response) => {
    const { errors, isValid } = this.validateAddTeacherInput(req.body);

    //Check Validation
    if (isValid.includes(false)) {
      return res.status(400).json(errors);
    }

    const teacherFields = req.body;
    conn.query(
      "UPDATE teachers set ? WHERE id = ?",
      [teacherFields, req.query.id],
      (err, teacher) => {
        if (err) {
          return res.status(500).json({
            error: "Error in updating  teacher to database, try again."
          });
        }
        if (teacher.affectedRows < 1) {
          return res.status(404).json({
            error: "Teacher not found!"
          });
        }
        res.json({
          message: "Teacher Updated Successfully"
        });
      }
    );
  };
  //Delete Teacher Controller
  DeleteTeacher = (req: Request, res: Response) => {
    conn.query(
      "DELETE FROM teachers WHERE id = ?",
      req.query.id,
      (err, result) => {
        if (err) {
          return res.status(500).json({
            error: "Something went wrong, try again!"
          });
        }
        if (result.affectedRows < 1) {
          return res.status(404).json({
            error: "Teacher not found!"
          });
        }
        res.json({
          message: "Teacher deleted Successfully"
        });
      }
    );
  };

  //Validate Add Teacher Inputs
  validateAddTeacherInput = (data: ITeacher): any => {
    let errors = {
      name: "",
      fatherName: "",
      DOB: "",
      dateOfJoining: "",
      placeOfBirth: "",
      sex: "",
      nationality: "",
      address: "",
      telephone: "",
      mobile: "",
      subject: ""
    };
    data.name = !isEmpty(data.name) ? data.name : "";
    data.fatherName = !isEmpty(data.fatherName) ? data.fatherName : "";
    data.DOB = !isEmpty(data.DOB) ? data.DOB : "";
    data.dateOfJoining = !isEmpty(data.dateOfJoining) ? data.dateOfJoining : "";
    data.placeOfBirth = !isEmpty(data.placeOfBirth) ? data.placeOfBirth : "";
    data.sex = !isEmpty(data.sex) ? data.sex : "";
    data.nationality = !isEmpty(data.nationality) ? data.nationality : "";
    data.address = !isEmpty(data.address) ? data.address : "";
    data.telephone = !isEmpty(data.telephone) ? data.telephone : "";
    data.mobile = !isEmpty(data.mobile) ? data.mobile : "";
    data.subject = !isEmpty(data.subject) ? data.subject : "";

    if (Validator.isEmpty(data.name)) {
      errors.name = "Name is required";
    }

    if (Validator.isEmpty(data.fatherName)) {
      errors.fatherName = "Father Name is required";
    }

    if (Validator.isEmpty(data.DOB)) {
      errors.DOB = "Date of Birth is required";
    }

    if (Validator.isEmpty(data.dateOfJoining)) {
      errors.dateOfJoining = "Date of Joining is required";
    }

    if (Validator.isEmpty(data.placeOfBirth)) {
      errors.placeOfBirth = "Place of Birth is required";
    }

    if (Validator.isEmpty(data.sex)) {
      errors.sex = "Sex field is required";
    }
    if (Validator.isEmpty(data.nationality)) {
      errors.nationality = "Nationality is required";
    }
    if (Validator.isEmpty(data.address)) {
      errors.address = "Address field is required";
    }
    if (Validator.isEmpty(data.telephone)) {
      errors.telephone = "Telephone field is required";
    }
    if (Validator.isEmpty(data.mobile)) {
      errors.mobile = "Mobile field is required";
    }
    if (Validator.isEmpty(data.subject)) {
      errors.subject = "Subject field is required";
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  };
}
