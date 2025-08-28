"use server";
import connectDB from "@/server/utils/connectDB";
import { revalidatePath } from "next/cache";
import { getAuthKeySecret } from "../document/constants";
import {
  ServerSyllabusSchema,
  TServerSyllabusSchemaForm,
} from "@/schemas/syllabus";
import Syllabus from "@/server/models/syllabus";

export const addSyllabus = async (data: TServerSyllabusSchemaForm) => {
  const parsedData = ServerSyllabusSchema.safeParse(data);

  if (parsedData.success) {
    const { grade, session, pdf } = parsedData.data;
    try {
      const newYearlyBook = new Syllabus({
        grade,
        session,
        pdf,
      });
      newYearlyBook.save();
      revalidatePath("/admin/documents/courses");
      revalidatePath("/admin/documents");
      return {
        success: true,
        message: "New Syllabus  has been added",
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Failed to add new Syllabus!",
      };
    }
  } else {
    return {
      success: false,
      message: "Must be valid data!",
    };
  }
};

export const deleteSyllabus = async (id: string) => {
  if (!id) throw new Error("Must have an id.");

  try {
    const syllabus = await Syllabus.findById(id);
    if (!syllabus) throw new Error("There is no such syllabus!");
    await connectDB();

    const res = await fetch(syllabus.pdf, {
      method: "DELETE",
      headers: {
        "X-Custom-Auth-Key": getAuthKeySecret(),
      },
    });

    if (res.ok) {
      try {
        await Syllabus.findByIdAndDelete(id);
        revalidatePath("/admin/documents");
        revalidatePath("/admin/documents/courses");
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
      message: "Something Went Wrong! During deleting of Syllabus",
    };
  }
};
