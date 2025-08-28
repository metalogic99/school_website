import TeamTab from "@/components/team/TeamTab";
import { H3 } from "@/components/typography";
import Batch from "@/server/models/batch";
import connectDB from "@/server/utils/connectDB";
import { Lang } from "@/types";
import React, { ReactNode } from "react";

export default async function layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: Lang };
}) {
  const title = params.lang === "en" ? "Our Teams" : "हाम्रा टोलीहरू";

  await connectDB();
  const batch = await Batch.find();
  const passedYears = batch.map((b) => b.passedYear);
  const uniquePassedYears = passedYears.filter(
    (year, index) => passedYears.indexOf(year) === index,
  );

  return (
    <div className="  min-h-screen px-2 py-10 md:px-8">
      <section className=" flex flex-col md:flex-row md:gap-8">
        <div className="sticky left-0  top-[79px] z-10  h-fit space-y-8  bg-[#fcfcfd]  md:top-36 ">
          <H3 className=" whitespace-nowrap text-center font-semibold text-primary">
            {title}
          </H3>
          <TeamTab />
        </div>
        <div className=" flex-1 ">{children}</div>
      </section>
    </div>
  );
}
