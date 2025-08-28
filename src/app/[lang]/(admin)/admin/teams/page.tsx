import React from "react";
import Link from "next/link";
import { H2 } from "@/components/typography";
import connectDB from "@/server/utils/connectDB";
import Team from "@/server/models/Team";

const menus = [
  { title: "Board of Directors", to: "/admin/teams/board-of-directors" },
  { title: "Directors", to: "/admin/teams/directors" },
  { title: "Academic Staffs", to: "/admin/teams/academic-staff" },
  { title: "Finance", to: "/admin/teams/finance" },
  { title: "Non Academic Staff", to: "/admin/teams/non-academic-staff" },
  { title: "Examination", to: "/admin/teams/examination" },
  { title: "Management", to: "/admin/teams/management" },
  { title: "Sports", to: "/admin/teams/sports" },
  { title: "Cultural", to: "/admin/teams/cultural" },
  { title: "Construction", to: "/admin/teams/construction" },
  { title: "SMC", to: "/admin/teams/smc" },
  { title: "TPC", to: "/admin/teams/tpc" },
];

const page = async () => {
  await connectDB();
  const teams = await Team.find();
  return (
    <div>
      <div className="pb-5">
        <div className="space-y-8 pb-5">
          <H2 className=" font-semibold">All Teams</H2>
          <div className="  flex flex-col gap-4 font-medium">
            {menus.map((m, idx) => {
              return (
                <Link
                  key={idx}
                  href={m.to}
                  className="  rounded-xl  border p-4 shadow-md"
                >
                  {m.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
