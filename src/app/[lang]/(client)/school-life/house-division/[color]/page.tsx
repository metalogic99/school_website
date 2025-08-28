import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import connectDB from "@/server/utils/connectDB";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import CustomUnderline from "@/components/common/CustomUnderline";
import House from "@/server/models/House";

const page = async ({ params }: { params: { color: string } }) => {
  const { color } = params;
  noStore();
  try {
    await connectDB();
    const housemembers = await House.find({
      house_color: color.toString(),
    });
    console.log("housemameersss", housemembers);
    const cap = housemembers.find((p) => p.role === "captain");
    const Vicecap = housemembers.find((p) => p.role === "vice_captain");
    console.log("captain bao", cap);

    const h = housemembers;
    return (
      <div className=" space-y-2">
        <div className="flex items-center justify-center ">
          <CustomUnderline
            border_color={
              color === "blue"
                ? "border-l-primary"
                : color === "red"
                  ? " border-l-red-500"
                  : color === "green"
                    ? " border-l-green-500"
                    : " border-l-yellow-500"
            }
            house_color={color}
            title="House Team"
            width="300px"
          />
        </div>
        <section>
          <div className="flex flex-col items-center justify-center gap-10 sm:flex-row">
            <div className=" flex flex-col  items-center justify-center gap-2">
              <img
                src={cap.photo.secure_url}
                alt="captain"
                width={300}
                height={300}
                className=" h-52 w-52 rounded-lg object-cover shadow-md"
              />
              <div className=" text-center">
                <h2 className=" text-xl font-semibold">{cap.fullname}</h2>
                <p className=" text-muted-foreground">House Captain</p>
              </div>
            </div>
            <div className=" flex flex-col items-center justify-center gap-2 sm:self-start">
              <img
                src={Vicecap.photo.secure_url}
                alt="captain"
                width={300}
                height={300}
                className=" h-52 w-52 rounded-lg object-cover shadow-md"
              />
              <div className=" text-center">
                <h2 className=" text-xl font-semibold">{Vicecap.fullname}</h2>
                <p className=" text-muted-foreground">House Vice-Captain</p>
              </div>
            </div>
          </div>

          {/* TABLE PART */}
          <Table className="mx-auto  mt-8 max-w-3xl  overflow-hidden whitespace-nowrap  rounded-xl ">
            <TableHeader className=" rounded-t-xl bg-primary/40 text-primary">
              <TableRow>
                <TableHead className=" text-black">S.N</TableHead>
                <TableHead className=" text-black">Student Name</TableHead>
                <TableHead className=" text-black">Class</TableHead>
                <TableHead className=" text-black">Section</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className=" bg-slate-100">
              {housemembers
                ? housemembers.map((d: any, idx: number) => (
                    <TableRow key={d._id.toString()}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{d.fullname}</TableCell>
                      <TableCell>{d.grade}</TableCell>
                      <TableCell>{d.section}</TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </section>
      </div>
    );
  } catch (err) {
    console.log(err);
    return notFound();
  }
};

export default page;
