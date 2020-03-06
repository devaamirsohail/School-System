import { Schema, Document, model } from "mongoose";

export interface ISubject extends Document {
  title: string;
}

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
