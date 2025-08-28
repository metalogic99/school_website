import HouseTab from "@/components/house-division/HouseTab";
import { H3 } from "@/components/typography";
import connectDB from "@/server/utils/connectDB";
import React, { ReactNode, Suspense } from "react";

export default async function layout({ children }: { children: ReactNode }) {
  await connectDB();

  return (
    <Suspense>
      <div className="  min-h-screen px-2 py-10 md:px-40">
        <section className=" flex flex-col gap-8 md:flex-row ">
          <div className=" sticky left-0 top-[68px] z-10 h-fit bg-white py-2 sm:top-[88px] md:bg-transparent ">
            <H3 className=" mb-8 whitespace-nowrap text-center font-semibold text-primary">
              Houses
            </H3>
            <HouseTab />
          </div>
          <div className=" flex-1">{children}</div>
        </section>
      </div>
    </Suspense>
  );
}
