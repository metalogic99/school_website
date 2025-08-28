import { Schema, models, model } from "mongoose";

const vacancySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    noOfVacancy: { type: Number, required: true },
    jobDescription: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    responsibilities: {
      type: String,
      required: true,
    },
    vacancyClosed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Vacancy = models.Vacancy || model("Vacancy", vacancySchema);

export default Vacancy;
