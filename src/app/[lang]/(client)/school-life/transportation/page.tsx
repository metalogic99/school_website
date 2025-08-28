import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Transportation from "@/server/models/Transportation";
import Underline from "@/components/common/Underline";
import { DefaultProps } from "@/types";
import Breadcrum from "@/components/common/Breadcrum";

export default async function Page({ params }: DefaultProps) {
  const transportation = await Transportation.find();
  const title = params.lang == "en" ? "Transportation" : "यातायात";
  return (
    <section>
      <Breadcrum heading="Culture" bg={"/eca/buses.jpg"} />

      <div className="container mx-auto mt-2 py-8">
        <Underline title={title} width="150px" />
        <div className="mx-auto max-w-5xl overflow-x-auto">
          <Table className="w-full overflow-hidden rounded-lg bg-white shadow-md">
            <TableHeader>
              <TableRow className="bg-gray-200 text-gray-700">
                <TableHead className="px-4 py-2">SN</TableHead>
                <TableHead className="px-4 py-2">Staff Name</TableHead>
                <TableHead className="px-4 py-2">Phone</TableHead>
                <TableHead className="px-4 py-2">Route</TableHead>
                <TableHead className="px-4 py-2">Vehicle Number</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transportation.map((member, index) => (
                <TableRow key={index} className="hover:bg-gray-100">
                  <TableCell className="border-t px-4 py-2 font-medium">
                    {index + 1}
                  </TableCell>
                  <TableCell className="border-t px-4 py-2">
                    {member.staffName}
                  </TableCell>
                  <TableCell className="border-t px-4 py-2">
                    {member.phone}
                  </TableCell>
                  <TableCell className="border-t px-4 py-2">
                    {member.route}
                  </TableCell>
                  <TableCell className="border-t px-4 py-2">
                    {member.vehicleNo}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
