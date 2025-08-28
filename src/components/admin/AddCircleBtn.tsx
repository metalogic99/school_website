"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { PlusCircle, PlusIcon } from "lucide-react";

const AddCircleBtn = ({ title, href }: { title: string; href: string }) => {
  return (
    <Button asChild>
      <Link href={href} className="flex items-center gap-2 text-white">
        <PlusCircle size={16} />
        {title}
      </Link>
    </Button>
  );
};

export default AddCircleBtn;
