import React from "react";
import { Phone, Mail } from "lucide-react";
import Breadcrum from "@/components/common/Breadcrum";
import connectDB from "@/server/utils/connectDB";
import Preview from "@/components/editor/Preview";
import NoData from "@/components/common/NoData";
import MyImage from "@/components/common/MyImage";
import { DefaultProps } from "@/types";
import SMCChairmanMessages from "@/server/models/smc-chairman";

export default async function Page({ params }: DefaultProps) {
  const title =
    params.lang === "en"
      ? "Message from the S.M.C Chariman"
      : "बि.ब्य.स. अध्यक्षको सन्देश";
  await connectDB();
  const message = await SMCChairmanMessages.find();
  const chairmanMsg = message[0];

  return (
    <section>
      <Breadcrum heading={title} bg={"/newsArticles/bg.svg"} />
      {chairmanMsg ? (
        <div className="mx-auto mb-20 mt-10 flex w-full flex-col p-4 sm:max-w-[80%] md:flex-row">
          <div className="mr-8 flex flex-col items-center md:items-start">
            <MyImage
              image={chairmanMsg.image.secure_url}
              height="100%"
              width="100%"
              classname={" mb-4 h-40 w-40"}
            />
            <div className="mb-2 flex items-center gap-1 text-sm">
              <Phone size={16} className="" />
              <p>{chairmanMsg.phone}</p>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Mail size={16} className="" />
              <p>{chairmanMsg.email}</p>
            </div>
          </div>
          <div className="mt-10 flex-grow text-justify  text-sm  tracking-wide md:mt-0">
            <Preview html={chairmanMsg.message} />
          </div>
        </div>
      ) : (
        <NoData />
      )}
    </section>
  );
}
