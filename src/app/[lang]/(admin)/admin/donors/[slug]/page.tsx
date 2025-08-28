import { H2, H4 } from "@/components/typography";
import connectDB from "@/server/utils/connectDB";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { PencilIcon } from "lucide-react";
import CommonDeleteButtonV2 from "@/components/common/CommonDeleteButtonV2";
import AddCircleBtn from "@/components/admin/AddCircleBtn";
import Donors from "@/server/models/Donors";
import { deleteDonor } from "@/server/actions/donors/donor.action";

export default async function page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  await connectDB();

  const donors = await Donors.find({ donation_type: slug });
  console.log("donors xa?", donors);
  return (
    <div className=" px-4 2xl:container">
      <div>
        <div className=" flex items-center  justify-between">
          <H2>Donors List</H2>
          <AddCircleBtn title="Add Donor" href={`/admin/donors/${slug}/new`} />
        </div>
        <section className=" mt-8 flex flex-col gap-8">
          {/* TABLE PART */}
          <Table className="mt-8 w-full  overflow-hidden whitespace-nowrap  rounded-xl ">
            <TableHeader className=" rounded-t-xl bg-primary/40">
              <TableRow>
                <TableHead>S.N</TableHead>
                <TableHead>Photo</TableHead>
                <TableHead>Fullname</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Phone</TableHead>
                {slug === "akshyakosh" && (
                  <TableHead>Donation Amount</TableHead>
                )}
                {slug === "others" && <TableHead>Donation Title</TableHead>}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donors
                ? donors.map((d: any, idx: number) => (
                    <TableRow key={d._id.toString()}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>
                        <img
                          src={d.photo.secure_url}
                          alt="person"
                          className=" h-10 w-10 rounded-full object-cover"
                        />
                      </TableCell>
                      <TableCell>{d.fullname}</TableCell>
                      <TableCell>{d.address}</TableCell>
                      <TableCell>{d.phone}</TableCell>
                      {d.donation_amount && (
                        <TableCell>Rs. {d.donation_amount}</TableCell>
                      )}
                      {d.donation_title && (
                        <TableCell className=""> {d.donation_title}</TableCell>
                      )}

                      <TableCell>
                        <div className="inline-flex gap-2">
                          <Link
                            className="flex items-center justify-center text-blue-500 underline underline-offset-4"
                            href={`/admin/donors/${d.donation_type}/${d._id}/edit`}
                          >
                            <PencilIcon size={16} />
                          </Link>
                          <div className="flex items-center justify-center text-red-500 underline underline-offset-4"></div>

                          <CommonDeleteButtonV2
                            deleteAction={deleteDonor}
                            id={String(d._id)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
          {(!donors || donors.length === 0) && (
            <div className=" flex h-[80vh] items-center justify-center">
              <H2>NO donner's yet</H2>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
