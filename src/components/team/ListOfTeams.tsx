"use client";
import React from "react";
import MyImage from "../common/MyImage";

export default function ListOfTeams({
  teamMembers,
  slug,
}: {
  teamMembers: any;
  slug: any;
}) {
  const head = teamMembers.find((m: any) => m.isHead === true);

  const otherMembers = teamMembers?.filter((m: any) => m.isHead === false);
  return (
    <section>
      <div className=" mb-10 flex items-center justify-center">
        {head &&
        head?.length > 0 &&
        (head.type === "tpc" || head.type === "smc") ? (
          <div className="   w-fit      rounded-xl border shadow-lg">
            <div className="  w-56">
              <MyImage
                height="100%"
                width="100%"
                image={head?.image.secure_url}
                classname={" h-64 w-56 rounded-b-none "}
              />
            </div>
            <div className=" space-y-1 pb-2 text-center">
              <h2 className=" font-medium text-primary">{head.fullname}</h2>

              <p className=" text-sm text-muted-foreground ">
                {head.designation}
              </p>
              <p className=" text-xs text-muted-foreground ">
                {head.appointment_date}
              </p>
            </div>
          </div>
        ) : (
          ""
        )}

        {head && head.length > 0 && (
          <div className="   w-fit      rounded-xl border shadow-lg">
            <div className="  w-56">
              <MyImage
                height="100%"
                width="100%"
                image={head?.image.secure_url}
                classname={" h-64 w-56 rounded-b-none "}
              />
            </div>
            <div className=" space-y-1 pb-2 text-center">
              <h2 className=" font-medium text-primary">{head?.fullname}</h2>

              <p className=" text-sm text-muted-foreground ">
                {head?.designation}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className=" flex flex-wrap items-center justify-center gap-8  ">
        {otherMembers?.length > 0 &&
          otherMembers?.map((member: any, idx: number) => {
            if (member.type === "tpc" || member.type === "smc") {
              return (
                <div key={idx} className=" w-fit rounded-xl border shadow-lg">
                  <div className=" w-56">
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
                      {member.appointment_date}
                    </p>
                  </div>
                </div>
              );
            }
            return (
              <div key={idx} className=" w-fit rounded-xl border shadow-lg">
                <div className=" w-56">
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
