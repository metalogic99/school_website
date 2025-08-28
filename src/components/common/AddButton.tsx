"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Edit, Plus } from "lucide-react";

type AddProps = {
  to?: string;
};

export default function AddButton({ to }: AddProps) {
  const pathname = usePathname();

  return (
    <Link
      href={to ? to : `${pathname}/new`}
      className=" flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white"
    >
      {" "}
      <Plus size={20} /> Add
    </Link>
  );
}
