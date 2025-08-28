import { Schema, model, models } from "mongoose";

const SyllabusModel = new Schema(
  {
    grade: {
      type: String,
      required: true,
    },
    session: {
      type: String,
      required: true,
    },
    pdf: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Syllabus = models.Syllabus || model("Syllabus", SyllabusModel);
export default Syllabus;
