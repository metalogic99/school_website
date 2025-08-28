import React from "react";
import { H2 } from "@/components/typography";
import Link from "next/link";
import { PencilIcon, PlusCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import connectDB from "@/server/utils/connectDB";
import { Button } from "@/components/ui/button";
import CommonDeleteButtonV2 from "@/components/common/CommonDeleteButtonV2";
import Transportation from "@/server/models/Transportation";
import { deleteTransportation } from "@/server/actions/transportation.action";

export default async function Page() {
  await connectDB();

  const transportation = await Transportation.find();

  return (
    <div>
      <div className="w-full">
        <div className="flex items-center justify-between pb-2">
          <H2 className="font-semibold">Transportation</H2>
          <Button asChild>
            <Link
              href="/admin/transportation/new"
              className="flex items-center gap-2 text-white"
            >
              <PlusCircle size={16} /> Add Staffs
            </Link>
          </Button>
        </div>

        {transportation.length ? (
          <Table className="mt-10 w-full">
            <TableHeader>
              <TableRow>
                <TableHead>SN</TableHead>
                <TableHead>Staff Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Vehicle No.</TableHead>
                <TableHead>Appointed On</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transportation.map((member, index) => (
                <TableRow key={index}>
                  <TableCell className="w-[100px]">{index + 1}</TableCell>
                  <TableCell>{member.staffName}</TableCell>
                  <TableCell>{member.phone}</TableCell>
                  <TableCell>{member.route}</TableCell>
                  <TableCell>{member.vehicleNo}</TableCell>
                  <TableCell>
                    {new Date(member.appointedOn).toDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex gap-2">
                      <Link
                        className="flex items-center justify-center text-blue-500 underline underline-offset-4"
                        href={`/admin/transportation/${member._id}`}
                      >
                        <PencilIcon size={16} />
                      </Link>
                      <div className="flex items-center justify-center text-red-500 underline underline-offset-4">
                        <CommonDeleteButtonV2
                          deleteAction={deleteTransportation}
                          id={member._id.toString()}
                        />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div>
            <h2 className="pt-20 text-center text-destructive">
              No Members!!!
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
