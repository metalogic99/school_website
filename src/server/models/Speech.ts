import { Schema, model, models } from "mongoose";

const sppechSchema = new Schema(
  {
    speech: { type: String, required: true },
  },
  { timestamps: true },
);

const Speech = models.Speech || model("Speech", sppechSchema);

export default Speech;
