"use server";
import Notice from "@/server/models/PopupNotice";
import { z } from "zod";
import { deleteCloudinaryImage } from "../gallery/upload.action";

import connectDB from "@/server/utils/connectDB";
import { revalidatePath } from "next/cache";

const popupSchema = z.object({
  title: z.string(),
  public_id: z.string(),
  secure_url: z.string(),
});

export const createPopupNotice = async (
  title: string,
  public_id: string,
  secure_url: string,
) => {
  const parsedData = popupSchema.safeParse({
    title,
    public_id,
    secure_url,
  });
  if (parsedData.success) {
    try {
      const newNotice = new Notice({
        title: title,
        image: {
          public_id,
          secure_url,
        },
      });
      await connectDB();
      await newNotice.save();
      revalidatePath("/admin/notice");
      revalidatePath("/");
      return {
        success: true,
        message: "Successfully created notice for dashboard!",
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message:
          "Couldn't upload the data. Please contact to respective party.",
      };
    }
  } else {
    return {
      success: false,
      message: "Plese send the valid data.",
    };
  }
};

export const deletePopupNotice = async (id: string) => {
  if (!id) throw new Error("Must have an id");
  try {
    await connectDB();
    const notice = await Notice.findById(id);

    await deleteCloudinaryImage(notice.image.public_id);
    await Notice.findByIdAndDelete(id);
    revalidatePath("/admin/notice");
    revalidatePath("/");
  } catch (err) {
    console.log(err);
    throw new Error(
      "Couldn't delete dashboard notice. Please contact to respective party.",
    );
  }
};
