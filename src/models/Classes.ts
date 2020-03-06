import { Schema, Document, model } from "mongoose";

export interface IClass extends Document {
  title: string;
  HOC: string;
  section: [{ name: string; subject: [{ title: string }] }];
}

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
    },

    section: [
      {
        name: {
          type: String
        },
        subject: {
          type: [String]
        }
      }
    ]
  },
  { timestamps: true }
);
export default model<IClass & Document>("Classes", ClassSchema);
