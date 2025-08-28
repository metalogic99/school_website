import { H2 } from "@/components/typography";
import React from "react";
import Link from "next/link";
import { PencilIcon, Info, PlusCircle } from "lucide-react";
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
import Blogs from "@/server/models/blogs";
import { deleteBlog } from "@/server/actions/blogs/blogs.action";

const page = async () => {
  await connectDB();
  const blogs = await Blogs.find().sort({ createdAt: -1 });

  return (
    <div className="w-full">
      <div className="pb-2">
        <H2>All Blogs</H2>
        <Link
          href="/admin/blogs/new"
          className="flex items-center gap-2 text-blue-500 underline underline-offset-4"
        >
          <PlusCircle size={16} /> Create new blog
        </Link>
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs
            ? blogs.map((n) => (
                <TableRow key={n._id}>
                  <TableCell className="line-clamp-2 w-[500px]">
                    {n.title}
                  </TableCell>
                  <TableCell>{dateFormatter(n.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex gap-2">
                      <Link
                        className="flex items-center justify-center text-blue-500 underline underline-offset-4"
                        href={`/admin/blogs/${n._id}/edit`}
                      >
                        <PencilIcon size={16} />
                      </Link>
                      <div className="flex items-center justify-center text-red-500 underline underline-offset-4"></div>

                      <DeleteAlert
                        deleteAction={deleteBlog}
                        id={JSON.stringify(n._id)}
                      />
                      <Link
                        className="flex items-center justify-center text-green-500 underline underline-offset-4"
                        href={`/blogs/${n._id}/`}
                      >
                        <Info size={16} />
                      </Link>
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

export default page;
