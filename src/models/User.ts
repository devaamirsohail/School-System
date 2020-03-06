import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  fname: string;
  lname: string;
  email: string;
  password: string;
  role: string;
  resetPasswordLink: string;
}

//User Schema
const UserSchema: Schema = new Schema(
  {
    fname: {
      type: String,
      trim: true,
      required: true,
      max: 50
    },
    lname: {
      type: String,
      trim: true,
      required: true,
      max: 50
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      max: 100
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: ""
    },
    resetPasswordLink: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);
export default model<IUser & Document>("User", UserSchema);
