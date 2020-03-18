import { Request, Response } from "express";
import Validator from "validator";

//import validator
import isEmpty from "../validator/is-empty";

//import user model
import Staff from "../models/Staff";

import { IStaff } from "../Interfaces/staff.interface";

export class staffController {
  //Add Staff Controller
  AddStaff = (req: Request, res: Response) => {
    const { errors, isValid } = this.validateAddStaffInput(req.body);

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
      role,
      DOB,
      dateOfJoining
    } = req.body;
    const newStaff = new Staff({
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
      role
    });

    newStaff
      .save()
      .then(user => res.json(user))
      .catch(err => {
        console.log(err);
        res.json({
          error: "Error in saving staff to database, try again."
        });
      });
  };

  //Get All Staff Controller
  GetAllStaff = (req: Request, res: Response) => {
    Staff.find(
      {},
      {
        name: 1,
        fatherName: 1,
        dateOfJoining: 1,
        sex: 1,
        address: 1,
        mobile: 1,
        role: 1
      }
    )

      .then(Staff => {
        if (!Staff) {
          return res.status(404).json({
            error: "There are no Staff"
          });
        }
        res.json(Staff);
      })
      .catch(err => res.status(404).json(err));
  };
  //Get Single Staff Controller
  GetStaff = (req: Request, res: Response) => {
    Staff.findById(req.query.id, {
      name: 1,
      fatherName: 1,
      DOB: 1,
      sex: 1,
      address: 1,
      mobile: 1,
      role: 1,
      telephone: 1,
      nationality: 1,
      dateOfJoining: 1,
      placeOfBirth: 1
    })

      .then(staff => {
        if (!staff) {
          return res.status(404).json({
            error: "Staff not found!"
          });
        }
        res.json(staff);
      })
      .catch(err => res.status(404).json(err));
  };

  //Update Staff Controller
  UpdateStaff = (req: Request, res: Response) => {
    const { errors, isValid } = this.validateAddStaffInput(req.body);

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
      role,
      DOB,
      dateOfJoining
    } = req.body;

    const staffFields = {
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
      role
    };

    Staff.findByIdAndUpdate(req.query.id, { $set: staffFields }, { new: true })
      .then(staff => {
        res.json(staff);
      })
      .catch(err => res.status(404).json(err));
  };
  //Delete Staff Controller
  DeleteStaff = (req: Request, res: Response) => {
    Staff.findByIdAndDelete(req.query.id)
      .then(() => {
        res.json({ success: true });
      })
      .catch(err => res.status(404).json(err));
  };

  //Validate Add Staff Inputs
  validateAddStaffInput = (data: IStaff): any => {
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
      role: ""
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
    data.role = !isEmpty(data.role) ? data.role : "";

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
    if (Validator.isEmpty(data.role)) {
      errors.role = "Role field is required";
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  };
}
