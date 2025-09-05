"use client";
import React, { useEffect, useState } from "react";
import { Phone, Mail } from "lucide-react";
import Breadcrum from "@/components/common/Breadcrum";
import connectDB from "@/server/utils/connectDB";
import Preview from "@/components/editor/Preview";
import NoData from "@/components/common/NoData";
import MyImage from "@/components/common/MyImage";
import { getMessageById } from "@/server/actions/messages/message.action";
import { toast } from "@/components/ui/use-toast";

interface Message {
  _id: string;
  designation: string;
  designatinNepali: string;
  fullname: string;
  email: string;
  phone: string;
  message: string;
  image: { secure_url: string; public_id: string };
}

export default function Page({
  params,
}: {
  params: { id: string; lang: string };
}) {
  const title =
    params.lang === "en"
      ? "Message from the S.M.C Chariman"
      : "बि.ब्य.स. अध्यक्षको सन्देश";

  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getMessage = async () => {
      const response = await getMessageById(params.id as string);
      if (!response || !response.success || !response.data) {
        toast({
          variant: "destructive",
          title: "error Fetching message",
        });
        setLoading(false);
      } else {
        setMessage(response.data);
        setLoading(false);
      }
    };
    getMessage();
  }, []);
  if (!loading && !message) {
    return <NoData />;
  }

  return (
    <section>
      <Breadcrum heading={title} bg={"/newsArticles/bg.svg"} />
      {loading && (
        <div className="mx-auto mb-20 mt-10 flex w-full flex-col items-center justify-center p-4 sm:max-w-[80%] md:flex-row">
          <div className="h-20 w-20 animate-spin rounded-full border-2 border-r-2 border-white border-r-black"></div>
        </div>
      )}
      {message ? (
        <div className="mx-auto mb-20 mt-10 flex w-full flex-col p-4 sm:max-w-[80%] md:flex-row">
          <div className="mr-8 flex flex-col items-center md:items-start">
            <MyImage
              image={message.image.secure_url}
              height="100%"
              width="100%"
              classname={" mb-4 h-40 w-40"}
            />
            <div className="mb-2 flex items-center gap-1 text-sm">
              <Phone size={16} className="" />
              <p>{message.phone}</p>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Mail size={16} className="" />
              <p>{message.email}</p>
            </div>
          </div>
          <div className="mt-10 flex-grow text-justify  text-sm  tracking-wide md:mt-0">
            <Preview html={message.message} />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </section>
  );
}
