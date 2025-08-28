import RoutineTable from "../class-routine/RoutineTable";
import React from "react";
import ClassRoutine from "@/server/models/ClassRoutine";

export default async function page() {
  const routine = await ClassRoutine.find().sort({ createdAt: -1 });
  return (
    <div>
      <RoutineTable routines={routine} />
    </div>
  );
}
