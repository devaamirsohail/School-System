import { Request, Response } from "express";
import Validator from "validator";
import * as expressJwt from "express-jwt";

import { JWT_SECRET } from "../config/constants";

//import validator
import isEmpty from "../validator/is-empty";

//import user model
import Teacher from "../models/Teacher";

import { ITeacher } from "../models/Teacher";

export class teacherController {
  //Add Teacher Controller
  AddTeacher = (req: Request, res: Response) => {
    const { errors, isValid } = this.validateAddTeacherInput(req.body);

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
      subject,
      DOB,
      dateOfJoining
    } = req.body;
    const newTeacher = new Teacher({
      name,
      fatherName,
      DOB,
      dateOfJoining,
      placeOfBirth,
      sex,
      nationality,
      address,
      telephone,
      mobile,
      subject
    });

    newTeacher
      .save()
      .then(user => res.json(user))
      .catch(err => {
        console.log(err);
        res.json({
          error: "Error in saving teacher to database, try again."
        });
      });
  };

  //Get All Teacher Controller
  GetAllTeachers = (req: Request, res: Response) => {
    Teacher.find(
      {},
      {
        name: 1,
        fatherName: 1,
        dateOfJoining: 1,
        sex: 1,
        address: 1,
        mobile: 1,
        subject: 1
      }
    )

      .then(Teachers => {
        if (!Teachers) {
          return res.status(404).json({
            error: "There are no Teachers"
          });
        }
        res.json(Teachers);
      })
      .catch(err => res.status(404).json(err));
  };
  //Get Single Teacher Controller
  GetTeacher = (req: Request, res: Response) => {
    Teacher.findById(req.query.id, {
      name: 1,
      fatherName: 1,
      DOB: 1,
      sex: 1,
      address: 1,
      mobile: 1,
      subject: 1,
      telephone: 1,
      nationality: 1,
      dateOfJoining: 1,
      placeOfBirth: 1
    })

      .then(teacher => {
        if (!teacher) {
          return res.status(404).json({
            error: "Teacher not found!"
          });
        }
        res.json(teacher);
      })
      .catch(err => res.status(404).json(err));
  };

  //Update Teacher Controller
  UpdateTeacher = (req: Request, res: Response) => {
    const { errors, isValid } = this.validateAddTeacherInput(req.body);

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
      subject,
      DOB,
      dateOfJoining
    } = req.body;

    const teacherFields = {
      name,
      fatherName,
      DOB,
      dateOfJoining,
      placeOfBirth,
      sex,
      nationality,
      address,
      telephone,
      mobile,
      subject
    };

    Teacher.findByIdAndUpdate(
      req.query.id,
      { $set: teacherFields },
      { new: true }
    )
      .then(teacher => {
        res.json(teacher);
      })
      .catch(err => res.status(404).json(err));
  };
  //Delete Teacher Controller
  DeleteTeacher = (req: Request, res: Response) => {
    Teacher.findByIdAndDelete(req.query.id)
      .then(() => {
        res.json({ success: true });
      })
      .catch(err => res.status(404).json(err));
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
