"use client";
import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

const tabs = [
  {
    title: "Class Routine",
    type: "class-routine",
  },
  {
    title: "Exam Routine",
    type: "exam-routine",
  },
];

export default function RoutineTab() {
  const pathname = usePathname();
  return (
    <div>
      {" "}
      <div className=" flex flex-row  items-center justify-center gap-4 overflow-hidden pb-4 md:flex-col">
        {tabs?.map((routine: any, idx: number) => {
          return (
            <Button
              key={idx}
              asChild
              variant="outline"
              className={` border-2 transition-colors duration-300  ${pathname.includes(routine.type) && "border-primary  text-primary"} `}
            >
              <Link key={idx} href={`/routines/${routine.type}`}>
                {routine.title}
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
