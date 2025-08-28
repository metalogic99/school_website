"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";

const yearlyStudents = [
  {
    passedOut: "2080",
    students: [
      { link: "/human.jpg", alternative: "human" },
      { link: "/human.jpg", alternative: "human" },
      { link: "/human.jpg", alternative: "human" },
      { link: "/human.jpg", alternative: "human" },
      { link: "/human.jpg", alternative: "human" },
      { link: "/human.jpg", alternative: "human" },
      { link: "/human.jpg", alternative: "human" },
      { link: "/human.jpg", alternative: "human" },
    ],
  },
  {
    passedOut: "2079",
    students: [
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
    ],
  },
  {
    passedOut: "2078",
    students: [
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
    ],
  },
  {
    passedOut: "2077",
    students: [
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
    ],
  },
  {
    passedOut: "2076",
    students: [
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
    ],
  },
  {
    passedOut: "2075",
    students: [
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
      { link: "/human2.jpg", alternative: "human" },
    ],
  },
];
export default function YearTab({
  uniquePassedYears,
}: {
  uniquePassedYears: any;
}) {
  const params = useParams();

  return (
    <div>
      {" "}
      <div className=" flex flex-row gap-4 overflow-auto pb-4 sm:flex-col">
        {uniquePassedYears?.map((student: any, idx: number) => {
          return (
            <Button
              asChild
              variant="outline"
              className={` border-2 ${student === params.year && "border-primary text-primary"} `}
            >
              <Link key={idx} href={`/passed-out/${student}`}>
                Batch {student}
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
