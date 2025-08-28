"use server";
import YearlyBook from "@/server/models/YearlyBook";
import connectDB from "@/server/utils/connectDB";
import { revalidatePath } from "next/cache";
import { deleteCloudinaryImage } from "../gallery/upload.action";
import { getAuthKeySecret } from "../document/constants";
import { ServerYearlyBookSchema } from "@/schemas/yearlyBook.schema";

export const addYearlyBook = async (data: any, imgData: any) => {
  if (!imgData) throw new Error("Image is required!");
  const parsedData = ServerYearlyBookSchema.safeParse(data);

  if (parsedData.success && imgData) {
    const { secure_url, public_id } = imgData;
    const { title, book, image } = parsedData.data;
    console.log(
      "yearlybook ko formdata hai",
      title,
      book,
      secure_url,
      public_id,
    );
    try {
      const newYearlyBook = new YearlyBook({
        book,
        title,
        image: { secure_url, public_id },
      });
      newYearlyBook.save();
      revalidatePath("/admin/documents/books");
      return {
        success: true,
        message: "New Yearly Book  has been added",
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Failed to add new Yearly Book!",
      };
    }
  } else {
    return {
      success: false,
      message: "Must be valid data!",
    };
  }
};

export const deleteYearlyBook = async (id: string) => {
  if (!id) throw new Error("Must have an id.");

  try {
    const book = await YearlyBook.findById(id);
    if (!book) throw new Error("There is no such Book!");
    await connectDB();
    await deleteCloudinaryImage(book.image.public_id);

    const res = await fetch(book.book, {
      method: "DELETE",
      headers: {
        "X-Custom-Auth-Key": getAuthKeySecret(),
      },
    });

    if (res.ok) {
      try {
        await YearlyBook.findByIdAndDelete(id);
        revalidatePath("/admin/documents");
        revalidatePath("/documents");
        return {
          success: true,
          message: "Deleted Successfully!",
        };
      } catch (err) {
        console.log(err);
        return {
          success: false,
          message: "Failed to Delete!",
        };
      }
    }
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Failed to 222!",
    };
  }
};
