import connectDB from "@/server/utils/connectDB";
import { H3 } from "@/components/typography";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import Team from "@/server/models/Team";
import TeamMemberEditForm from "@/components/admin/teams/TeamMemberEditForm";

const page = async ({ params }: { params: { id: string } }) => {
  noStore();
  await connectDB();
  const { id } = params;

  if (id) {
    const member = await Team.findById(id);
    return (
      <div>
        <H3 className=" my-4">
          Edit Details of{" "}
          <span className=" text-primary">{member.fullname}</span>
        </H3>
        <TeamMemberEditForm
          member={{
            fullname: member.fullname,
            position: member.position,
            isHead: member.isHead,
            type: member.type,
            image: member.image,
            id: String(member._id),
          }}
        />
      </div>
    );
  }
  return notFound();
};

export default page;
