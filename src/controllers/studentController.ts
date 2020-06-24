import { Request, Response } from "express";
import Validator from "validator";

//import validator
import isEmpty from "../validator/is-empty";

//import user model
import Student from "../models/Student";
import { conn } from "../config/mysql";

import { IStudent } from "../Interfaces/student.interface";

export class studentController {
  //Add Student Controller
  AddStudent = (req: Request, res: Response) => {
    const { errors, isValid } = this.validateAddStudentInput(req.body);
    //Check Validation
    if (isValid.includes(false)) {
      return res.status(400).json(errors);
    }
    const studentFields: IStudent = req.body;

    conn.query("INSERT INTO students SET?", [studentFields], (err, student) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: "Error in saving student to database, try again."
        });
      }
      res.json({
        message: "Student Added Successfully"
      });
    });
  };

  //Get All Student Controller
  GetAllStudents = (req: Request, res: Response) => {
    conn.query("SELECT * FROM students", (err, students) => {
      if (err) {
        return res.status(500).json({
          error: "Something went wrong, try again!"
        });
      }
      if (students.length < 1) {
        return res.status(404).json({
          error: "No Student Found!"
        });
      }
      res.json(students);
    });
  };
  //Get Single Student Controller
  GetStudent = (req: Request, res: Response) => {
    conn.query(
      "SELECT * FROM students WHERE id = ?",
      req.query.id,
      (err, student) => {
        if (err) {
          return res.status(500).json({
            error: "Something went wrong, try again!"
          });
        }
        if (student.length < 1) {
          return res.status(404).json({
            error: "Student not found!"
          });
        }
        res.json(student[0]);
      }
    );
  };

  //Update Student Controller
  UpdateStudent = (req: Request, res: Response) => {
    const { errors, isValid } = this.validateAddStudentInput(req.body);

    //Check Validation
    if (isValid.includes(false)) {
      return res.status(400).json(errors);
    }

    const studentFields: IStudent = req.body;

    conn.query(
      "UPDATE students set ? WHERE id = ?",
      [studentFields, req.query.id],
      (err, student) => {
        if (err) {
          return res.status(500).json({
            error: "Error in updating  student to database, try again."
          });
        }
        if (student.affectedRows < 1) {
          return res.status(404).json({
            error: "Student not found!"
          });
        }
        res.json({
          message: "Student Updated Successfully"
        });
      }
    );
  };
  //Delete Student Controller
  DeleteStudent = (req: Request, res: Response) => {
    conn.query(
      "DELETE FROM students WHERE id = ?",
      req.query.id,
      (err, result) => {
        if (err) {
          return res.status(500).json({
            error: "Something went wrong, try again!"
          });
        }
        if (result.affectedRows < 1) {
          return res.status(404).json({
            error: "Student not found!"
          });
        }
        res.json({
          message: "Student deleted Successfully"
        });
      }
    );
  };

  //Validate Add Student Inputs
  validateAddStudentInput = (data: IStudent): any => {
    let errors = {
      name: "",
      fatherName: "",
      DOB: "",
      dateOfAdmission: "",
      placeOfBirth: "",
      sex: "",
      nationality: "",
      address: "",
      telephone: "",
      mobile: "",
      section: ""
    };
    data.name = !isEmpty(data.name) ? data.name : "";
    data.fatherName = !isEmpty(data.fatherName) ? data.fatherName : "";
    data.DOB = !isEmpty(data.DOB) ? data.DOB : "";
    data.dateOfAdmission = !isEmpty(data.dateOfAdmission)
      ? data.dateOfAdmission
      : "";
    data.placeOfBirth = !isEmpty(data.placeOfBirth) ? data.placeOfBirth : "";
    data.sex = !isEmpty(data.sex) ? data.sex : "";
    data.nationality = !isEmpty(data.nationality) ? data.nationality : "";
    data.address = !isEmpty(data.address) ? data.address : "";
    data.telephone = !isEmpty(data.telephone) ? data.telephone : "";
    data.mobile = !isEmpty(data.mobile) ? data.mobile : "";
    data.section = !isEmpty(data.section) ? data.section : "";

    if (Validator.isEmpty(data.name)) {
      errors.name = "Name is required";
    }

    if (Validator.isEmpty(data.fatherName)) {
      errors.fatherName = "Father Name is required";
    }

    if (Validator.isEmpty(data.DOB)) {
      errors.DOB = "Date of Birth is required";
    }

    if (Validator.isEmpty(data.dateOfAdmission)) {
      errors.dateOfAdmission = "Date of Admission is required";
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
    if (Validator.isEmpty(data.section)) {
      errors.section = "Section field is required";
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  };
}
