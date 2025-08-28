"use server";
import connectDB from "@/server/utils/connectDB";
import { deleteCloudinaryImage } from "../gallery/upload.action";
import { revalidatePath } from "next/cache";
import {
  constructionSchema,
  TConstructionForm,
} from "@/schemas/construction.schema";
import Construction from "@/server/models/Construction";

export const addNewConstructionMember = async (
  data: TConstructionForm,
  imgData: any,
) => {
  if (!imgData) throw new Error("Image is required!");
  const parsedData = constructionSchema.safeParse(data);

  if (parsedData.success && imgData) {
    const { secure_url, public_id } = imgData;
    const {
      fullname,
      designation,
      project_title,
      address,
      appointment_date,
      phone,
      qualification,
      type,
      isHead,
    } = parsedData.data;
    try {
      const newTeamMember = new Construction({
        fullname,
        designation,
        address,
        project_title,
        appointment_date,
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

export const deleteConstructionMember = async (id: string) => {
  if (!id) throw new Error("Must have an id.");

  try {
    const member = await Construction.findById(id);
    if (!member) throw new Error("There is no such Member!");

    await connectDB();
    await deleteCloudinaryImage(member.image.public_id);
    await Construction.findByIdAndDelete(id);
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
  project_title: string;
  appointment_date: string;
  qualification: string;
  type: string;
  isHead: boolean | undefined;
  image?: {
    secure_url: string;
    public_id: string;
  };
}

export const editConstructionMember = async (
  id: string,
  data: TeamMemberData,
  imgData?: any,
) => {
  const parsedData = constructionSchema.safeParse(data);

  if (id && parsedData.success) {
    try {
      const {
        fullname,
        designation,
        phone,
        appointment_date,
        address,
        qualification,
        type,
        project_title,
        isHead,
      } = parsedData.data;
      const newUpdatedTeamMember: TeamMemberData = {
        fullname,
        designation,
        project_title,
        phone,
        appointment_date,
        address,
        qualification,
        type,
        isHead,
      };
      //check if there is image
      if (imgData) {
        newUpdatedTeamMember.image = {
          secure_url: imgData.secure_url,
          public_id: imgData.public_id,
        };
      }
      await connectDB();

      await Construction.findByIdAndUpdate(id, newUpdatedTeamMember);
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
