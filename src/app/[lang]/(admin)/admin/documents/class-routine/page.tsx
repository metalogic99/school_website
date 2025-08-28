import "@/components/common/richtexteditor.css";
import React from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { H2 } from "@/components/typography";
import connectDB from "@/server/utils/connectDB";
import { Button } from "@/components/ui/button";
import ClassRoutine from "@/server/models/ClassRoutine";
import RoutineTable from "@/components/class-routine/RoutineTable";
import { unstable_noStore as noStore } from "next/cache";

const page = async () => {
  noStore();
  await connectDB();
  const routines = await ClassRoutine.find().sort({ createdAt: -1 });
  return (
    <div className="">
      <div className="flex items-center justify-between pb-5">
        <H2 className=" font-semibold">All Class Routines</H2>

        <Button asChild>
          <Link
            href="/admin/documents/new/class-routine"
            className="flex items-center gap-2 text-white"
          >
            <PlusCircle size={16} /> Add new Class Routine
          </Link>
        </Button>
      </div>
      <RoutineTable routines={JSON.parse(JSON.stringify(routines))} />
    </div>
  );
};

export default page;
