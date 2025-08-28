import { Schema, model, models } from "mongoose";

const TPCChairmanMessageSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    image: {
      secure_url: { type: String },
      public_id: { type: String },
    },
  },
  { timestamps: true },
);

const TPCChairmanMessages =
  models.TPCChairmanMessages ||
  model("TPCChairmanMessages", TPCChairmanMessageSchema);
export default TPCChairmanMessages;
