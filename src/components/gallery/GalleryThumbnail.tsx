import React from "react";

import Link from "next/link";
import { GrGallery } from "react-icons/gr";
import { Gallery } from "@/server/models/Gallery";
import MyImage from "../common/MyImage";

export const GalleryThumbnail = async ({ id }: { id: string }) => {
  const gallery = await Gallery.findById(id).populate("photos");

  if (gallery) {
    return (
      <Link
        href={`/gallery/${id}`}
        // style={{
        //   backgroundImage: `url(${gallery.photos[0].url})`,
        // }}
        className=" relative flex h-[250px] w-[300px] flex-col items-end rounded-md  md:w-[350px] xl:w-[400px]"
      >
        <div>
          <MyImage
            image={gallery.photos[0].url}
            height="200px"
            width="100%"
            classname={"  h-[250px] w-[300px] md:w-[350px] xl:w-[400px] "}
          />
        </div>
        <div className="absolute right-4 top-4 flex gap-2 text-white">
          <GrGallery size={24} /> {gallery.photos.length}
        </div>
        <div className="absolute bottom-0 w-full rounded-b-xl bg-[rgba(0,0,0,0.5)] text-white">
          <div className="px-3 py-2">
            <h2>{gallery.title}</h2>
          </div>
        </div>
      </Link>
    );
  } else return <></>;
};
