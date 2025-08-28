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
import YearlyBook from "@/server/models/YearlyBook";
import { unstable_noStore as noStore } from "next/cache";
import CommonDeleteButtonV2 from "@/components/common/CommonDeleteButtonV2";
import { deleteYearlyBook } from "@/server/actions/yearlyBook/yearlybook.action";

const page = async () => {
  noStore();
  try {
    await connectDB();
    const yearlyBooks = await YearlyBook.find().sort({ createdAt: -1 });

    return (
      <div>
        <div className="flex items-center justify-between pb-5">
          <H2 className=" font-semibold">All Year Books</H2>
          <Button asChild>
            <Link
              href="/admin/documents/new/books"
              className="flex items-center gap-2 text-white"
            >
              <PlusCircle size={16} /> Add Year Book
            </Link>
          </Button>
        </div>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Year Book</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>View</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {yearlyBooks
              ? yearlyBooks.map((d) => (
                  <TableRow key={d._id.toString()}>
                    <TableCell>{d.title}</TableCell>
                    <TableCell>{dateFormatter(d.createdAt)}</TableCell>
                    <TableCell>
                      <Link
                        href={d.book}
                        className="flex items-center gap-2 text-blue-600"
                        target="_blank"
                      >
                        view <ArrowUpRightFromSquare size={16} />
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex gap-2">
                        <CommonDeleteButtonV2
                          deleteAction={deleteYearlyBook}
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
