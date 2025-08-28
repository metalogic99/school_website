"use server";

import { TNewsForm } from "@/schemas/news.schema";
import connectDB from "@/server/utils/connectDB";
import { revalidatePath } from "next/cache";
import { deleteCloudinaryImage } from "../gallery/upload.action";
import Blogs from "@/server/models/blogs";
import { TBlogsForm, blogsSchema } from "@/schemas/blogs.schema";

export const addBlogs = async (data: TBlogsForm, imgData: any) => {
  if (!imgData) throw new Error("Image is required!");
  const parsedData = blogsSchema.safeParse(data);
  if (parsedData.success && imgData) {
    const { secure_url, public_id } = imgData;
    const { title, desc, body } = parsedData.data;
    try {
      await connectDB();
      const newBlog = new Blogs({
        title,
        desc,
        body,
        image: { secure_url, public_id },
      });
      newBlog.save();
      revalidatePath("/admin/news");
      revalidatePath("/news");
      return {
        success: true,
        message: "New blogs has been added successfull !",
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Couldn't add blogs. Please contact to the relevant party.",
      };
    }
  } else {
    return { success: false, message: "Must be valid data!" };
  }
};

export const deleteBlog = async (id: string) => {
  if (!id) throw new Error("Must have an id.");
  try {
    const blogs = await Blogs.findById(id);

    if (!blogs) throw new Error("There is no such Blogs!");

    await connectDB();
    await deleteCloudinaryImage(blogs.image.public_id);
    await Blogs.findByIdAndDelete(id);

    revalidatePath("/admin/news");
    revalidatePath("/news");
  } catch (err) {
    console.log(err);
    throw new Error("Couldn't delete Blogs");
  }
};

export const editBlogs = async (id: string, data: TNewsForm) => {
  const parsedData = blogsSchema.safeParse(data);
  if (id && parsedData.success) {
    try {
      await connectDB();
      await Blogs.findByIdAndUpdate(id, parsedData.data);
      revalidatePath("/admin/news");
      revalidatePath("/news");
      return {
        success: true,
        message: "Successfully edited the Blog.",
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
