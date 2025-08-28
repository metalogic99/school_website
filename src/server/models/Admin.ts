import { Schema, model, models } from "mongoose";

const adminSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

const Admin = models.Admin || model("Admin", adminSchema);

export default Admin;
