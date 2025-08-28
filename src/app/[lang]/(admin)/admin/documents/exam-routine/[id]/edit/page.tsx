import React from "react";

import ExamRoutine from "@/server/models/ExamRoutine";
import EditExamRoutine from "@/components/exam-routine/EditExamRoutine";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const routine = await ExamRoutine.findById(id);

  return (
    <div>
      <EditExamRoutine routine={JSON.parse(JSON.stringify(routine))} id={id} />
    </div>
  );
};

export default page;
