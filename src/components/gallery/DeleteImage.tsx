"use client";
import { X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "../ui/use-toast";
import { deleteGallery } from "@/server/actions/gallery/dbcalls.action";
import connectDB from "@/server/utils/connectDB";

export default function DeleteImage({ url, id }: { url: string; id: string }) {
  const [pending, setPending] = useState(false);
  async function handleDelete() {
    setPending(true);

    toast({
      variant: "success",
      title: "Please wait while the deletion is in progress.",
    });

    const res = await deleteGallery(id.toString());
    toast({
      variant: res.success ? "success" : "destructive",
      title: res.success
        ? "Image has been Deleted !"
        : "Couldn't delete the image !",
      description: res.message,
    });
    setPending(false);
  }

  return (
    <div className="relative">
      <img
        src={url}
        alt="gallery"
        className="h-[200px] w-[300px] object-cover"
        height={300}
        width={200}
      />
      <button
        onClick={() => handleDelete()}
        className="absolute right-0 top-0 rounded-full bg-red-600 p-1 text-white"
      >
        <X size={16} />
      </button>
    </div>
  );
}
