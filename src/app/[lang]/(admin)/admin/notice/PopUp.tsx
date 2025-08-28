import { H2 } from "@/components/typography";
import React from "react";
import Link from "next/link";
import { PlusCircle, ArrowUpRightFromSquareIcon } from "lucide-react";
import DeleteAlert from "@/components/DeleteAlert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import connectDB from "@/server/utils/connectDB";
import { dateFormatter } from "@/lib/dateFormatter";

import { deletePopupNotice } from "@/server/actions/notice/popup.action";
import PopupNotice from "@/server/models/PopupNotice";
import { Button } from "@/components/ui/button";

const DashboardNotice = async () => {
  await connectDB();
  const data = await PopupNotice.find().sort({ createdAt: -1 });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-2">
        <H2>Pop Up Notice</H2>
        <Button asChild>
          <Link
            href="/admin/notice/new/popup"
            className="flex items-center gap-2 text-white"
          >
            <PlusCircle size={16} /> Create new
          </Link>
        </Button>
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>View</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data
            ? data.map((d) => (
                <TableRow key={d._id}>
                  <TableCell className="line-clamp-2 w-[500px]">
                    {d.title}
                  </TableCell>
                  <TableCell>{dateFormatter(d.createdAt)}</TableCell>
                  <TableCell>
                    <a
                      className="flex items-center gap-2 text-blue-600"
                      href={d.image.secure_url}
                      target="_blank"
                    >
                      view
                      <ArrowUpRightFromSquareIcon size={16} />
                    </a>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex gap-2">
                      <div className="flex items-center justify-center text-red-500 underline underline-offset-4"></div>

                      <DeleteAlert
                        deleteAction={deletePopupNotice}
                        id={JSON.stringify(d._id)}
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
};

export default DashboardNotice;
