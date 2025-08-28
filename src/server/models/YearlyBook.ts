import { Schema, model, models } from "mongoose";

const YearlyBookModel = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    book: {
      type: String,
      required: true,
    },
    image: {
      public_id: { type: String, required: true },
      secure_url: { type: String, required: true },
    },
  },
  { timestamps: true },
);

const YearlyBook = models.YearlyBook || model("YearlyBook", YearlyBookModel);
export default YearlyBook;
