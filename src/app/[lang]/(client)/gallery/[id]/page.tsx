import { Gallery } from "@/server/models/Gallery";
import { notFound } from "next/navigation";
import Overlay from "@/components/gallery/Overlay";
import connectDB from "@/server/utils/connectDB";

const page = async ({ params }: { params: { id: string } }) => {
  await connectDB();
  const { id } = params;
  const gallery = await Gallery.findById(id).populate("photos");

  if (gallery) {
    return <Overlay gallery={JSON.stringify(gallery)} />;
  }

  return notFound();
};

export default page;
