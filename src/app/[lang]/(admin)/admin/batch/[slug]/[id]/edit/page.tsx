import connectDB from "@/server/utils/connectDB";
import { H3 } from "@/components/typography";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import EditBatchForm from "@/components/admin/batch/EditBatchForm";
import Batch from "@/server/models/batch";

const page = async ({ params }: { params: { id: string } }) => {
  noStore();
  await connectDB();
  const { id } = params;

  if (id) {
    const student = await Batch.findById(id);
    return (
      <div>
        <H3 className=" my-4">Edit Details of Student </H3>
        <EditBatchForm
          student={{
            fullname: student.fullname,
            gpa: student.gpa,
            passedYear: student.passedYear,
            image: student.image,
            id: String(student._id),
          }}
        />
      </div>
    );
  }
  return notFound();
};

export default page;
