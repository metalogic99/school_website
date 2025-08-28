import React from "react";
import { H3 } from "../typography";
import Image from "next/image";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { homeDictionary } from "@/dictionary/home";

export const Why = ({ lang }: { lang: string }) => {
  const data = [
    {
      image: "/home/why/problem.svg",
      title: homeDictionary[lang as keyof typeof homeDictionary].memberOriented,
    },

    {
      image: "/home/why/heart.svg",
      title: homeDictionary[lang as keyof typeof homeDictionary].social,
    },

    {
      image: "/home/why/rate.svg",
      title: homeDictionary[lang as keyof typeof homeDictionary].interestRate,
    },
  ];

  return (
    <section
      style={{
        background: "url(/home/why/whybg.png) no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="py-20 text-center">
        <H3 className="pb-10 text-2xl font-bold text-white lg:pb-0">
          {homeDictionary[lang as keyof typeof homeDictionary].whySatlok}
        </H3>

        <div className="grid place-items-center gap-y-8 sm:grid-cols-2 md:pt-32 lg:mx-auto lg:grid-cols-3 xl:w-[80%]">
          {data.map((d, idx) => (
            <Card
              key={idx}
              className={`h-[400px] w-[300px] rounded-[3rem] bg-[rgba(0,0,0,0.4)] py-10 text-white backdrop-blur ${idx == 1 ? "lg:-translate-y-16" : ""}`}
            >
              <CardHeader className="flex items-center gap-y-16">
                <Image
                  src={d.image}
                  alt="social image my-8"
                  width={100}
                  height={100}
                />
                <CardTitle className="text-3xl">{d.title}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
