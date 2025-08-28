import { Schema, model, models } from "mongoose";

const CalenderModel = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    year: {
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

const Calender = models.Calender || model("Calender", CalenderModel);
export default Calender;
