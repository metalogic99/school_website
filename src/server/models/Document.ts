import { Schema, model, models } from "mongoose";

const documentSchema = new Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true },
);

const Doc = models.Doc || model("Doc", documentSchema);

export default Doc;
