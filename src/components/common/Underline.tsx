import React from "react";
import { H2 } from "../typography";

export default function Underline({
  title,
  width,
}: {
  title: string;
  width: string;
}) {
  return (
    <div>
      <div className="  flex w-auto flex-col items-center justify-center pb-10">
        <H2 className="  text-center">{title}</H2>
        <div
          style={{ borderLeftWidth: width }}
          className={` h-0 w-0 border-b-[10px] border-l-[${width}] border-b-transparent border-l-primary `}
        ></div>
      </div>
    </div>
  );
}
