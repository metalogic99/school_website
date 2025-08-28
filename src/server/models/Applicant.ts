import { Schema, models, model } from "mongoose";

const applicantSchema = new Schema(
  {
    vacancy: {
      type: Schema.Types.ObjectId,
      ref: "Vacancy",
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    resumeUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Applicant = models.Applicant || model("Applicant", applicantSchema);

export default Applicant;
