import RoutineTab from "@/components/routine/RoutineTab";
import { H3 } from "@/components/typography";
import { Lang } from "@/types";
import React, { ReactNode } from "react";

export default async function layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: Lang };
}) {
  const title = params.lang === "en" ? "Routines" : "रुटिनहरू";

  return (
    <div className="  px-2 py-10 sm:px-4 md:px-8">
      <section className=" flex flex-col gap-8 md:flex-row">
        <div className=" space-y-8">
          <H3 className=" whitespace-nowrap text-center font-semibold text-primary">
            {title}
          </H3>
          <RoutineTab />
        </div>
        <div className=" flex-1 ">{children}</div>
      </section>
    </div>
  );
}
