import { Request, Response } from "express";
import Validator from "validator";

//import validator
import isEmpty from "../validator/is-empty";

//import user model
import Staff from "../models/Staff";
import { conn } from "../config/mysql";

import { IStaff } from "../Interfaces/staff.interface";

export class staffController {
  //Add Staff Controller
  AddStaff = (req: Request, res: Response) => {
    const { errors, isValid } = this.validateAddStaffInput(req.body);

    //Check Validation
    if (isValid.includes(false)) {
      return res.status(400).json(errors);
    }
    const staffFields: IStaff = req.body;

    conn.query("INSERT INTO staff SET?", [staffFields], (err, staff) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: "Error in saving staff to database, try again."
        });
      }
      res.json({
        message: "Staff Added Successfully"
      });
    });
  };

  //Get All Staff Controller
  GetAllStaff = (req: Request, res: Response) => {
    conn.query("SELECT * FROM staff", (err, Staff) => {
      if (err) {
        return res.status(500).json({
          error: "Something went wrong, try again!"
        });
      }
      if (Staff.length < 1) {
        return res.status(404).json({
          error: "No Staff Found!"
        });
      }
      res.json(Staff);
    });
  };
  //Get Single Staff Controller
  GetStaff = (req: Request, res: Response) => {
    conn.query(
      "SELECT * FROM staff WHERE id = ?",
      req.query.id,
      (err, staff) => {
        if (err) {
          return res.status(500).json({
            error: "Something went wrong, try again!"
          });
        }
        if (staff.length < 1) {
          return res.status(404).json({
            error: "Staff not found!"
          });
        }
        res.json(staff[0]);
      }
    );
  };

  //Update Staff Controller
  UpdateStaff = (req: Request, res: Response) => {
    const { errors, isValid } = this.validateAddStaffInput(req.body);

    //Check Validation
    if (isValid.includes(false)) {
      return res.status(400).json(errors);
    }

    const staffFields: IStaff = req.body;

    conn.query(
      "UPDATE staff set ? WHERE id = ?",
      [staffFields, req.query.id],
      (err, staff) => {
        if (err) {
          return res.status(500).json({
            error: "Error in updating  staff to database, try again."
          });
        }
        if (staff.affectedRows < 1) {
          return res.status(404).json({
            error: "Staff not found!"
          });
        }
        res.json({
          message: "Staff Updated Successfully"
        });
      }
    );
  };
  //Delete Staff Controller
  DeleteStaff = (req: Request, res: Response) => {
    conn.query(
      "DELETE FROM staff WHERE id = ?",
      req.query.id,
      (err, result) => {
        if (err) {
          return res.status(500).json({
            error: "Something went wrong, try again!"
          });
        }
        if (result.affectedRows < 1) {
          return res.status(404).json({
            error: "Staff not found!"
          });
        }
        res.json({
          message: "Staff deleted Successfully"
        });
      }
    );
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
