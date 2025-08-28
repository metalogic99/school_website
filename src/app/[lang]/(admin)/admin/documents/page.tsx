import React from "react";
import Link from "next/link";
import { H2 } from "@/components/typography";
import Doc from "@/server/models/Document";
import connectDB from "@/server/utils/connectDB";
import { notFound } from "next/navigation";

const page = async () => {
  try {
    await connectDB();
    const documents = await Doc.find().sort({ createdAt: -1 });
    return (
      <div>
        <div className="space-y-8 pb-5">
          <H2 className=" text-3xl font-semibold">Manage Documents</H2>

          <div className="  flex flex-col gap-4 font-medium">
            <Link
              href="/admin/documents/courses"
              className="  rounded-xl  border p-4 shadow-md"
            >
              Manage Courses
            </Link>
            <Link
              href="/admin/documents/books"
              className="  rounded-xl  border p-4 shadow-md"
            >
              Manage Year Books
            </Link>
            <Link
              href="/admin/documents/class-routine"
              className="  rounded-xl  border p-4 shadow-md"
            >
              Manage Class Routine
            </Link>
            <Link
              href="/admin/documents/exam-routine"
              className="  rounded-xl  border p-4 shadow-md"
            >
              Manage Exam Routine
            </Link>
            <Link
              href="/admin/documents/calender"
              className="  rounded-xl  border p-4 shadow-md"
            >
              Manage Academic Calender
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
