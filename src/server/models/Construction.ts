import { Schema, model, models } from "mongoose";

const constructionSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    image: {
      public_id: { type: String, required: true },
      secure_url: { type: String, required: true },
    },
    project_title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "bod",
        "director",
        "finance",
        "academic_staff",
        "sports",
        "construction",
        "smc",
        "tpc",
        "examination",
        "management",
        "non-academic-staff",
        "cultural",
      ],
    },
    designation: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    appointment_date: {
      type: String,
      required: true,
    },
    isHead: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);

const Construction =
  models.Construction || model("Construction", constructionSchema);

export default Construction;
