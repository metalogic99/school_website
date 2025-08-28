import React from "react";
import { H1 } from "../typography";
import { Button } from "../ui/button";
import Blogs from "@/server/models/blogs";
import { dateFormatter } from "@/lib/dateFormatter";
import { Lang } from "@/types";

export default async function NewsArticle({ lang }: { lang: Lang }) {
  const title = lang === "en" ? "News and Article" : "समाचार र लेख";
  const news = await Blogs.find().limit(4);
  return (
    <section>
      <div className="py-10">
        <div className="mb-16 text-center">
          <H1>{title}</H1>
        </div>
        <div className="  mb-20 flex flex-wrap items-center justify-center gap-6  ">
          {news.map((d, idx) => (
            <div
              key={idx}
              className=" flex h-[360px] w-full flex-col  rounded-lg border-none  bg-white p-4 shadow-lg transition-transform duration-300 hover:scale-105 sm:w-[280px]"
            >
              <div>
                <img
                  src={d.image.secure_url}
                  alt="accomodation"
                  className="h-[150px] w-full rounded object-cover"
                />
              </div>
              <div className="relative mt-4 flex flex-1 flex-col justify-between">
                <p className="  absolute -top-3 right-0 text-xs font-normal text-muted-foreground">
                  {dateFormatter(d.createdAt)}
                </p>
                <div className="flex items-center justify-between text-wrap pt-2 text-sm  font-medium">
                  <h2>{d.title}</h2>
                </div>
                <div className=" relative">
                  <div
                    suppressHydrationWarning
                    className="mt-2 line-clamp-3 py-2 text-xs text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: d.body }}
                  ></div>
                  <div className=" absolute inset-0 bg-gradient-to-t from-white from-10% via-transparent via-20% to-transparent"></div>
                </div>
                <a href={`/blogs/${d._id.toString()}`}>
                  <div className="flex justify-end">
                    <Button className="mt-4 flex items-center text-white">
                      Read More
                    </Button>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
