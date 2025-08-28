import { newsSchema } from "@/schemas/news.schema";
import { Schema, model, models } from "mongoose";

const blogsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    body: {
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

const Blogs = models.Blogs || model("Blogs", blogsSchema);
export default Blogs;
