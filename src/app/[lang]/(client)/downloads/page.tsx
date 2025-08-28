import React from "react";
import { H4 } from "@/components/typography";
import Breadcrum from "@/components/common/Breadcrum";
import { Card } from "@/components/ui/card";
import connectDB from "@/server/utils/connectDB";
import YearlyBook from "@/server/models/YearlyBook";
import Syllabus from "@/server/models/syllabus";
import NoData from "@/components/common/NoData";
import { DefaultProps } from "@/types";
import DownloadButton from "@/components/common/DownloadButton";
import DownloadButtonV2 from "@/components/common/DownloadButtonV2";
import Underline from "@/components/common/Underline";
import Calender from "@/server/models/calender";

export default async function Page({ params }: DefaultProps) {
  const title = params.lang == "en" ? "Downloads" : "डाउनलोड";
  const yearlyBook = params.lang == "en" ? "Yearly Book" : "वार्षिक पुस्तक";
  const yearlyCalendar =
    params.lang == "en" ? "Yearly Academic Calendar" : "वार्षिक शैक्षिक पात्रो";
  const sllybus = params.lang == "en" ? "Syllabus" : "पाठ्यक्रम";

  await connectDB();
  const books = await YearlyBook.find();
  const syllabus = await Syllabus.find();
  const calender = await Calender.find();
  return (
    <>
      <Breadcrum heading={title} bg={"/yearly-magazine/bg.svg"} />

      {/* YEARLY CALENDAR */}
      <div className="container mx-auto mb-20 mt-10 px-4">
        <Underline title={yearlyCalendar} width="280px" />

        <div className="grid grid-cols-1 justify-items-center  gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {calender.length > 0 ? (
            calender.map((card, idx) => (
              <div
                key={idx}
                className="group flex w-[250px]  transform flex-col overflow-hidden rounded-xl  shadow-lg transition duration-300 hover:scale-105"
              >
                <div
                  style={{ background: "url(/calendar.png) center/cover" }}
                  className="  relative h-[200px] w-full"
                >
                  <div className=" absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    {/* <Download size={40} className=" text-white" /> */}
                    <DownloadButtonV2 url={card.pdf} title={`${card.title}`} />
                  </div>
                </div>
                <div className="  bottom-4  w-full bg-white py-2">
                  <p className=" text-center text-sm tracking-wider text-primary">
                    {card.title}
                  </p>
                  <h2 className=" text-center text-4xl font-medium text-primary">
                    {card.year}
                  </h2>
                </div>
                {/* <div className="flex flex-col p-4">
                  <H4 className="mb-2 text-center">{card.title}</H4>

                  <DownloadButton url={card.book} title={card.title} />
                </div> */}
              </div>
            ))
          ) : (
            <NoData message="There is no Calender Right Now! Please, Visit later." />
          )}
        </div>
      </div>

      {/* YEARLY bOOK */}
      <div className="container mx-auto mb-20 mt-10 px-4">
        <Underline title={yearlyBook} width="100px" />
        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {books.length > 0 ? (
            books.map((card, idx) => (
              <Card
                key={idx}
                className="flex w-[270px] transform flex-col overflow-hidden rounded-xl shadow-lg transition duration-300 hover:scale-105"
              >
                <img
                  src={card.image.secure_url}
                  alt={card.title}
                  className="h-[300px] w-full object-cover"
                />
                <div className="flex flex-col p-4">
                  <H4 className="mb-2 text-center">{card.title}</H4>

                  <DownloadButton url={card.book} title={card.title} />
                </div>
              </Card>
            ))
          ) : (
            <NoData message="There is no Books Right Now!" />
          )}
        </div>
      </div>

      <div className="mx-auto mb-20 mt-10 px-4   2xl:container">
        <div className=" flex flex-col">
          <Underline title={sllybus} width="100px" />

          {syllabus.length > 0 ? (
            syllabus?.map((item, index) => (
              <Card
                key={index}
                className=" z-10 mt-4 flex h-auto w-full items-center justify-between rounded-lg border-black bg-white p-2 shadow-md"
              >
                <div className="flex cursor-pointer items-center">
                  <div className=" flex flex-col">
                    <p className=" text-sm font-medium sm:text-lg ">
                      Class {item.grade}
                    </p>
                    <p className=" text-xs text-muted-foreground sm:text-sm ">
                      Syllabus of Class(Session {item.session})
                    </p>
                  </div>
                </div>
                <DownloadButton url={item.pdf} title={`class-${item.grade}`} />
              </Card>
            ))
          ) : (
            <NoData message="There is no Syllabus Right Now!" />
          )}
        </div>
      </div>
    </>
  );
}
