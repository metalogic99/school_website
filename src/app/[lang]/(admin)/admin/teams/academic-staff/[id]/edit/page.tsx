import connectDB from "@/server/utils/connectDB";
import { H3 } from "@/components/typography";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import Teacher from "@/server/models/Teacher";
import EditTeacherMemberForm from "@/components/admin/teams/EditTeacherMemberForm";

const page = async ({ params }: { params: { id: string } }) => {
  noStore();
  await connectDB();
  const { id } = params;

  if (id) {
    const member = await Teacher.findById(id);

    const members = {
      fullname: member.fullname,
      designation: member.designation,
      address: member.address,
      qualification: member.qualification,
      phone: member.phone,
      appointment_date: member.appointment_date,
      retirement_date: member.retirement_date,
      rank: member.rank,
      grade: member.grade,
      status: member.status,
      isHead: member.isHead,
      type: member.type,
      image: member.image,
      id: String(member._id),
    };
    const memObj = JSON.parse(JSON.stringify(members));
    return (
      <div>
        <H3 className=" my-4">
          Edit Details of{" "}
          <span className=" text-primary">{member.fullname}</span>
        </H3>
        <EditTeacherMemberForm member={memObj} />
      </div>
    );
  }
  return notFound();
};

export default page;
