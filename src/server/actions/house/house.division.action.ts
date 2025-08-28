"use server";
import {
  serverhouseMemberSchema,
  TServerhouseMemberSchemaForm,
} from "@/schemas/house.schema";
import connectDB from "@/server/utils/connectDB";
import { revalidatePath } from "next/cache";
import { deleteCloudinaryImage } from "../gallery/upload.action";
import House from "@/server/models/House";

//ADD HOUSE NEW SCHEMA
export const addHouseMember = async (
  data: TServerhouseMemberSchemaForm,
  imgData: any,
) => {
  console.log("server ko data", data);
  if (data.role === "captain" && !imgData)
    return { error: "Captain Image is required." };
  if (data.role === "vice_captain" && !imgData)
    return { error: "Vice Captain Image is required." };
  await connectDB();

  const parsedData = serverhouseMemberSchema.safeParse(data);
  if (parsedData.success) {
    if (data.role === "member") {
      const { house_color, house_name, fullname, grade, section } =
        parsedData.data;
      try {
        const newHouseMember = new House({
          house_color,
          house_name,
          fullname: fullname,
          grade: grade,
          section: section,
          // photo: {
          //   secure_url,
          //   public_id,
          // },
        });
        await newHouseMember.save();
        revalidatePath("/admin/house-division");
        //   revalidatePath("/teams");
        return {
          success: true,
          message: "New House member has been added",
        };
      } catch (err) {
        console.log(err);
        return {
          success: false,
          message: "Failed to add new House Member!",
        };
      }
    } else {
      const { secure_url, public_id } = imgData;
      const { house_color, house_name, fullname, grade, section, role } =
        parsedData.data;
      try {
        console.log("servre kko data", data);
        const newHouseMember = new House({
          house_color,
          house_name,
          fullname: fullname,
          grade: grade,
          section: section,
          role,
          photo: {
            secure_url,
            public_id,
          },
        });
        await newHouseMember.save();
        revalidatePath("/admin/house-division");
        //   revalidatePath("/teams");
        return {
          success: true,
          message: "New House member has been added",
        };
      } catch (err) {
        console.log(err);
        return {
          success: false,
          message: "Failed to add new House Member!",
        };
      }
    }
  } else {
    return {
      success: false,
      error: "Must be valid data!",
    };
  }
};

export const deleteHouseMember = async (id: string) => {
  if (!id) return { success: false, message: "Invalid Id provided.!" };
  try {
    const member = await House.findById(id);
    if (!member) return { success: false, message: "There is no such member!" };
    await connectDB();

    if (member.photo.public_id) {
      await deleteCloudinaryImage(member.photo.public_id);
    }
    await House.findByIdAndDelete(id);
    revalidatePath("/admin/house-division");
    revalidatePath(`/admin/house-division/${member.house_color}`);
    return { success: true, message: "Deleted Successfully!" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to Delete!" };
  }
};

export const editHouseMember = async (id: string, data: any, imgData?: any) => {
  const parsedData = serverhouseMemberSchema.safeParse(data);

  if (id && parsedData.success) {
    try {
      const { fullname, section, grade, house_color, house_name, role } =
        parsedData.data;
      const newUpdatedTeacherMember: TServerhouseMemberSchemaForm = {
        fullname,
        section,
        grade,
        house_color,
        house_name,
        role,
      };
      //check if there is image
      if (imgData) {
        newUpdatedTeacherMember.photo = {
          secure_url: imgData.secure_url,
          public_id: imgData.public_id,
        };
      }
      await connectDB();

      const upT = await House.findByIdAndUpdate(id, newUpdatedTeacherMember, {
        new: true,
      });
      revalidatePath("/admin/house-division");
      // revalidatePath("/admin/teams");
      return {
        success: true,
        message: "Successfully Edited House Member",
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
