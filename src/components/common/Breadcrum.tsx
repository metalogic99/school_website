"use client";

import { ChevronLeft } from "lucide-react";
import React from "react";
import { H3, H4 } from "../typography";
import { useRouter } from "next/navigation";

export default function Breadcrum({
  bg,
  heading,
}: {
  bg: any;
  heading: string;
}) {
  const router = useRouter();
  return (
    <div
      style={{
        background: `url(${bg}) no-repeat center/cover`,
      }}
      className=" relative  h-[50vh]"
    >
      <div className=" absolute inset-0 bg-black/40 bg-gradient-to-t from-black  via-transparent to-transparent"></div>
      <div
        onClick={() => router.back()}
        className="absolute bottom-4 left-4 z-0 flex cursor-pointer items-center  text-white hover:text-blue-400"
      >
        <ChevronLeft size={20} />
        <H4 className="text-center">Back</H4>
      </div>
      <div className=" absolute bottom-10 left-[50%] z-20 -translate-x-[50%]">
        <H3 className=" text-center tracking-wide text-white">{heading}</H3>
      </div>
    </div>
  );
}
