import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { notFound } from "next/navigation";
import connectDB from "@/server/utils/connectDB";
import Vacancy from "@/server/models/Vacancy";

import dynamic from "next/dynamic";

const RichContentPreview = dynamic(
  () => import("@/components/editor/Preview"),
  { ssr: false },
);

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    await connectDB();
    const data = await Vacancy.findById(id);

    if (!data) return notFound();

    return (
      <div className="py-12">
        <div className="flex flex-col gap-8 bg-primary bg-cover bg-no-repeat py-32 text-center text-white">
          <h5 className="text-xl font-semibold text-yellow-300">Careers</h5>
          <h1 className="text-5xl font-bold">{data.title}</h1>
          <p>{data.category}</p>
        </div>

        <div className="px-4 2xl:container md:mx-auto md:w-[80%]">
          <div className="flex flex-col justify-between gap-y-3 py-16 md:flex-row">
            <h3 className="text-3xl font-bold">{data.title}</h3>
            <Link
              href={`/careers/${data._id}/apply`}
              className="flex w-fit rounded-full bg-orange-600 px-8 py-2 text-white"
            >
              Apply for this job <ArrowRight size={20} />
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <h5 className="py-8 text-xl font-bold text-primary">
                Job Description
              </h5>
              <RichContentPreview html={data.jobDescription} />
            </div>
            <div>
              <h5 className="py-8 text-xl font-bold text-primary">
                Responsibilities
              </h5>
              <RichContentPreview html={data.responsibilities} />
            </div>

            <div>
              <h5 className="py-8 text-xl font-bold text-primary">
                Qualifications
              </h5>
              <RichContentPreview html={data.qualification} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (err) {
    console.log(err);
    return notFound();
  }
};

export default page;
