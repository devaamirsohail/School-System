import { Request, Response } from "express";
import * as bcrypt from "bcryptjs";
import Validator from "validator";
import * as expressJwt from "express-jwt";

import { JWT_SECRET } from "../config/constants";

//import validator
import isEmpty from "../validator/is-empty";

//import user model
import Student from "../models/Student";

interface studentData {
  name: string;
  fatherName: string;
  DOB: string;
  dateOfAdmission: string;
  placeOfBirth: string;
  sex: string;
  nationality: string;
  address: string;
  telephone: string;
  mobile: string;
  classes: string;
}

export class studentController {
  //Add Student Controller
  AddStudent = (req: Request, res: Response) => {
    const { errors, isValid } = this.validateAddStudentInput(req.body);

    //Check Validation
    if (isValid.includes(false)) {
      return res.status(400).json(errors);
    }
    //Register Controller
    const {
      name,
      fatherName,
      placeOfBirth,
      sex,
      nationality,
      address,
      telephone,
      mobile,
      classes
    } = req.body;
    const DOB = new Date(req.body.DOB);
    const dateOfAdmission = new Date(req.body.dateOfAdmission);
    const newStudent = new Student({
      name,
      fatherName,
      DOB,
      dateOfAdmission,
      placeOfBirth,
      sex,
      nationality,
      address,
      telephone,
      mobile,
      classes
    });

    newStudent
      .save()
      .then(user => res.json(user))
      .catch(err => {
        console.log(err);
        res.json({
          error: "Error in saving student to database, try again."
        });
      });
  };

  //Get All Student Controller
  GetAllStudents = (req: Request, res: Response) => {
    Student.find(
      {},
      {
        name: 1,
        fatherName: 1,
        DOB: 1,
        sex: 1,
        address: 1,
        mobile: 1,
        classes: 1
      }
    )

      .then(students => {
        if (!students) {
          return res.status(404).json({
            error: "There are no students"
          });
        }
        res.json(students);
      })
      .catch(err => res.status(404).json(err));
  };
  //Get Single Student Controller
  GetStudent = (req: Request, res: Response) => {
    Student.findById(req.query.id, {
      name: 1,
      fatherName: 1,
      DOB: 1,
      sex: 1,
      address: 1,
      mobile: 1,
      classes: 1
    })

      .then(student => {
        if (!student) {
          return res.status(404).json({
            error: "Something went wrong, Try again!"
          });
        }
        res.json(student);
      })
      .catch(err => res.status(404).json(err));
  };

  //Update Student Controller
  UpdateStudent = (req: Request, res: Response) => {
    const { errors, isValid } = this.validateAddStudentInput(req.body);

    //Check Validation
    if (isValid.includes(false)) {
      return res.status(400).json(errors);
    }

    const {
      name,
      fatherName,
      placeOfBirth,
      sex,
      nationality,
      address,
      telephone,
      mobile,
      classes
    } = req.body;
    const DOB = new Date(req.body.DOB);
    const dateOfAdmission = new Date(req.body.dateOfAdmission);
    const studentFields = {
      name,
      fatherName,
      DOB,
      dateOfAdmission,
      placeOfBirth,
      sex,
      nationality,
      address,
      telephone,
      mobile,
      classes
    };

    Student.findByIdAndUpdate(
      req.query.id,
      { $set: studentFields },
      { new: true }
    )
      .then(student => {
        res.json(student);
      })
      .catch(err => res.status(404).json(err));
  };
  //Delete Student Controller
  DeleteStudent = (req: Request, res: Response) => {
    Student.findByIdAndDelete(req.query.id)
      .then(() => {
        res.json({ success: true });
      })
      .catch(err => res.status(404).json(err));
  };

  //Validate Add Student Inputs
  validateAddStudentInput = (data: studentData): any => {
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
      classes: ""
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
    data.classes = !isEmpty(data.classes) ? data.classes : "";

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
    if (Validator.isEmpty(data.classes)) {
      errors.classes = "Class field is required";
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
