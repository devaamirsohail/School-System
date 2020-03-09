import { Request, Response } from "express";
import Validator from "validator";

//import validator
import isEmpty from "../validator/is-empty";

//import user model
import Subject from "../models/Subject";

import { ISubject } from "../Interfaces/subject.interface";

export class subjectController {
  //Add Subject Controller
  AddSubject = (req: Request, res: Response) => {
    const { errors, isValid } = this.validateAddSubjectInput(req.body);

    //Check Validation
    if (isValid.includes(false)) {
      return res.status(400).json(errors);
    }
    //Register Controller
    const { title } = req.body;
    const newSubject = new Subject({
      title
    });

    newSubject
      .save()
      .then(user => res.json(user))
      .catch(err => {
        console.log(err);
        res.json({
          error: "Error in saving subject to database, try again."
        });
      });
  };

  //Get All Subject Controller
  GetAllSubjects = (req: Request, res: Response) => {
    Subject.find(
      {},
      {
        title: 1
      }
    )

      .then(subjects => {
        if (!subjects) {
          return res.status(404).json({
            error: "There are no subjects"
          });
        }
        res.json(subjects);
      })
      .catch(err => res.status(404).json(err));
  };
  //Get Single Subject Controller
  GetSubject = (req: Request, res: Response) => {
    Subject.findById(req.query.id, {
      title: 1
    })

      .then(subject => {
        if (!subject) {
          return res.status(404).json({
            error: "Subject not found!"
          });
        }
        res.json(subject);
      })
      .catch(err => res.status(404).json(err));
  };

  //Delete Subject Controller
  DeleteSubject = (req: Request, res: Response) => {
    Subject.findByIdAndDelete(req.query.id)
      .then(() => {
        res.json({ success: true });
      })
      .catch(err => res.status(404).json(err));
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
