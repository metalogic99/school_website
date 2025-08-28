import React from "react";
import Vacancy from "@/server/models/Vacancy";
import connectDB from "@/server/utils/connectDB";
import Application from "./Application";

import { notFound } from "next/navigation";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    await connectDB();
    const data = await Vacancy.findById(params.id);
    if (!data) return notFound();

    return (
      <div className="px-4 py-24">
        <Application jobId={id} />
      </div>
    );
  } catch (err) {
    console.log(err);
    return notFound();
  }
};

export default page;
