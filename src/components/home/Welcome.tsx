import React from "react";
import Link from "next/link";
import { H2, H1 } from "../typography";
import { homeDictionary } from "@/dictionary/home";
import { Button } from "../ui/button";

export const Welcome = ({ lang }: { lang: string }) => {
  return (
    <section
      style={{
        background: "url(/home/diamonds.svg) no-repeat  95%",
      }}
      className=""
    >
      <H2 className="pb-10 pt-20 text-center text-red-600 md:pb-4">
        तपाइलाई हाम्रो सहकारीमा स्वागत छ
      </H2>
      <div className="grid gap-x-8 bg-white pb-10 md:mx-auto md:max-w-[80%] md:grid-cols-2 md:bg-transparent lg:mx-0">
        <div className="flex items-center justify-center md:justify-end">
          <img src="/namaste.webp" className="h-[500px] rounded-lg" />
        </div>

        <div className="px-4 text-center md:px-0 md:text-left">
          <div className="space-y-10 py-10  md:bg-transparent lg:py-32">
            <H1 className="text-2xl font-semibold md:text-3xl">
              “गरिवी न्यूनीकरण र उद्यमशिलता श्रृजना”
            </H1>

            <p className={`${lang === "en" ? "text-md" : "text-xl"}`}>
              {
                homeDictionary[lang as keyof typeof homeDictionary]
                  .welcomeContent
              }
            </p>

            <Button asChild variant="outline" className="border-primary">
              <Link href="/about" className="block py-5 text-xl text-primary">
                विवरण हेर्नुहोस{" "}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
