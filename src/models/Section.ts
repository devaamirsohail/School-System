import { Schema, Document, model } from "mongoose";
import { ISection } from "../Interfaces/section.interface";

//Section Schema
const SectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      max: 40
    },
    subjects: {
      type: [String],
      required: true
    },
    classes: {
      type: Schema.Types.ObjectId,
      ref: "Classes"
    }
  },
  { timestamps: true }
);
export default model<ISection & Document>("Section", SectionSchema);
