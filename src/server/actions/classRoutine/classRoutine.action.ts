"use server";

import {
  classRoutineSchema,
  TClassRoutineForm,
} from "@/schemas/class.routine.schema";
import {
  RegistrationSchema,
  TRegistrationForm,
} from "@/schemas/registration.schema";
import ClassRoutine from "@/server/models/ClassRoutine";
import Registration from "@/server/models/registration";
import connectDB from "@/server/utils/connectDB";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addClassRoutine = async (data: TClassRoutineForm) => {
  const parsedData = classRoutineSchema.safeParse(data);
  if (parsedData.success) {
    const { section, grade, table } = parsedData.data;

    try {
      const newClassRoutine = new ClassRoutine({
        section,
        grade,
        table,
      });
      newClassRoutine.save();
      revalidatePath("/admin/documents");
      revalidatePath("/admin/documents/class-routine");
      return {
        success: true,
        message: "Class Routine has been added!",
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Sorry! Failed to add class routine.",
      };
    }
  } else {
    return {
      success: false,
      message: "Invalid Data",
    };
  }
};

export const deleteClassRoutine = async (id: string) => {
  if (!id) throw new Error("Invalid Id Provided!");

  try {
    const student = await ClassRoutine.findById(id);
    if (!student) throw new Error("There is no such class routine.");

    await connectDB();
    await ClassRoutine.findByIdAndDelete(id);
    revalidatePath("/admin/documents");
    revalidatePath("/admin/documents/class-routine");
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
};

export const updateClassRoutine = async (
  id: string,
  data: TClassRoutineForm,
) => {
  const parsedData = classRoutineSchema.safeParse(data);
  if (parsedData.success) {
    try {
      await connectDB();
      const updatedClassRoutine = await ClassRoutine.findByIdAndUpdate(
        id,
        data,
      );
      revalidatePath("/admin/documents");
      return {
        success: true,
        message: "Successfully updated the routine.",
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Internal Server Error",
      };
    }
  }
  return {
    success: false,
    message: "Invalid data. Please send us valid data",
  };
};
