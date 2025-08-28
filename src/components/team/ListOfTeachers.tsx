"use client";
import React, { useEffect, useState } from "react";
import MyImage from "../common/MyImage";
import StatusTab from "./StatusTab";

export default function ListOfTeachers({
  teamMembers,
  slug,
}: {
  teamMembers: any;
  slug: any;
}) {
  const [selected, setSelected] = useState("ongoing");
  const [others, setOthers] = useState([]);

  const head = teamMembers.find((m: any) => m.rank === 1);

  useEffect(() => {
    if (selected === "past") {
      let others = teamMembers.filter((m: any) => {
        if (m.rank === "1" && m.status === "retired") {
          return m;
        }
      });
      setOthers(others);
    } else if (selected === "retired") {
      let others = teamMembers.filter((m: any) => {
        if (m.rank >= "2" && m.status === "retired") {
          return m;
        }
      });
      setOthers(others);
    } else {
      let others = teamMembers.filter((m: any) => m.status === selected);
      setOthers(others);
    }
  }, [selected]);
  const otherMembers = teamMembers;
  return (
    <section>
      <StatusTab selected={selected} setSelected={setSelected} />

      {/* <div className=" mb-10 flex items-center justify-center">
        {head && (
          <div className="   w-fit      rounded-xl border shadow-lg">
            <div className=" h-80 w-56">
              <MyImage
                height="100%"
                width="100%"
                image={head.image.secure_url}
                classname={" h-80 w-56 rounded-b-none "}
              />
            </div>
            <div className=" space-y-1 py-2 text-center">
              <h2 className=" font-medium text-primary">{head.fullname}</h2>

              <p className=" text-sm text-muted-foreground ">
                {head.designation}
              </p>
            </div>
          </div>
        )}
      </div> */}
      <div className=" flex flex-wrap items-center justify-center gap-8 ">
        {others?.length > 0 &&
          others?.map((member: any, idx: number) => {
            if (selected === "past") {
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
                    <p className=" text-xs text-muted-foreground ">
                      2078-10-1 to 2080-12-30
                    </p>
                  </div>
                </div>
              );
            } else {
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
            }
          })}
      </div>
    </section>
  );
}
