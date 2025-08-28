import { Schema, model, models } from "mongoose";

const RegistrationModel = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    photo: {
      secure_url: { type: String },
      public_id: { type: String },
    },
    birth_certificate: {
      secure_url: { type: String },
      public_id: { type: String },
    },
    gender: {
      type: String,
      required: true,
      enum: ["m", "f", "o"],
    },
    email: {
      type: String,
    },
    guardian_name: {
      type: String,
    },
    guardian_phone: {
      type: String,
    },
    grade: {
      type: String,
      required: true,
    },
    permanentaddress: {
      type: String,
      required: true,
    },
    presentaddress: {
      type: String,
      required: true,
    },
    fathername: {
      type: String,
      required: true,
    },
    fatherphone: {
      type: String,
      required: true,
    },
    mothername: {
      type: String,
      required: true,
    },
    motherphone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Registration =
  models.Registration || model("Registration", RegistrationModel);
export default Registration;
