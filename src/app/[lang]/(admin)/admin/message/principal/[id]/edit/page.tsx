import connectDB from "@/server/utils/connectDB";
import { H3 } from "@/components/typography";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import PrincipalMessageEditForm from "@/components/admin/principal/PrincipalMessageEditForm";
import PrincipalMessages from "@/server/models/PrincipalMessage";

const page = async ({ params }: { params: { id: string } }) => {
  noStore();
  await connectDB();
  const { id } = params;

  if (id) {
    const principal = await PrincipalMessages.findById(id);

    const principalObj = JSON.parse(
      JSON.stringify({
        fullname: principal.fullname,
        phone: principal.phone,
        email: principal.email,
        message: principal.message,
        image: Object(principal.image),
        id: String(principal._id),
      }),
    );
    return (
      <div>
        <H3 className=" my-4">Edit Details of Principal </H3>
        <PrincipalMessageEditForm member={principalObj} />
      </div>
    );
  }
  return notFound();
};

export default page;
