import React from "react";

export default function NoData({ message }: { message?: string }) {
  return (
    <div className=" flex w-full flex-col justify-center  ">
      <img
        src="/nodata.svg"
        height={400}
        width={400}
        className=" self-center"
      />
      <p className=" text-center text-xl font-semibold tracking-tight  text-primary">
        {message}
      </p>
    </div>
  );
}
