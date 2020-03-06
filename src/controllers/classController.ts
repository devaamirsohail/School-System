import { Request, Response } from "express";
import Validator from "validator";

//import validator
import isEmpty from "../validator/is-empty";

//import user model
import Classes from "../models/Classes";

import { IClass } from "../models/Classes";

export class classController {
  //Add Class Controller
  AddClass = (req: Request, res: Response) => {
    const { errors, isValid } = this.validateAddClassInput(req.body);

    //Check Validation
    if (isValid.includes(false)) {
      return res.status(400).json(errors);
    }

    //Register Controller
    const classFields = {
      title: req.body.title,
      HOC: req.body.HOC,
      section: [
        {
          name: req.body.name ? req.body.name : "",
          subject:
            typeof req.body.subject !== "undefined"
              ? req.body.subject.split(",")
              : [""]
        }
      ]
    };

    const newClasses = new Classes(classFields);
    console.log(classFields.section);
    newClasses
      .save()
      .then(user => res.json(user))
      .catch(err => {
        console.log(err);
        res.json({
          error: "Error in saving classes to database, try again."
        });
      });
  };

  //Get All Classes Controller
  GetAllClasses = (req: Request, res: Response) => {
    Classes.find(
      {},
      {
        title: 1,
        HOC: 1,
        section: 1
      }
    )

      .then(classess => {
        if (!classess) {
          return res.status(404).json({
            error: "There are no classess"
          });
        }
        res.json(classess);
      })
      .catch(err => res.status(404).json(err));
  };
  //Get Single Classes Controller
  GetClass = (req: Request, res: Response) => {
    Classes.findById(req.query.id, {
      title: 1,
      HOC: 1,
      section: 1
    })

      .then(classes => {
        if (!classes) {
          return res.status(404).json({
            error: "Classes not found!"
          });
        }
        res.json(classes);
      })
      .catch(err => res.status(404).json(err));
  };

  //Update Classes Controller
  UpdateClass = (req: Request, res: Response) => {
    const { errors, isValid } = this.validateAddClassInput(req.body);

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
      dateOfAdmission
    } = req.body;

    const classesFields = {
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

    Classes.findByIdAndUpdate(
      req.query.id,
      { $set: classesFields },
      { new: true }
    )
      .then(classes => {
        res.json(classes);
      })
      .catch(err => res.status(404).json(err));
  };
  //Delete Classes Controller
  DeleteClass = (req: Request, res: Response) => {
    Classes.findByIdAndDelete(req.query.id)
      .then(() => {
        res.json({ success: true });
      })
      .catch(err => res.status(404).json(err));
  };

  //Validate Add Classes Inputs
  validateAddClassInput = (data: IClass): any => {
    let errors = {
      title: "",
      HOC: ""
    };
    data.title = !isEmpty(data.title) ? data.title : "";
    data.HOC = !isEmpty(data.HOC) ? data.HOC : "";

    if (Validator.isEmpty(data.title)) {
      errors.title = "Title is required";
    }

    if (Validator.isEmpty(data.HOC)) {
      errors.HOC = "Head of Class is required";
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  };
}
