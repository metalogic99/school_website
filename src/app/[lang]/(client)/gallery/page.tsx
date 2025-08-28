import React from "react";
import { GalleryThumbnail } from "@/components/gallery/GalleryThumbnail";
import { notFound } from "next/navigation";
import { Gallery } from "@/server/models/Gallery";
import connectDB from "@/server/utils/connectDB";
import Underline from "@/components/common/Underline";
import { DefaultProps } from "@/types";

const page = async ({ params }: DefaultProps) => {
  await connectDB();
  const title = params.lang == "en" ? "Gallery" : "ग्यालरी";

  const gallery = await Gallery.find().populate("photos");

  if (gallery && gallery.length > 0) {
    return (
      <div>
        <section>
          <div className="mt-10">
            <Underline title={title} width="70px" />
          </div>
          <div className="grid place-items-center gap-y-8 py-16 md:grid-cols-2 lg:mx-10 lg:grid-cols-2 xl:grid-cols-3">
            {gallery.map((g, idx) => (
              <GalleryThumbnail key={idx} id={g._id} />
            ))}
          </div>
        </section>
      </div>
    );
  } else {
    return notFound();
  }
};

export default page;
