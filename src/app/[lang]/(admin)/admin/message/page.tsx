import React from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { H2 } from "@/components/typography";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div>
      <div className="pb-5">
        <div className="space-y-8 pb-5">
          <div className=" flex items-center  justify-between">
            <H2 className=" font-semibold">All Messages</H2>
            <Button asChild>
              <Link
                href="/admin/message/new"
                className="flex items-center gap-2 text-white"
              >
                <PlusCircle size={16} /> Add Message
              </Link>
            </Button>
          </div>
          <div className="  flex flex-col gap-4 font-medium">
            <Link
              href="/admin/message/smc-chairman"
              className="  rounded-xl  border p-4 shadow-md"
            >
              Message of S.M.C Chairman
            </Link>
            <Link
              href="/admin/message/tpc-chairman"
              className="  rounded-xl  border p-4 shadow-md"
            >
              Message of T.P.C Chairman
            </Link>
            <Link
              href="/admin/message/principal"
              className="  rounded-xl  border p-4 shadow-md"
            >
              Message of Principal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
