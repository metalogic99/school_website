"use client";
import React from "react";
import { H1, H3 } from "../typography";
import { Card } from "../ui/card";
import { Gamepad2, Monitor, BookOpen, Bed, Bus } from "lucide-react";
import { DefaultProps, Lang } from "@/types";
import { motion } from "framer-motion";

const cardData = [
  {
    icons: <Bus size={40} />,
    title: { en: "Transportation", np: "यातायात" },
    bgColor: "bg-[#E9FAE1]",
  },
  {
    icons: <BookOpen size={40} />,
    title: { en: "Library", np: "पुस्तकालय" },
    bgColor: "bg-[#F4E2DE]",
  },
  {
    icons: <Monitor size={40} />,
    title: { en: "Computer Labs", np: "कम्प्युटर ल्याब" },
    bgColor: "bg-[#DEEDF4]",
  },
  {
    icons: <Gamepad2 size={40} />,
    title: { en: "Sports", np: "खेलकुद" },
    bgColor: "bg-[#F6F4D6]",
  },
];

export default function Services({ lang }: { lang: Lang }) {
  const title = lang == "en" ? "Our Services" : "हाम्रा सेवाहरु";
  return (
    <section className="py-10">
      <div className="">
        <div className="mb-16 text-center">
          <H1 className="text-3xl font-semibold">{title}</H1>
        </div>
        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cardData.map((card, index) => (
            <motion.div
              initial={{ scale: 1, boxShadow: "none" }}
              animate={{
                boxShadow: [
                  "0px 0px 0px rgba(0, 0, 0, 0)",
                  "0px 5px 10px rgba(0, 0, 0, 0.2)",
                  "0px 0px 0px rgba(0, 0, 0, 0)",
                ],
                scale: 1.05,
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.5,
                delay: index * 0.3,
              }}
              key={index}
              className={`${card.bgColor} flex h-[150px] w-[250px] items-center justify-center rounded-lg  transition-transform duration-300 hover:scale-105 hover:drop-shadow-xl`}
            >
              <div className="flex flex-col items-center justify-center">
                {card.icons}
                <H3 className="text-xl font-semibold text-black">
                  {lang === "en" ? card.title.en : card.title.np}
                </H3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
