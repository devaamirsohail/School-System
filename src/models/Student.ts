import { Schema, Document, model } from "mongoose";

export interface IStudent extends Document {
  name: string;
  fatherName: string;
  DOB: string;
  dateOfAdmission: string;
  placeOfBirth: string;
  sex: string;
  nationality: string;
  address: string;
  telephone: string;
  mobile: string;
  classes: string;
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
