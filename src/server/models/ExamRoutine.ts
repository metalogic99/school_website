import { Schema, model, models } from "mongoose";

const ExamRoutineSchema = new Schema(
  {
    grade: {
      type: String,
      required: true,
    },
    exam: {
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

const ExamRoutine =
  models.ExamRoutine || model("ExamRoutine", ExamRoutineSchema);
export default ExamRoutine;
