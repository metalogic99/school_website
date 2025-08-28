import { model, models, Schema } from "mongoose";

const houseSchema = new Schema({
  house_color: {
    type: String,
    required: true,
  },
  house_name: {
    type: String,
    required: true,
  },

  fullname: {
    type: String,
    required: true,
  },
  photo: {
    secure_url: { type: String },
    public_id: { type: String },
  },
  grade: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["captain", "vice_captain", "member"],
    default: "member",
  },
});

const House = models.House || model("House", houseSchema);

export default House;
