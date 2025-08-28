import { Schema, model, models } from "mongoose";

const batchSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    image: {
      public_id: { type: String, required: true },
      secure_url: { type: String, required: true },
    },
    gpa: {
      type: Number,
      required: true,
    },
    passedYear: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Batch = models.Batch || model("Batch", batchSchema);

export default Batch;
