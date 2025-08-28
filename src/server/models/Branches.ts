import { Schema, model, models } from "mongoose";

const branchSchema = new Schema(
  {
    name: { type: String, required: true },
    manager: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true },
);

const Branch = models.Branch || model("Branch", branchSchema);

export default Branch;
