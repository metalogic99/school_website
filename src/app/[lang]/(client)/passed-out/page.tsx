import Batch from "@/server/models/batch";
import connectDB from "@/server/utils/connectDB";
import { redirect } from "next/navigation";

export default async function page() {
  await connectDB();
  const batch = await Batch.find();

  const passedYears = batch.map((b) => b.passedYear);
  const uniquePassedYears = passedYears.filter(
    (year, index) => passedYears.indexOf(year) === index,
  );
  redirect(`/passed-out/${passedYears[0]}`);
}
