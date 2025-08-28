import React from "react";
import { Save, X } from "lucide-react";
import { H2 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import connectDB from "@/server/utils/connectDB";
import { Gallery } from "@/server/models/Gallery";
import DeleteImage from "@/components/gallery/DeleteImage";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  await connectDB();
  const galleries = await Gallery.findById(id).populate("photos");
  return (
    <div>
      <H2 className="py-5">{galleries?.title}</H2>
      <div className="flex flex-wrap gap-2">
        {galleries.photos &&
          galleries.photos?.map((f: any, idx: number) => (
            <div key={idx}>
              <DeleteImage url={f.url} id={f._id.toString()} />
            </div>
          ))}
      </div>
      <div>
        <Button>
          <Save /> Update
        </Button>
      </div>
    </div>
  );
};

export default page;
