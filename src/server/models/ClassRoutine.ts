import { Schema, model, models } from "mongoose";

const ClassRoutineSchema = new Schema(
  {
    grade: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    table: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const ClassRoutine =
  models.ClassRoutine || model("ClassRoutine", ClassRoutineSchema);
export default ClassRoutine;
