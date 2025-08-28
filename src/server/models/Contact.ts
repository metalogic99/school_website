import mongoose, { Schema } from "mongoose";

const ContactSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/.+\@.+\..+/, "Please provide a valid email"],
    },
    contact: {
      type: String,
      required: [true, "Contact is required"],
      maxlength: [10, "Contact cannot exceed 10 characters"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
    },
    companyName: {
      type: String,
      default: null,
    },
    companyLocation: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
  },
  { timestamps: true },
);

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

export default Contact;
