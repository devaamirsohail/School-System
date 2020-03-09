import { Schema, Document, model } from "mongoose";

import { IClass } from "../Interfaces/classes.interface";

//Classes Schema
const ClassSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      max: 40
    },
    HOC: {
      type: Schema.Types.ObjectId,
      ref: "Teacher"
    }
  },
  { timestamps: true }
);
export default model<IClass & Document>("Classes", ClassSchema);
