import connectDB from "@/server/utils/connectDB";
import { H3 } from "@/components/typography";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import SMCChairmanMessages from "@/server/models/smc-chairman";
import { editSmcChairmanMessage } from "@/server/actions/messages/smc.chairman.messages.action";
import CommonMessageEditForm from "@/components/admin/common/CommonMessageEditForm";

const page = async ({ params }: { params: { id: string } }) => {
  noStore();
  await connectDB();
  const { id } = params;

  if (id) {
    const chairman = await SMCChairmanMessages.findById(id);
    const chairmanObj = JSON.parse(
      JSON.stringify({
        fullname: chairman.fullname,
        phone: chairman.phone,
        email: chairman.email,
        message: chairman.message,
        image: chairman.image,
        id: String(chairman._id),
      }),
    );
    return (
      <div>
        <H3 className=" my-4">Edit Details of Chairman </H3>
        <CommonMessageEditForm
          member={chairmanObj}
          editAction={editSmcChairmanMessage}
        />
      </div>
    );
  }
  return notFound();
};

export default page;
