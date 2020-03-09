import { Schema, Document, model } from "mongoose";
import { ISubject } from "../Interfaces/subject.interface";

//Subject Schema
const SubjectSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
export default model<ISubject & Document>("Subject", SubjectSchema);
