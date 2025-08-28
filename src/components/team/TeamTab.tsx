"use client";
import React from "react";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import Link from "next/link";

const tabs = [
  {
    title: "Board of Directors",
    type: "bod",
  },
  {
    title: "Directors",
    type: "director",
  },
  {
    title: "Academic Staff",
    type: "academic_staff",
  },

  {
    title: "Examination",
    type: "examination",
  },
  {
    title: "Management",
    type: "management",
  },
  {
    title: "Non Academic",
    type: "non_academic_staff",
  },
  {
    title: "Sports",
    type: "sports",
  },
  {
    title: "Cultural",
    type: "cultural",
  },

  {
    title: "SMC",
    type: "smc",
  },
  {
    title: "TPC",
    type: "tpc",
  },
];
export default function TeamTab() {
  const params = useParams();

  return (
    <div>
      <div className=" flex flex-row gap-4 overflow-auto pb-4 md:flex-col">
        {tabs?.map((team: any, idx: number) => {
          return (
            <Button
              asChild
              variant="outline"
              className={` border-2 ${team.type === params.type && "border-primary text-primary"} `}
            >
              <Link key={idx} href={`/team/${team.type}`}>
                {team.title}
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
