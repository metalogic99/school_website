import AddCircleBtn from "@/components/admin/AddCircleBtn";
import { H2 } from "@/components/typography";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div>
      <div>
        <div className="space-y-8 pb-5">
          <div className="flex  items-center justify-between">
            <H2 className=" text-3xl font-semibold">Manage Donors</H2>
          </div>

          <div className="  flex flex-col gap-4 font-medium">
            <Link
              href="/admin/donors/building"
              className="  rounded-xl  border p-4 shadow-md"
            >
              Building Donors
            </Link>
            <Link
              href="/admin/donors/land"
              className="  rounded-xl  border p-4 shadow-md"
            >
              Land Donors
            </Link>
            <Link
              href="/admin/donors/computer"
              className="  rounded-xl  border p-4 shadow-md"
            >
              Computer Donors
            </Link>
            <Link
              href="/admin/donors/uniform"
              className="  rounded-xl  border p-4 shadow-md"
            >
              Uniform Donors
            </Link>
            <Link
              href="/admin/donors/akshyakosh"
              className="  rounded-xl  border p-4 shadow-md"
            >
              Akshyakosh
            </Link>
            <Link
              href="/admin/donors/others"
              className="  rounded-xl  border p-4 shadow-md"
            >
              Others
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
