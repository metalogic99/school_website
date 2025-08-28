"use server";
import connectDB from "@/server/utils/connectDB";
import { revalidatePath } from "next/cache";
import { getAuthKeySecret } from "../document/constants";
import {
  ServerCalenderSchema,
  TServerCalenderSchemaForm,
} from "@/schemas/calender.schema";
import Calender from "@/server/models/calender";

export const addCalender = async (data: TServerCalenderSchemaForm) => {
  const parsedData = ServerCalenderSchema.safeParse(data);

  if (parsedData.success) {
    const { title, year, pdf } = parsedData.data;
    try {
      const newCalender = new Calender({
        title,
        year,
        pdf,
      });
      newCalender.save();
      revalidatePath("/admin/documents/calender");
      revalidatePath("/admin/documents");
      return {
        success: true,
        message: "New Academic Calendar  has been added",
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Failed to add new Academic Calendar !",
      };
    }
  } else {
    return {
      success: false,
      message: "Must be valid data!",
    };
  }
};

export const deleteCalender = async (id: string) => {
  if (!id) throw new Error("Must have an id.");

  try {
    const calender = await Calender.findById(id);
    if (!calender) throw new Error("There is no such calender!");
    await connectDB();

    const res = await fetch(calender.pdf, {
      method: "DELETE",
      headers: {
        "X-Custom-Auth-Key": getAuthKeySecret(),
      },
    });

    if (res.ok) {
      try {
        await Calender.findByIdAndDelete(id);
        revalidatePath("/admin/documents");
        revalidatePath("/admin/documents/calender");
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
      message: "Something Went Wrong! During deleting of Calendar",
    };
  }
};
