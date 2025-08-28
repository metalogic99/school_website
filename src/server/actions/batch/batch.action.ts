"use server";

import { TTeamForm, teamSchema } from "@/schemas/team.schema";
import Team from "@/server/models/Team";
import connectDB from "@/server/utils/connectDB";
import { deleteCloudinaryImage } from "../gallery/upload.action";
import { revalidatePath } from "next/cache";
import { TBatchForm, batchSchema } from "@/schemas/batch.schema";
import Batch from "@/server/models/batch";

export const addBatchStudent = async (data: TBatchForm, imgData: any) => {
  if (!imgData) throw new Error("Image is required!");
  const parsedData = batchSchema.safeParse(data);

  if (parsedData.success && imgData) {
    const { secure_url, public_id } = imgData;
    const { fullname, gpa, image, passedYear } = parsedData.data;
    try {
      const newBatchStudent = new Batch({
        fullname,
        gpa,
        passedYear,
        image: { secure_url, public_id },
      });
      newBatchStudent.save();
      revalidatePath("/admin/batch");
      //   revalidatePath("/");
      return {
        success: true,
        message: "New Student  has been added",
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Failed to add new Student!",
      };
    }
  } else {
    return {
      success: false,
      message: "Must be valid data!",
    };
  }
};

export const getTeamMemberByType = async (type: string) => {
  try {
    const teamMembers = await Team.find({ type }).exec();

    if (teamMembers.length > 0) {
      return {
        success: true,
        data: teamMembers,
      };
    } else {
      return {
        success: false,
        message: `There is No Members of type ${type}`,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Failed to retrieve the data of that postion type",
    };
  }
};

export const deleteBatchStudent = async (id: string) => {
  if (!id) throw new Error("Must have an id.");

  try {
    const student = await Batch.findById(id);
    if (!student) throw new Error("There is no such Member!");

    await connectDB();
    await deleteCloudinaryImage(student.image.public_id);
    await Batch.findByIdAndDelete(id);
    revalidatePath("/admin/batch");
    revalidatePath("/passedYear");
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
    // throw new Error("Failed to delete member");
  }
};

interface BatchStudentEdit {
  fullname: string;
  gpa: number;
  passedYear: string;

  image?: {
    secure_url: string;
    public_id: string;
  };
}

export const editBatchStudent = async (
  id: string,
  data: BatchStudentEdit,
  imgData?: any,
) => {
  const parsedData = batchSchema.safeParse(data);

  if (id && parsedData.success) {
    try {
      const { fullname, gpa, passedYear } = parsedData.data;
      const newUpdatedBatchStudent: BatchStudentEdit = {
        fullname,
        gpa,
        passedYear,
      };
      //check if there is image
      if (imgData) {
        newUpdatedBatchStudent.image = {
          secure_url: imgData.secure_url,
          public_id: imgData.public_id,
        };
      }
      await connectDB();

      await Batch.findByIdAndUpdate(id, newUpdatedBatchStudent);
      revalidatePath("/passedYear");
      revalidatePath("/admin/batch");
      return {
        success: true,
        message: "Successfully Edited Batch Student",
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Failed to deleted the Batch Student!",
      };
    }
  } else {
    return {
      success: false,
      message: "Invalid Id or data",
    };
  }
};
