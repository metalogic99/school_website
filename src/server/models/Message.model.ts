import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    designation: { type: String, required: true },
    designationNepali: { type: String, required: true },
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

const Message = models.Message || model("Message", MessageSchema);
export default Message;
