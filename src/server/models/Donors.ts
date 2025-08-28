import { model, models, Schema } from "mongoose";

const DonorsModel = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photo: {
    secure_url: { type: String },
    public_id: { type: String },
  },
  phone: {
    type: String,
    required: true,
  },
  donation_type: {
    type: String,
    required: true,
    enum: ["building", "land", "computer", "uniform", "akshyakosh", "others"],
  },
  donation_amount: {
    type: String,
  },
  donation_title: {
    type: String,
  },
});

const Donors = models.Donors || model("Donors", DonorsModel);
export default Donors;
