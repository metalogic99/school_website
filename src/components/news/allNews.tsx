"use client";
import React from "react";

import { SingleNews } from ".";
import { H1 } from "../typography";
import { useParams } from "next/navigation";

export const AllNews = ({ data }: { data: any }) => {
  const { lang } = useParams();
  const title = lang === "en" ? "All Blog Post" : "सबै ब्लग पोस्ट";
  const dataArr = JSON.parse(data);
  return (
    <section className="pt-4">
      <div className="bg-center bg-no-repeat  text-white 2xl:container">
        <div className="mx-1 flex flex-col gap-8 rounded-xl text-center 2xl:container sm:mx-8 md:mx-auto md:w-[80%]">
          <H1 className="text-primary">{title}</H1>
        </div>
      </div>

      <div className="2xl:container 2xl:mx-auto">
        <div className="mx-auto w-[80%] py-24">
          {dataArr ? (
            <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {dataArr.map((d: any, idx: number) => (
                <SingleNews key={idx} news={d} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};
