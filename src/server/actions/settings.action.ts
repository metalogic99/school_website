"use server";
import Admin from "../models/Admin";
import connectDB from "../utils/connectDB";
import bcrypt from "bcryptjs";

export async function changePassword({
  oldPassword,
  newPass,
}: {
  oldPassword: string;
  newPass: string;
}) {
  await connectDB();
  if (!oldPassword || !newPass) {
    return { error: "Password is required !!" };
  }

  const user = await Admin.findOne({ username: "admin" });
  if (!user) {
    return { error: "User not found !!" };
  }

  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    return { error: "Password did not match !!" };
  }

  const hash = await bcrypt.hash(newPass, 10);
  await Admin.findOneAndUpdate({ username: "admin", password: hash });
  return { message: "Password changed successfully !!" };
}
