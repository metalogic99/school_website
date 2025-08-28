import React from "react";
import Link from "next/link";
import { H2 } from "@/components/typography";
import connectDB from "@/server/utils/connectDB";
import { notFound } from "next/navigation";
import AddButton from "@/components/common/AddButton";

const page = async () => {
  try {
    await connectDB();
    return (
      <div>
        <div className="space-y-8 pb-5">
          <div className=" flex items-center justify-between">
            <H2 className=" text-3xl font-semibold">Manage Documents</H2>
          </div>

          <div className="  flex flex-col gap-4 font-medium">
            <Link
              href="/admin/house-division/blue"
              className="  rounded-xl  border p-4 shadow-md"
            >
              Blue House
            </Link>
            <Link
              href="/admin/house-division/red"
              className="  rounded-xl  border p-4 shadow-md"
            >
              Red House
            </Link>
            <Link
              href="/admin/house-division/yellow"
              className="  rounded-xl  border p-4 shadow-md"
            >
              Yellow House
            </Link>
            <Link
              href="/admin/house-division/green"
              className="  rounded-xl  border p-4 shadow-md"
            >
              Green House
            </Link>
          </div>
        </div>
      </div>
    );
  } catch (err) {
    console.log(err);
    return notFound();
  }
};

export default page;
