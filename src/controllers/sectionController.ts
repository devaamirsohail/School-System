import { Request, Response } from "express";
import Validator from "validator";

//import validator
import isEmpty from "../validator/is-empty";

//import user model
import Section from "../models/Section";

import { ISection } from "../Interfaces/section.interface";

export class sectionController {
  //Add Section Controller
  AddSection = (req: Request, res: Response) => {
    console.log(req.body.subjects);
    const { errors, isValid } = this.validateAddSectionInput(req.body);

    //Check Validation
    if (isValid.includes(false)) {
      return res.status(400).json(errors);
    }
    //Register Controller
    const { title, classes, subjects } = req.body;

    const newSection = new Section({
      title,
      classes,
      subjects
    });

    newSection
      .save()
      .then(user => res.json(user))
      .catch(err => {
        console.log(err);
        res.json({
          error: "Error in saving section to database, try again."
        });
      });
  };
  //Update Section Controller
  UpdateSection = (req: Request, res: Response) => {
    const { errors, isValid } = this.validateAddSectionInput(req.body);

    //Check Validation
    if (isValid.includes(false)) {
      return res.status(400).json(errors);
    }

    //Register Controller
    const { title, classes, subjects } = req.body;
    const updateSection = {
      title,
      classes,
      subjects
    };
    console.log(updateSection);
    Section.findByIdAndUpdate(
      req.query.id,
      { $set: updateSection },
      { new: true }
    )
      .then(section => {
        res.json(section);
      })
      .catch(err => res.status(404).json(err));
  };
  //Get All Section Controller
  GetAllSections = (req: Request, res: Response) => {
    Section.find(
      {},
      {
        title: 1,
        classes: 1,
        subjects: 1
      }
    )

      .then(sections => {
        if (!sections) {
          return res.status(404).json({
            error: "There are no sections"
          });
        }
        res.json(sections);
      })
      .catch(err => res.status(404).json(err));
  };
  //Get Single Section Controller
  GetSection = (req: Request, res: Response) => {
    Section.findById(req.query.id, {
      title: 1,
      classes: 1,
      subjects: 1
    })

      .then(section => {
        if (!section) {
          return res.status(404).json({
            error: "Section not found!"
          });
        }
        res.json(section);
      })
      .catch(err => res.status(404).json(err));
  };

  //Delete Section Controller
  DeleteSection = (req: Request, res: Response) => {
    Section.findByIdAndDelete(req.query.id)
      .then(() => {
        res.json({ success: true });
      })
      .catch(err => res.status(404).json(err));
  };

  //Validate Add Section Inputs
  validateAddSectionInput = (data: ISection): any => {
    let errors = {
      title: "",
      classes: "",
      subjects: ""
    };
    data.title = !isEmpty(data.title) ? data.title : "";
    data.classes = !isEmpty(data.classes) ? data.classes : "";

    if (Validator.isEmpty(data.title)) {
      errors.title = "Title is required";
    }
    if (Validator.isEmpty(data.classes)) {
      errors.classes = "Class is required";
    }
    if (!data.subjects.length) {
      errors.subjects = "Subjects are required";
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  };
}
