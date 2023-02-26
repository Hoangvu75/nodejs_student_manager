import { Schema, model } from "mongoose";
import { Student } from "./student";

export const Parent = new Schema({
  name: {
    type: String,
    required: true,
  },
  children: {
    type: [Student],
    required: true,
  },
});

export default model("parent", Parent);
