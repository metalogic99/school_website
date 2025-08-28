"use client";
import React, { useEffect, useState } from "react";
import MyImage from "../common/MyImage";

export default function ListOfConstruction({
  teamMembers,
  slug,
}: {
  teamMembers: any;
  slug: any;
}) {
  return (
    <section>
      {/* <StatusTab selected={selected} setSelected={setSelected} /> */}
      <div className=" grid grid-cols-1 place-items-center items-center justify-center gap-8  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {teamMembers?.length > 0 &&
          teamMembers?.map((member: any, idx: number) => {
            return (
              <div key={idx} className=" w-fit rounded-xl border shadow-lg">
                <div className="  w-56">
                  <MyImage
                    height="100%"
                    width="100%"
                    image={member.image.secure_url}
                    classname={" h-64 w-64 rounded-b-none "}
                  />
                </div>
                <div className=" space-y-1 pb-2 text-center">
                  <h2 className=" font-medium text-primary">
                    {member.fullname}
                  </h2>

                  <p className=" text-sm text-muted-foreground ">
                    {member.designation}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
