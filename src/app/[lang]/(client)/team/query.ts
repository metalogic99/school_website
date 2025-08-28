"use server";
import { getTeamMemberByType } from "@/server/actions/teams/teams.action";
import connectDB from "@/server/utils/connectDB";

export const getTeamMember = async (type: string) => {
  await connectDB();
  const members = await getTeamMemberByType(type);
  return members;
};
