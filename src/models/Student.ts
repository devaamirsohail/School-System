import { Schema, Document, model } from "mongoose";

import { IStudent } from "../Interfaces/student.interface";

//Student Schema
const StudentSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    fatherName: {
      type: String,
      required: true
    },
    DOB: {
      type: String,
      required: true
    },
    dateOfAdmission: {
      type: String,
      required: true
    },
    placeOfBirth: {
      type: String,
      required: true
    },
    sex: {
      type: String,
      required: true
    },
    nationality: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    telephone: {
      type: String,
      required: true
    },
    mobile: {
      type: String,
      required: true
    },
    classes: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
export default model<IStudent & Document>("Student", StudentSchema);
