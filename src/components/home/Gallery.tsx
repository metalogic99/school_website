import React from "react";
import { H3 } from "../typography";
import { Button } from "../ui/button";
import { GalleryThumbnail } from "../gallery/GalleryThumbnail";
import { Gallery as GalleryModel } from "@/server/models/Gallery";
import connectDB from "@/server/utils/connectDB";
import { homeDictionary } from "@/dictionary/home";

export const Gallery = async ({ lang }: { lang: string }) => {
  await connectDB();
  const galleries = await GalleryModel.find().sort({ createdAt: -1 });

  if (galleries && galleries.length > 0) {
    return (
      <section
        style={{
          background:
            "url(/home/gallery/left.svg) no-repeat 98%, url(/home/gallery/right.svg) no-repeat left",
        }}
      >
        <div className="space-y-10 py-8 text-center">
          <H3 className="font-bold text-red-600">
            {homeDictionary[lang as keyof typeof homeDictionary].gallery}
          </H3>
          <div className="grid place-items-center gap-y-8 py-16 md:grid-cols-2 lg:mx-10 lg:grid-cols-2 xl:grid-cols-3">
            {galleries.map((gallery, idx) => (
              <GalleryThumbnail key={idx} id={gallery._id} />
            ))}
          </div>
          <div className="w-full">
            <Button className="mx-auto text-white">
              {homeDictionary[lang as keyof typeof homeDictionary].fullGallery}
            </Button>
          </div>
        </div>
      </section>
    );
  }
};
