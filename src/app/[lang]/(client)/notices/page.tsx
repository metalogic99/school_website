import { H2, H3 } from "@/components/typography";
import React from "react";
import { Calendar } from "lucide-react";
import { dateFormatter } from "@/lib/dateFormatter";
import Link from "next/link";
import PopupNotice from "@/server/models/PopupNotice";
import { Lang } from "@/types";
import BackButton from "@/components/common/BackButton";
import DashboardModel from "@/server/models/DashboardNotice";
import VoiceMessage from "@/server/models/VoiceNotice";
import Underline from "@/components/common/Underline";
import connectDB from "@/server/utils/connectDB";

const Page = async ({ params }: { params: { lang: Lang } }) => {
  await connectDB();
  const news = await PopupNotice.find().limit(10).sort({ createdAt: -1 });

  const voiceNotices = await VoiceMessage.find().sort({ createdAt: -1 });

  const dashboardNews = await DashboardModel.find().sort({ createdAt: -1 });
  return (
    <>
      <div className="mx-auto mb-20 mt-10 px-3  py-4 sm:container">
        <BackButton />
        <div className=" flex flex-col">
          <Underline
            title={params.lang === "np" ? " अडियो सूचना" : "Audio Notices"}
            width="170px"
          />
          {voiceNotices.map((d, idx) => (
            <div
              key={idx}
              className=" mt-4 flex h-auto w-full items-center justify-between rounded-lg border-black bg-white  shadow-md"
            >
              <div className="flex w-full flex-col items-start justify-between gap-2 rounded-lg p-4 transition-shadow duration-300 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center  gap-1 text-sm text-muted-foreground">
                    <Calendar size={16} /> {dateFormatter(d.createdAt)}
                  </div>
                  <p className="text-base ">{d.title}</p>
                </div>
                {/* AUDIO TAG */}
                <div className="flex items-center gap-2">
                  <audio controls className=" w-[280px] rounded-xl  ">
                    <source src={d.voice} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="  mt-10 flex flex-col ">
          <div className=" text-center">
            <Underline
              title={params.lang === "np" ? "सूचना" : "Notices "}
              width="100px"
            />
          </div>
          {/* {news.map((n, index) => ( */}
          {news.map((d, idx) => (
            <div
              key={idx}
              className=" mt-4 flex h-auto w-full items-center justify-between rounded-lg border-black bg-white  shadow-md"
            >
              <Link
                target="_blank"
                href={d.image.secure_url}
                className="flex w-full items-center justify-between rounded-lg p-4 transition-shadow duration-300 "
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center  gap-1 text-sm text-muted-foreground">
                    <Calendar size={16} /> {dateFormatter(d.createdAt)}
                  </div>
                  <p className="text-base ">{d.title}</p>
                </div>
              </Link>
            </div>
          ))}
          {dashboardNews.map((d, idx) => (
            <div
              key={idx}
              className=" mt-4 flex h-auto w-full items-center justify-between rounded-lg border-black bg-white  shadow-md"
            >
              <Link
                target="_blank"
                href={d.image.secure_url}
                className="flex w-full items-center justify-between rounded-lg p-4 transition-shadow duration-300 "
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center  gap-1 text-sm text-muted-foreground">
                    <Calendar size={16} /> {dateFormatter(d.createdAt)}
                  </div>
                  <p className="text-base ">{d.title}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
