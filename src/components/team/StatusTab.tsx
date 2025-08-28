"use client";
import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function StatusTab({
  selected,
  setSelected,
}: {
  selected: any;
  setSelected: any;
}) {
  const pathname = usePathname();
  const isStaffPage = pathname.startsWith("/team/academic_staff");

  return (
    <div className={`${isStaffPage ? "block" : "hidden"}`}>
      <div className=" flex flex-row items-center justify-start gap-4 overflow-auto whitespace-nowrap pb-4 text-sm md:flex-wrap md:justify-center">
        <button
          onClick={() => setSelected("ongoing")}
          className={cn(
            "rounded-full  border-2 border-primary px-4 py-1 text-primary transition-all duration-300",
            selected === "ongoing" && "bg-primary text-white",
          )}
        >
          Ongoing Teachers
        </button>
        <button
          onClick={() => setSelected("retired")}
          className={cn(
            "rounded-full  border-2 border-primary px-4 py-1 text-primary transition-all duration-300",
            selected === "retired" && "bg-primary text-white",
          )}
        >
          Retired Teachers
        </button>
        <button
          onClick={() => setSelected("transfered")}
          className={cn(
            "rounded-full  border-2 border-primary px-4 py-1 text-primary transition-all duration-300",
            selected === "transfered" && "bg-primary text-white",
          )}
        >
          Transfered Teachers
        </button>
        <button
          onClick={() => setSelected("past")}
          className={cn(
            "rounded-full  border-2 border-primary px-4 py-1 text-primary transition-all duration-300",
            selected === "past" && "bg-primary text-white",
          )}
        >
          Past Head Teachers
        </button>
      </div>
    </div>
  );
}
