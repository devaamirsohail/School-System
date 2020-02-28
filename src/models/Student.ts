import { Schema, Document, model } from "mongoose";

export interface IStudent extends Document {
  fname: string;
  lname: string;
  email: string;
  password: string;
  role: string;
  resetPasswordLink: string;
  timestamps: Date;
}

//User Schema
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
      type: Date,
      required: true
    },
    dateOfAdmission: {
      type: Date,
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
