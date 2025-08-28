import React from "react";
import { H2, H3 } from "../typography";
import { Calendar, Image as ImageIcon, MoveRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Gallery } from "@/server/models/Gallery";
import { Lang } from "@/types";
import PopupNotice from "@/server/models/PopupNotice";
import { dateFormatter } from "@/lib/dateFormatter";

const GallaryNotice = async ({ lang }: { lang: Lang }) => {
  const galleries = await Gallery.find()
    .populate("photos")
    .limit(4)
    .sort({ createdAt: -1 });
  const news = await PopupNotice.find().limit(3).sort({ createdAt: -1 });

  return (
    <section className="py-10">
      <div className=" flex flex-col  md:flex-col lg:flex-row">
        <div className="w-full lg:w-2/3">
          <div className="mb-8 text-left">
            <div className="flex items-center justify-between px-4">
              <H2 className=" text-xl font-bold sm:text-3xl">
                {lang === "en" ? "Our Gallery" : "हाम्रो ग्यालेरी"}
              </H2>
              <Link href="/gallery" className="text-primary hover:underline">
                See All
              </Link>
            </div>
            <div className="py-4 ">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
                {galleries.map((g, idx) => (
                  <Link
                    key={idx}
                    href={`/gallery/${g._id}`}
                    className="w-full space-y-2 rounded-xl p-2 transition-shadow duration-300 hover:shadow-lg"
                  >
                    <div className="relative">
                      <img
                        src={g.photos[0]?.url}
                        alt="gallery"
                        className="h-[250px] w-full rounded-lg object-cover shadow-xl "
                      />
                      <div className=" absolute bottom-0 left-0 right-0 flex w-full items-center justify-between rounded-b-lg bg-black bg-opacity-55 p-2">
                        <p className="   text-xs text-white sm:text-base">
                          {g.title}
                        </p>
                        <div className="  flex items-center gap-2   text-white">
                          {g.photos?.length} <ImageIcon size={20} />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[70px] w-full lg:ml-20 lg:w-[400px] ">
          <Card className="rounded-xl bg-white shadow-xl">
            <div className=" rounded-t-xl   bg-primary p-4">
              <H3 className="text-center  font-semibold text-white ">
                {lang === "en" ? "Notice Board" : "सूचना पाटी"}
              </H3>
            </div>
            <div>
              <CardContent className="p-4">
                {/* {news.map((n, index) => ( */}
                {news.map((d, idx) => (
                  <Link
                    target="_blank"
                    href={d.image.secure_url}
                    key={idx}
                    className="flex items-center justify-between rounded-lg p-2 transition-shadow duration-300 "
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar size={20} /> {dateFormatter(d.createdAt)}
                      </div>
                      <p className="text-sm text-gray-700">{d.title}</p>
                      <div className=" border-t-2 border-gray-400"></div>
                    </div>
                  </Link>
                ))}
              </CardContent>
              <Link
                href={"/notices"}
                className="flex cursor-pointer justify-end px-4 py-4 text-[#A20000] hover:underline"
              >
                View More Notices
                <MoveRight size={20} className="ml-2 mt-[3px]" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GallaryNotice;
