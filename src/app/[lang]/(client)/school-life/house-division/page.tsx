import connectDB from "@/server/utils/connectDB";
import { redirect } from "next/navigation";

export default async function page() {
  await connectDB();

  redirect(`/school-life/house-division/blue`);
}
