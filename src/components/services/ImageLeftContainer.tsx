import React from "react";
import Image from "next/image";
import { H1 } from "../typography";

export const ImageLeftContainer = ({
  text,
  image,
  title,
  id,
}: {
  text: string;
  image: string;
  title: string;
  id: string;
}) => {
  return (
    <div id={id} className="h-screen overflow-hidden bg-[#f2fbdc]">
      <H1 className="bg-primary py-3 text-center text-white">{title}</H1>
      <div className="grid h-full place-items-center gap-x-4 py-10 md:grid-cols-2">
        <Image
          className="h-full w-[70%]"
          src={image}
          alt="General Savings"
          width={200}
          height={200}
        />
        <p className="mx-auto px-2 text-xl md:w-4/5">{text}</p>
      </div>
    </div>
  );
};
