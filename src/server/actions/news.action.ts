"use server";
import { TNewsForm, newsSchema } from "@/schemas/news.schema";
import News from "@/server/models/blogs";
import connectDB from "@/server/utils/connectDB";
import { revalidatePath } from "next/cache";
import { deleteCloudinaryImage } from "./gallery/upload.action";

export const addNews = async (data: TNewsForm, imgData: any) => {
  if (!imgData) throw new Error("Image is required!");
  const parsedData = newsSchema.safeParse(data);
  if (parsedData.success && imgData) {
    const { secure_url, public_id } = imgData;
    const { title, desc, body } = parsedData.data;
    try {
      await connectDB();
      const newNews = new News({
        title,
        desc,
        body,
        image: { secure_url, public_id },
      });
      await newNews.save();
      revalidatePath("/admin/news");
      revalidatePath("/news");
      return {
        success: true,
        message: "New news has been added successfull !",
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Couldn't add news. Please contact to the relevant party.",
      };
    }
  } else {
    return { success: false, message: "Must be valid data!" };
  }
};

export const deleteNews = async (id: string) => {
  if (!id) throw new Error("Must have an id.");
  try {
    const news = await News.findById(id);

    if (!news) throw new Error("There is no such news!");

    await connectDB();
    await deleteCloudinaryImage(news.image.public_id);
    await News.findByIdAndDelete(id);

    revalidatePath("/admin/news");
    revalidatePath("/news");
  } catch (err) {
    console.log(err);
    throw new Error("Couldn't delete News");
  }
};

export const editNews = async (id: string, data: TNewsForm) => {
  const parsedData = newsSchema.safeParse(data);
  if (id && parsedData.success) {
    try {
      await connectDB();
      await News.findByIdAndUpdate(id, parsedData.data);
      revalidatePath("/admin/news");
      revalidatePath("/news");
      return {
        success: true,
        message: "Successfully edited the news.",
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Couldn't edit the news due to server error!",
      };
    }
  }
  return {
    success: false,
    message: "Invalid id or data.",
  };
};
