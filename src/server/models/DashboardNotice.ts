import { Schema, models, model } from "mongoose";

const dashboardNoticeSchema = new Schema(
  {
    title: { type: String, required: true },
    image: {
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
  },
  { timestamps: true },
);

const DashboardNotice =
  models.DashboardNotice || model("DashboardNotice", dashboardNoticeSchema);

export default DashboardNotice;
