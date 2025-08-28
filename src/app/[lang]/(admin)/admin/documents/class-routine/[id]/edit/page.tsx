import React from "react";
import dynamic from "next/dynamic";
import ClassRoutine from "@/server/models/ClassRoutine";
import EditRoutine from "@/components/class-routine/EditRoutine";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const routine = await ClassRoutine.findById(id);

  return (
    <div>
      <EditRoutine routine={JSON.parse(JSON.stringify(routine))} id={id} />
    </div>
  );
};

export default page;
