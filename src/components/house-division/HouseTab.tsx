"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

const tabs = [
  {
    title: "Blue House",
    house_color: "blue",
  },
  {
    title: "Red House",
    house_color: "red",
  },
  {
    title: "Green House",
    house_color: "green",
  },
  {
    title: "Yellow House",
    house_color: "yellow",
  },
];

export default function HouseTab() {
  const params = useParams();
  return (
    <div className=" flex flex-row items-center justify-start gap-4 overflow-auto  pb-4  sm:justify-center md:flex-col">
      {tabs.map((t, idx) => {
        return (
          <Button
            asChild
            key={idx}
            variant="outline"
            className={` w-[120px] border-2 ${t.house_color === params.color && " border-primary text-primary"}`}
          >
            <Link href={`/school-life/house-division/${t.house_color}`}>
              {t.title}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
