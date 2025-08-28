"use server";
import connectDB from "@/server/utils/connectDB";
import { deleteCloudinaryImage } from "../gallery/upload.action";
import { revalidatePath } from "next/cache";

import { teacherSchema, TTeacherForm } from "@/schemas/teacher.schema";
import Teacher from "@/server/models/Teacher";

export const addNewTeacherMember = async (data: TTeacherForm, imgData: any) => {
  if (!imgData) throw new Error("Image is required!");
  const parsedData = teacherSchema.safeParse(data);

  if (parsedData.success && imgData) {
    const { secure_url, public_id } = imgData;
    const {
      fullname,
      designation,
      grade,
      status,
      rank,
      address,
      appointment_date,
      retirement_date,
      phone,
      qualification,
      type,
      isHead,
    } = parsedData.data;
    try {
      const newTeamMember = new Teacher({
        fullname,
        designation,
        address,
        grade,
        status,
        rank,
        appointment_date,
        retirement_date,
        phone,
        qualification,
        type,
        isHead,
        image: { secure_url, public_id },
      });
      newTeamMember.save();
      revalidatePath("/admin/teams");
      revalidatePath("/teams");
      return {
        success: true,
        message: "New Team member has been added",
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Failed to add new Team Member!",
      };
    }
  } else {
    return {
      success: false,
      message: "Must be valid data!",
    };
  }
};

export const deleteTeacherMember = async (id: string) => {
  if (!id) throw new Error("Must have an id.");

  try {
    const member = await Teacher.findById(id);
    if (!member) throw new Error("There is no such Member!");

    await connectDB();
    await deleteCloudinaryImage(member.image.public_id);
    await Teacher.findByIdAndDelete(id);
    revalidatePath("/admin/teams");
    revalidatePath("/teams");
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

interface TeamMemberData {
  fullname: string;
  designation: string;
  address: string;
  phone: string;
  rank: string;
  status: string;
  appointment_date: string;
  retirement_date?: string;
  qualification: string;
  type: string;
  grade: string;
  isHead: boolean | undefined;
  image?: {
    secure_url: string;
    public_id: string;
  };
}

export const editTeacherMember = async (
  id: string,
  data: TeamMemberData,
  imgData?: any,
) => {
  const parsedData = teacherSchema.safeParse(data);

  if (id && parsedData.success) {
    try {
      const {
        fullname,
        designation,
        phone,
        appointment_date,
        retirement_date,
        address,
        grade,
        qualification,
        type,
        status,
        rank,
        isHead,
      } = parsedData.data;
      const newUpdatedTeacherMember: TeamMemberData = {
        fullname,
        designation,
        status,
        rank,
        retirement_date,
        grade,
        phone,
        appointment_date,
        address,
        qualification,
        type,
        isHead,
      };
      //check if there is image
      if (imgData) {
        newUpdatedTeacherMember.image = {
          secure_url: imgData.secure_url,
          public_id: imgData.public_id,
        };
      }
      await connectDB();

      const upT = await Teacher.findByIdAndUpdate(id, newUpdatedTeacherMember, {
        new: true,
      });
      revalidatePath("/teams");
      revalidatePath("/admin/teams");
      return {
        success: true,
        message: "Successfully Edited Team Member",
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Failed to deleted the member!",
      };
    }
  } else {
    return {
      success: false,
      message: "Invalid Id or data",
    };
  }
};
