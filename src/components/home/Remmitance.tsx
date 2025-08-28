import React from "react";
import Image from "next/image";
import { H3 } from "../typography";
import { homeDictionary } from "@/dictionary/home";

export const Remmitance = ({ lang }: { lang: string }) => {
  return (
    <section
      style={{
        background: "",
      }}
    >
      <div className="space-y-10 py-8 text-center">
        <H3 className="font-bold text-red-600">
          {homeDictionary[lang as keyof typeof homeDictionary].remmitance}
        </H3>
        <div className="mx-auto flex flex-wrap items-center justify-center gap-y-8 lg:w-3/4">
          <Image
            src="/home/remmitance/imepay.svg"
            alt="imepay"
            width={300}
            height={40}
          />

          <Image
            src="/home/remmitance/imeremmitance.svg"
            alt="imepay"
            width={300}
            height={40}
          />

          <Image
            src="/home/remmitance/westernunion.svg"
            alt="imepay"
            width={300}
            height={40}
          />
        </div>
      </div>
    </section>
  );
};
