import RoutineTable from "../exam-routine/RoutineTable";
import React from "react";
import ExamRoutine from "@/server/models/ExamRoutine";

export default async function page() {
  const routines = await ExamRoutine.find().sort({ createdAt: -1 });
  return (
    <div>
      <RoutineTable routines={routines} />
    </div>
  );
}
