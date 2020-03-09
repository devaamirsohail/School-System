import { Schema, Document, model } from "mongoose";

import { ITeacher } from "../Interfaces/teacher.interface";

//Teacher Schema
const TeacherSchema: Schema = new Schema(
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
    dateOfJoining: {
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
    subject: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
export default model<ITeacher & Document>("Teacher", TeacherSchema);
