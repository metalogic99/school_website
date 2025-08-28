import React from "react";
import { H1, P } from "../typography";
import Link from "next/link";
import { Lang } from "@/types";

export default function GiftedBy({ lang }: { lang: Lang }) {
  const title =
    lang === "en" ? "Gifted By Students" : "विद्यार्थीहरू द्वारा उपहार";
  const students = lang === "en" ? " SLC 2051 Batch" : "एस.एल.सी २०५१ ब्याच";
  return (
    // <Link href={"/gifted-by"}>
    <section className="  relative mx-auto h-[50vh] cursor-pointer bg-primary/20">
      <img
        src="/gift1.png"
        alt="gift"
        width={80}
        className=" absolute left-0 drop-shadow-xl"
      />
      {/* AROUND THE TITLE */}
      <img
        src="/gift2.png"
        alt="gift"
        width={70}
        className=" absolute left-[20%] top-14 drop-shadow-xl  sm:left-[40%]"
      />
      {/* AROUND THE TITLE */}
      <img
        src="/gift3.png"
        alt="gift"
        width={70}
        className=" absolute right-[20%] top-10 rotate-45 drop-shadow-xl sm:right-[40%]"
      />
      <img
        src="/gift1.png"
        alt="gift"
        width={150}
        className=" absolute right-8 top-40 hidden drop-shadow-xl sm:block"
      />
      <img
        src="/gift2.png"
        alt="gift"
        width={80}
        className=" absolute right-0 drop-shadow-xl"
      />
      <img
        src="/gift2.png"
        alt="gift"
        width={200}
        className=" absolute bottom-10 left-20 hidden drop-shadow-xl  sm:block"
      />
      {/* BOTTOM GIFTS */}
      <img
        src="/gift2.png"
        alt="gift"
        width={200}
        className=" absolute -bottom-10 left-[40%] w-[120px] drop-shadow-xl  sm:w-[200px]"
      />
      <img
        src="/gift3.png"
        alt="gift"
        width={200}
        className="absolute -bottom-10 right-[20%]  hidden  rotate-45 drop-shadow-xl  sm:block  "
      />
      <div className=" absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] whitespace-nowrap py-10 text-center">
        <H1 className=" text-primary">{title}</H1>
        {/* <P className="text-lg font-medium text-primary/90">Of</P> */}
        <P className="text-center text-lg font-medium text-primary/70 ">
          {students}
        </P>
        <Link
          href={"/gifted-by"}
          className=" text-sm font-semibold text-muted-foreground hover:underline"
        >
          View All
        </Link>
      </div>
    </section>
    // </Link>
  );
}
