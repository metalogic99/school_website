"use server";
import {
  examRoutineSchema,
  TExamRoutineForm,
} from "@/schemas/exam.routine.schema";

import ExamRoutine from "@/server/models/ExamRoutine";
import connectDB from "@/server/utils/connectDB";
import { revalidatePath } from "next/cache";

export const addExamRoutine = async (data: TExamRoutineForm) => {
  const parsedData = examRoutineSchema.safeParse(data);
  if (parsedData.success) {
    const { exam, grade, table } = parsedData.data;

    try {
      const newExamRoutine = new ExamRoutine({
        exam,
        grade,
        table,
      });
      newExamRoutine.save();
      revalidatePath("/admin/documents");
      revalidatePath("/admin/documents/exam-routine");
      return {
        success: true,
        message: "Exam Routine has been added!",
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Sorry! Failed to add exam routine.",
      };
    }
  } else {
    return {
      success: false,
      message: "Invalid Data",
    };
  }
};

export const deleteExamRoutine = async (id: string) => {
  if (!id) throw new Error("Invalid Id Provided!");

  try {
    const student = await ExamRoutine.findById(id);
    if (!student) throw new Error("There is no such exam routine.");

    await connectDB();
    await ExamRoutine.findByIdAndDelete(id);
    revalidatePath("/admin/documents");
    revalidatePath("/admin/documents/exam-routine");
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

export const updateExamRoutine = async (id: string, data: TExamRoutineForm) => {
  const parsedData = examRoutineSchema.safeParse(data);
  if (parsedData.success) {
    try {
      await connectDB();
      const updatedExamRoutine = await ExamRoutine.findByIdAndUpdate(id, data);
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
