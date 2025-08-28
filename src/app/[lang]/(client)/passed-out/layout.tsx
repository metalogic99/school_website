import YearTab from "@/components/batch/YearTab";
import { H3 } from "@/components/typography";
import Batch from "@/server/models/batch";
import connectDB from "@/server/utils/connectDB";
import React, { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
  await connectDB();
  const batch = await Batch.find();

  const passedYears = batch.map((b) => b.passedYear);
  const uniquePassedYears = passedYears.filter(
    (year, index) => passedYears.indexOf(year) === index,
  );

  return (
    <div className="  px-4 py-10 sm:px-8">
      <section className=" flex flex-col gap-8 sm:flex-row">
        <div className=" sticky left-0  top-[70px] z-10 h-fit space-y-8 bg-white py-2 sm:top-[80px] sm:bg-transparent">
          <H3 className=" whitespace-nowrap text-primary">Passed Students</H3>
          <YearTab uniquePassedYears={uniquePassedYears} />
        </div>
        <div>
          {children}
          {/* <div className="  space-y-8  bg-white ">
            <H3 className=" text-center text-primary ">Batch 2080</H3>
          </div> */}
        </div>
      </section>
    </div>
  );
}
