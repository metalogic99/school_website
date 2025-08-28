import React from "react";
import Link from "next/link";
import { H2 } from "@/components/typography";
import connectDB from "@/server/utils/connectDB";
import AddButton from "@/components/common/AddButton";
import Batch from "@/server/models/batch";

const page = async () => {
  await connectDB();
  const batch = await Batch.find();

  const passedYears = batch.map((b) => b.passedYear);
  const uniquePassedYears = passedYears.filter(
    (year, index) => passedYears.indexOf(year) === index,
  );

  return (
    <div>
      <div className="pb-5">
        <div className="space-y-8 pb-5">
          <div className=" flex items-center justify-between">
            <H2 className=" font-semibold">All Teams</H2>
            <AddButton />
          </div>
          <div className="  flex flex-col gap-4 font-medium">
            {uniquePassedYears.map((year, idx) => {
              return (
                <Link
                  key={idx}
                  href={`/admin/batch/${year}`}
                  className="  rounded-xl  border p-4 shadow-md"
                >
                  Batch of {year}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
