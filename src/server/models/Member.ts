import { Schema, models, model } from "mongoose";

const memberSchema = new Schema(
  {
    group: {
      type: String,
      enum: [
        "bod",
        "audit",
        "credit",
        "education",
        "advisory",
        "unit",
        "management",
      ],
      required: true,
    },
    image: {
      public_id: { type: String, required: true },
      secure_url: { type: String, required: true },
    },
    isChairman: { type: Boolean, default: false },
    position: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true },
);

const Member = models.Member || model("Member", memberSchema);

export default Member;
