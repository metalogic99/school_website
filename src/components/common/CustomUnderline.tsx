import React from "react";
import { H2 } from "../typography";

export default function CustomUnderline({
  title,
  width,
  border_color,
  house_color,
}: {
  title: string;
  width: string;
  border_color: string;
  house_color: string;
}) {
  return (
    <div>
      <div className="  flex w-auto flex-col items-center justify-center pb-10">
        <H2
          className={`  text-center font-semibold capitalize ${house_color === "blue" ? " text-primary" : house_color === "red" ? " text-red-500" : house_color === "green" ? " text-green-500" : " text-yellow-500"}`}
        >
          {house_color} House Team
        </H2>
        <div
          style={{ borderLeftWidth: width }}
          className={` h-0 w-0 border-b-[10px] border-l-[${width}] border-b-transparent ${border_color} `}
        ></div>
      </div>
    </div>
  );
}
