import { Request, Response } from "express";
import Validator from "validator";

//import validator
import isEmpty from "../validator/is-empty";

//import user model
import Student from "../models/Student";

import { IStudent } from "../Interfaces/student.interface";

export class studentController {
  //Add Student Controller
  AddStudent = (req: Request, res: Response) => {
    const { errors, isValid } = this.validateAddStudentInput(req.body);
    console.log(typeof req.body.admissionFee.total);
    console.log(typeof req.body.admissionFee.paid);
    console.log(isValid);
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
      classes,
      DOB,
      dateOfAdmission,
      admissionFee,
      fee
    } = req.body;

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
      classes,
      admissionFee,
      fee
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
        classes: 1,
        fee: 1
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
      classes: 1,
      telephone: 1,
      nationality: 1,
      dateOfAdmission: 1,
      placeOfBirth: 1,
      admissionFee: 1,
      fee: 1
    })

      .then(student => {
        if (!student) {
          return res.status(404).json({
            error: "Student not found!"
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
      classes,
      DOB,
      dateOfAdmission,
      admissionFee,
      fee
    } = req.body;

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
      classes,
      admissionFee,
      fee
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
      classes: "",
      admissionFeeTotal: "",
      admissionFeePaid: "",
      feeTotal: "",
      feePaid: ""
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
    if (data.admissionFee !== undefined) {
      if (data.admissionFee.total === undefined) {
        errors.admissionFeeTotal = "Admission Fee total is required";
      }
      if (data.admissionFee.paid === undefined) {
        errors.admissionFeePaid = "Admission Fee paid is required";
      }
    } else {
      errors.admissionFeeTotal = "Admission Fee total is required";
      errors.admissionFeePaid = "Admission Fee paid is required";
    }
    if (data.admissionFee !== undefined) {
      if (data.fee.total === undefined) {
        errors.feeTotal = "Fee total is required";
      }
      if (data.fee.paid === undefined) {
        errors.feePaid = "Fee paid is required";
      }
    } else {
      errors.feeTotal = "Fee total is required";
      errors.feePaid = "Fee paid is required";
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  };
}
