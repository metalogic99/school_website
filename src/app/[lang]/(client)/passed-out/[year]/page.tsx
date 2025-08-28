import ListOfStudents from "@/components/batch/ListOfStudents";
import { H3 } from "@/components/typography";
import Batch from "@/server/models/batch";
import connectDB from "@/server/utils/connectDB";
import React from "react";

export default async function page({ params }: { params: { year: string } }) {
  await connectDB();
  const { year } = params;
  const yearlyStudents = await Batch.find({ passedYear: year });

  return (
    <div className="  px-4 py-10 sm:px-8">
      <div>
        <div className="  space-y-8  bg-white ">
          <H3 className=" text-center text-primary ">
            Batch {yearlyStudents[0].passedYear}
          </H3>
          <ListOfStudents filteredStudents={yearlyStudents} />
        </div>
      </div>
    </div>
  );
}
