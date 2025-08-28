import React from "react";
import Image from "next/image";
import { H1 } from "../typography";

export const ImageRightContainer = ({
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
    <div id={id} className="overflow-hidden bg-[#fffce2] lg:h-screen">
      <H1 className="bg-primary py-3 text-center text-white">{title}</H1>
      <div className="grid h-full place-items-center gap-x-4  py-10 md:grid-cols-2">
        <p className="order-2 mx-auto px-2 text-xl md:w-4/5">{text}</p>
        <Image
          className="h-full w-[70%] md:order-2"
          src={image}
          alt="General Savings"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
};
