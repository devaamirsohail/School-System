import { Request, Response } from "express";
import Validator from "validator";

//import validator
import isEmpty from "../validator/is-empty";

//import user model
import Section from "../models/Section";
import { conn } from "../config/mysql";

import { ISection } from "../Interfaces/section.interface";

export class sectionController {
  //Add Section Controller
  AddSection = (req: Request, res: Response) => {
    const { errors, isValid } = this.validateAddSectionInput(req.body);

    //Check Validation
    if (isValid.includes(false)) {
      return res.status(400).json(errors);
    }
    const { subjects } = req.body;
    const sectionFields = {
      title: req.body.title,
      classes: req.body.classes,
      subjects: JSON.stringify(subjects),
      headOfSection: req.body.headOfSection
    };
    conn.query("INSERT INTO sections SET?", [sectionFields], (err, section) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: "Error in saving section to database, try again."
        });
      }
      res.json({
        message: "Section Added Successfully"
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
    const { subjects } = req.body;
    const sectionFields: any = {
      title: req.body.title,
      classes: req.body.classes,
      subjects: JSON.stringify(subjects),
      headOfSection: req.body.headOfSection
    };
    conn.query(
      "UPDATE sections set ? WHERE id = ?",
      [sectionFields, req.query.id],
      (err, section) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: "Something went wrong, try again!"
          });
        }
        if (section.affectedRows < 1) {
          return res.status(404).json({
            error: "Section not found!"
          });
        }
        res.json(section);
      }
    );
  };
  //Get All Section Controller
  GetAllSections = (req: Request, res: Response) => {
    conn.query("SELECT * FROM sections", (err, sections) => {
      if (err) {
        return res.status(500).json({
          error: "Something went wrong, try again!"
        });
      }
      if (sections.length < 1) {
        return res.status(404).json({
          error: "Section not found!"
        });
      }
      sections.forEach((section: any) => {
        JSON.parse(section.subjects);
      });

      res.json(sections);
    });
  };

  //Get Single Section Controller
  GetSection = (req: Request, res: Response) => {
    conn.query(
      "SELECT * FROM sections WHERE id = ?",
      req.query.id,
      (err, section) => {
        if (err) {
          return res.status(500).json({
            error: "Something went wrong, try again!"
          });
        }

        if (section.length < 1) {
          return res.status(404).json({
            error: "Section not found!"
          });
        }
        console.log(JSON.parse(section[0].subjects));

        res.json(JSON.parse(section[0]));
      }
    );
  };

  //Delete Section Controller
  DeleteSection = (req: Request, res: Response) => {
    conn.query(
      "DELETE FROM sections WHERE id = ?",
      req.query.id,
      (err, result) => {
        if (err) {
          return res.status(500).json({
            error: "Something went wrong, try again!"
          });
        }
        if (result.affectedRows < 1) {
          return res.status(404).json({
            error: "Section not found!"
          });
        }
        res.json({
          message: "Section deleted Successfully"
        });
      }
    );
  };

  //Validate Add Section Inputs
  validateAddSectionInput = (data: ISection): any => {
    let errors = {
      title: "",
      classes: "",
      subjects: "",
      headOfSection: ""
    };
    data.title = !isEmpty(data.title) ? data.title : "";
    data.classes = !isEmpty(data.classes) ? data.classes : "";
    data.headOfSection = !isEmpty(data.headOfSection) ? data.headOfSection : "";

    if (Validator.isEmpty(data.title)) {
      errors.title = "Title is required";
    }
    if (Validator.isEmpty(data.classes)) {
      errors.classes = "Class is required";
    }
    if (Validator.isEmpty(data.headOfSection)) {
      errors.headOfSection = "Head of Section is required";
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
