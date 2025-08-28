import React from "react";
import { Phone, Mail } from "lucide-react";
import Breadcrum from "@/components/common/Breadcrum";
import connectDB from "@/server/utils/connectDB";
import PrincipalMessages from "@/server/models/PrincipalMessage";
import Preview from "@/components/editor/Preview";
import NoData from "@/components/common/NoData";
import MyImage from "@/components/common/MyImage";
import { DefaultProps } from "@/types";

export default async function Page({ params }: DefaultProps) {
  const title =
    params.lang === "en"
      ? "Message from the Head Master"
      : "प्रधानाध्यापकको सन्देश";
  await connectDB();

  const message = await PrincipalMessages.find();
  const principalMsg = message[0];
  return (
    <>
      <Breadcrum heading={title} bg={"/newsArticles/bg.svg"} />
      {principalMsg ? (
        <div className="mx-auto mb-20 mt-10 flex w-full flex-col p-4 sm:max-w-[80%] md:flex-row">
          <div className="mr-8 flex flex-col items-center md:items-start">
            {/* <img
              src={principalMsg.image.secure_url}
              alt="person"
              className="mb-4 h-40 w-40 rounded-full object-cover"
            /> */}
            <MyImage
              image={principalMsg.image.secure_url}
              height="100%"
              width="100%"
              classname={" mb-4 h-40 w-40"}
            />
            <div className="mb-2 flex items-center gap-1 text-sm">
              <Phone size={16} className="" />
              <p>{principalMsg.phone}</p>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Mail size={16} className="" />
              <p>{principalMsg.email}</p>
            </div>
          </div>
          <div className="mt-10 flex-grow text-justify  text-sm  tracking-wide md:mt-0">
            <Preview html={principalMsg.message} />
          </div>
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
}
