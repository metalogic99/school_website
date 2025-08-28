"use client";
import { Edit } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function BatchEditBtn({ id }: { id: string }) {
  const pathname = usePathname();
  return (
    <div>
      <Link
        href={`${pathname}/${id}/edit`}
        className=" hidden text-white group-hover:block"
      >
        <Edit size={20} />
      </Link>
    </div>
  );
}
