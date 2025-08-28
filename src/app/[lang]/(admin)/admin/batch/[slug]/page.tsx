import React from "react";
import BatchEditBtn from "@/components/admin/batch/BatchEditBtn";
import CommonDeleteButton from "@/components/common/CommonDeleteButton";
import { H3 } from "@/components/typography";
import { deleteBatchStudent } from "@/server/actions/batch/batch.action";
import Batch from "@/server/models/batch";
import connectDB from "@/server/utils/connectDB";
import "react-lazy-load-image-component/src/effects/blur.css";
import MyImage from "@/components/common/MyImage";

export default async function page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  await connectDB();
  const yearlyStudents = await Batch.find({ passedYear: slug });

  return (
    <div className=" space-y-8">
      <H3 className=" text-center text-primary ">Batch {slug}</H3>
      <div className=" flex flex-wrap  gap-8 ">
        {yearlyStudents?.map((student: any, idx: number) => {
          return (
            <div key={idx} className=" relative flex flex-col">
              <div className=" group  relative flex-1 flex-shrink-0">
                <MyImage
                  classname="h-40 w-40"
                  height="160px"
                  width="160px"
                  image={student.image.secure_url}
                />

                <div className="absolute inset-0 rounded-xl bg-transparent transition-all duration-300 group-hover:block group-hover:bg-black group-hover:bg-opacity-35">
                  <div className=" absolute right-2 top-2 flex items-center gap-2">
                    <BatchEditBtn id={student._id.toString()} />
                    <CommonDeleteButton
                      deleteAction={deleteBatchStudent}
                      id={student._id.toString()}
                    />
                  </div>
                </div>
              </div>
              <div className=" text-center text-sm font-medium">
                <p className=" text-wrap text-base font-medium text-black">
                  {student.fullname}
                </p>
                <p className="  text-sm font-semibold text-muted-foreground">
                  GPA: {student.gpa}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
