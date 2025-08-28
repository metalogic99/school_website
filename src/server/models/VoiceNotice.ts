import { Schema, model, models } from "mongoose";

const VoiceNoticeModel = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    voice: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const VoiceNotice =
  models.VoiceNotice || model("VoiceNotice", VoiceNoticeModel);
export default VoiceNotice;
