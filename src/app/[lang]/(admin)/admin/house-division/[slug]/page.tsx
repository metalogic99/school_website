import React from "react";
import { H2 } from "@/components/typography";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import connectDB from "@/server/utils/connectDB";
import { unstable_noStore as noStore } from "next/cache";
import CommonDeleteButtonV2 from "@/components/common/CommonDeleteButtonV2";
import { deleteHouseMember } from "@/server/actions/house/house.division.action";
import NoData from "@/components/common/NoData";
import AddButton from "@/components/common/AddButton";
import House from "@/server/models/House";
import Link from "next/link";
import { PencilIcon } from "lucide-react";

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  noStore();

  await connectDB();
  const housemembers = await House.find({ house_color: slug });
  const h = housemembers[0];
  console.log("housessss", housemembers);

  function checkRole(role: string) {
    if (role === "member") {
      return "Member";
    } else if (role === "captain") {
      return "House Captain";
    } else {
      return "Vice Captain";
    }
  }

  if (h) {
    return (
      <div className=" space-y-8">
        <div className="flex items-center justify-between gap-8 pb-5">
          <H2 className=" text-center font-semibold capitalize">
            {slug} House team
          </H2>
          <div className=" flex items-center gap-1">
            <AddButton to="/admin/house-division/new" />
          </div>
        </div>

        <section>
          {/* <div className="flex items-center justify-center gap-8">
            <div className=" flex flex-col items-center justify-center">
              <img
                src={h.house_captain.photo.secure_url}
                alt="captain"
                width={300}
                height={300}
                className=" h-52 w-52 rounded-lg object-cover shadow-md"
              />
              <div className=" text-center">
                <h2 className=" text-xl font-semibold">
                  {h.house_captain.fullname}
                </h2>
                <p className=" text-muted-foreground">House Captain</p>
              </div>
            </div>
            <div className=" flex flex-col items-center justify-center self-start">
              <img
                src={h.house_vice_captain.photo.secure_url}
                alt="captain"
                width={300}
                height={300}
                className=" h-52 w-52 rounded-lg object-cover shadow-md"
              />
              <div className=" text-center">
                <h2 className=" text-xl font-semibold">
                  {h.house_vice_captain.fullname}
                </h2>
                <p className=" text-muted-foreground">House Vice-Captain</p>
              </div>
            </div>
          </div> */}

          {/* TABLE PART */}
          <Table className="mt-8 w-full  overflow-hidden whitespace-nowrap  rounded-xl ">
            <TableHeader className=" rounded-t-xl bg-primary/40">
              <TableRow>
                <TableHead>S.N</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {housemembers
                ? housemembers.map((d: any, idx: number) => (
                    <TableRow key={d._id.toString()}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{d.fullname}</TableCell>
                      <TableCell>{d.grade}</TableCell>
                      <TableCell>{d.section}</TableCell>
                      <TableCell>{checkRole(d.role)}</TableCell>
                      <TableCell>
                        <div className="inline-flex gap-2">
                          <Link
                            className="flex items-center justify-center text-blue-500 underline underline-offset-4"
                            href={`/admin/house-division/${d.house_color}/${d._id}/edit`}
                          >
                            <PencilIcon size={16} />
                          </Link>
                          <div className="flex items-center justify-center text-red-500 underline underline-offset-4"></div>

                          <CommonDeleteButtonV2
                            deleteAction={deleteHouseMember}
                            id={String(d._id)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </section>
      </div>
    );
  } else {
    return (
      <div className=" h-screen  ">
        <NoData />
        <div className="  flex  w-full justify-center">
          <AddButton to="/admin/house-division/new" />
        </div>
      </div>
    );
  }
};

export default page;
