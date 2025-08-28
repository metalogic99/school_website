import { H2 } from "@/components/typography";
import React from "react";
import Link from "next/link";
import { PlusCircle, ArrowUpRightFromSquareIcon } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import VoiceNotice from "@/server/models/VoiceNotice";
import { deleteVoiceNotice } from "@/server/actions/voiceNotice/voiceNotice.action";
import CommonDeleteButtonV2 from "@/components/common/CommonDeleteButtonV2";

const VoiceNotices = async () => {
  await connectDB();
  const data = await VoiceNotice.find().sort({ createdAt: -1 });
  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-2">
        <H2>Voice Notice</H2>
        <Button asChild>
          <Link
            href="/admin/notice/new/voice"
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
                      href={d.voice}
                      target="_blank"
                    >
                      view
                      <ArrowUpRightFromSquareIcon size={16} />
                    </a>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex gap-2">
                      <div className="flex items-center justify-center text-red-500 underline underline-offset-4"></div>

                      <CommonDeleteButtonV2
                        deleteAction={deleteVoiceNotice}
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
};

export default VoiceNotices;
