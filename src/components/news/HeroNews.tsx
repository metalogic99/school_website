import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { notFound } from "next/navigation";
import MyImage from "../common/MyImage";
import { getThumbNailFromCloudinaryUrl } from "@/lib/thumbnail";

export const NewsHero = ({ news }: { news: any }) => {
  if (news) {
    return (
      <div className="grid px-2 pb-20 pt-10 2xl:container md:px-10 lg:mx-auto lg:grid-cols-2">
        <div className="flex h-full">
          <div className="h-[85%] flex-1 flex-shrink-0">
            <Image
              height={700}
              width={1000}
              alt="image"
              src={news.image}
              blurDataURL={getThumbNailFromCloudinaryUrl(news.image)}
              placeholder="blur"
            />
          </div>
        </div>
        <div className="flex h-full py-4 md:px-8 lg:py-0">
          <div className="flex flex-col gap-4">
            <h5 className="text-secondary-300 text-xl font-semibold">
              Latest Blog
            </h5>
            <h2 className="  text-3xl   text-primary md:text-6xl">
              {news.title}
            </h2>

            <Link
              href={`/blogs/${news._id} `}
              className="flex gap-2 py-4 text-blue-600"
            >
              Read More <MoveRight />
            </Link>
          </div>
        </div>
      </div>
    );
  } else return notFound();
};
