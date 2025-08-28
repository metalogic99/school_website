import React from "react";
import Link from "next/link";
import { ArrowUpRightFromSquare, PlusCircle } from "lucide-react";
import { H2 } from "@/components/typography";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dateFormatter } from "@/lib/dateFormatter";
import connectDB from "@/server/utils/connectDB";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Syllabus from "@/server/models/syllabus";
import CommonDeleteButtonV2 from "@/components/common/CommonDeleteButtonV2";
import { deleteSyllabus } from "@/server/actions/syllabus/syllabus.action";

const page = async () => {
  try {
    await connectDB();
    const syllabus = await Syllabus.find().sort({ createdAt: -1 });
    return (
      <div>
        <div className="flex items-center justify-between pb-5">
          <H2 className=" font-semibold">All Courses</H2>

          <Button asChild>
            <Link
              href="/admin/documents/new/courses"
              className="flex items-center gap-2 text-white"
            >
              <PlusCircle size={16} /> Add new Course
            </Link>
          </Button>
        </div>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Grade</TableHead>
              <TableHead>Session</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>View</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {syllabus
              ? syllabus.map((d, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{d.grade}</TableCell>
                    <TableCell>{d.session}</TableCell>
                    <TableCell>{dateFormatter(d.createdAt)}</TableCell>
                    <TableCell>
                      <Link
                        href={d.pdf}
                        className="flex items-center gap-2 text-blue-600"
                        target="_blank"
                      >
                        view <ArrowUpRightFromSquare size={16} />
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex gap-2">
                        <CommonDeleteButtonV2
                          deleteAction={deleteSyllabus}
                          id={d._id.toString()}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    );
  } catch (err) {
    console.log(err);
    return notFound();
  }
};

export default page;
