import { Schema, models, model } from "mongoose";

const transportationSchema = new Schema(
  {
    staffName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      required: true,
    },

    vehicleNo: {
      type: String,
      required: true,
    },
    appointedOn: {
      type: String,
      default: Date.now(),
    },
  },
  { timestamps: true },
);

const Transportation =
  models.Transportation || model("Transportation", transportationSchema);

export default Transportation;
