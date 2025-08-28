"use server";
import Doc from "@/server/models/Document";
import connectDB from "@/server/utils/connectDB";
import { getAuthKeySecret } from "./constants";
import { revalidatePath } from "next/cache";

export const deleteDocument = async (id: string) => {
  const doc = await Doc.findById(id);
  if (!doc) throw new Error("Document couldn't found !");
  try {
    const res = await fetch(doc.url, {
      method: "DELETE",
      headers: {
        "X-Custom-Auth-Key": getAuthKeySecret(),
      },
    });

    if (res.ok) {
      try {
        await connectDB();
        await Doc.findByIdAndDelete(id);
        revalidatePath("/admin/documents");
        revalidatePath("/documents");
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
