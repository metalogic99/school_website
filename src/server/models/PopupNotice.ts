import { Schema, models, model } from "mongoose";

const popupNoticeSchema = new Schema(
  {
    title: { type: String, required: true },
    image: {
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
  },
  { timestamps: true },
);

const PopupNotice =
  models.PopupNotice || model("PopupNotice", popupNoticeSchema);

export default PopupNotice;
