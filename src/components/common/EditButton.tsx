"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Edit } from "lucide-react";

export default function EditButton({ id }: { id: string }) {
  const pathname = usePathname();

  return (
    <Link
      href={`${pathname}/${id}/edit`}
      className=" flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white"
    >
      {" "}
      <Edit size={16} /> Edit
    </Link>
  );
}
