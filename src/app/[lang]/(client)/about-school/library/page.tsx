import React from "react";
import { H1 } from "@/components/typography";
import connectDB from "@/server/utils/connectDB";

const page = async () => {
  await connectDB();

  const library = {
    img: "/home/gallery/library.jpg",
  };
  // const router = useRouter();

  return (
    <div>
      <section>
        <H1 className="px-4 pt-6 text-center "> Library</H1>
        <div className="grid place-items-center gap-y-8 py-16 md:grid-cols-2 lg:mx-10 lg:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((g, idx) => (
            // <GalleryThumbnail key={idx} id={g} />
            <img
              src="/human.jpg"
              key={idx}
              className="h-80 w-80 rounded-lg object-cover"
              alt="Library"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default page;
