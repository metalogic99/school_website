import { H3 } from "@/components/typography";
import React from "react";
import connectDB from "@/server/utils/connectDB";
import Team from "@/server/models/Team";
import ListOfTeams from "@/components/team/ListOfTeams";

const tabs = [
  {
    title: "Board of Directors",
    type: "bod",
  },
  {
    title: "Directors",
    type: "director",
  },
  {
    title: "Academic Staff",
    type: "academic_staff",
  },
  {
    title: "Finance",
    type: "finance",
  },
];
import { unstable_noStore as noStore } from "next/cache";
import Teacher from "@/server/models/Teacher";
import ListOfTeachers from "@/components/team/ListOfTeachers";
import Construction from "@/server/models/Construction";
import ListOfConstruction from "@/components/team/ListOfConstruction";

export default async function page({ params }: { params: { type: string } }) {
  noStore();
  await connectDB();
  const { type } = params;
  let teamMembers;
  if (type === "academic_staff") {
    teamMembers = await Teacher.find({ type: type }).sort({ createdAt: -1 });
  } else if (type === "construction") {
    teamMembers = await Construction.find({ type: type }).sort({
      createdAt: -1,
    });
  } else {
    teamMembers = await Team.find({ type: type });
  }

  const selectedTab = tabs.find((t) => t.type === type);

  return (
    <div className="py-4 md:px-8">
      <div>
        <div className="  space-y-8  rounded-xl bg-white py-10 md:px-8  ">
          <H3 className=" text-center text-primary ">{selectedTab?.title}</H3>
          {type === "academic_staff" ? (
            <ListOfTeachers
              slug={type}
              teamMembers={JSON.parse(JSON.stringify(teamMembers))}
            />
          ) : type === "construction" ? (
            <ListOfConstruction
              slug={type}
              teamMembers={JSON.parse(JSON.stringify(teamMembers))}
            />
          ) : (
            <ListOfTeams
              slug={type}
              teamMembers={JSON.parse(JSON.stringify(teamMembers))}
            />
          )}
        </div>
      </div>
    </div>
  );
}
