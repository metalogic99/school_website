import React from "react";
import Link from "next/link";
import MyImage from "../common/MyImage";
import Image from "next/image";
import { getThumbNailFromCloudinaryUrl } from "@/lib/thumbnail";

export const SingleNews = ({ news }: { news: any }) => {
  return (
    <Link href={`/blogs/${news._id}`} className="">
      {/* <div
        className="group h-52 rounded-xl transition-all duration-500"
        style={{
          backgroundImage: `url(${news.image.secure_url})`,
          backgroundSize: "cover",
        }}
      ></div> */}
      <div className=" h-52">
        <MyImage
          image={news.image.secure_url}
          height="100%"
          width="100%"
          classname={"h-52"}
        />
      </div>
      {/* <Image
        height={700}
        width={1000}
        alt="image"
        src={news.image.secure_url}
        blurDataURL={getThumbNailFromCloudinaryUrl(news.image.secure_url)}
        placeholder="blur"
        className=" h-52"
      /> */}

      <h5 className=" mt-4 line-clamp-2 px-1 font-semibold text-indigo-950">
        {news.title}
      </h5>
    </Link>
  );
};
