import React from "react";
import { H2 } from "@/components/typography";
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
import { Button } from "@/components/ui/button";
import Construction from "@/server/models/Construction";
import { deleteConstructionMember } from "@/server/actions/construction/construction.action";

export default async function page() {
  await connectDB();
  const members = await Construction.find();
  return (
    <div>
      <div className="w-full">
        <div className="flex  items-center  justify-between pb-2">
          <H2 className=" font-semibold">Construction Committee</H2>
          <Button asChild>
            <Link
              href="/admin/teams/construction/new"
              className="flex items-center gap-2 text-white"
            >
              <PlusCircle size={16} /> Add Member
            </Link>
          </Button>
        </div>
        {members.length > 0 ? (
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Project Title</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Appointed On</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members
                ? members!.map((n: any) => (
                    <TableRow key={n._id}>
                      <TableCell className=" w-[100px] ">
                        <img
                          src={n.image.secure_url}
                          alt="human"
                          width={50}
                          height={50}
                          className=" h-10 w-10 rounded-full object-cover"
                        />
                      </TableCell>
                      <TableCell>{n.fullname}</TableCell>
                      <TableCell>{n.project_title}</TableCell>
                      <TableCell>{n.designation}</TableCell>
                      <TableCell>{n.address}</TableCell>
                      <TableCell>{n.phone}</TableCell>
                      <TableCell>{dateFormatter(n.appointment_date)}</TableCell>
                      <TableCell>
                        <div className="inline-flex gap-2">
                          <Link
                            className="flex items-center justify-center text-blue-500 underline underline-offset-4"
                            href={`/admin/teams/construction/${n._id}/edit`}
                          >
                            <PencilIcon size={16} />
                          </Link>
                          <div className="flex items-center justify-center text-red-500 underline underline-offset-4"></div>

                          <DeleteAlert
                            deleteAction={deleteConstructionMember}
                            id={JSON.stringify(n._id)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        ) : (
          <div>
            <h2 className=" pt-20 text-center text-destructive">
              No Members!!!{" "}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
