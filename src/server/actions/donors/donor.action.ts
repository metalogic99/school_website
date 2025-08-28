"use server";
import {
  ServerSideSingleDonor,
  TServerSideSingleDonorForm,
} from "@/schemas/donor.schema";
import connectDB from "@/server/utils/connectDB";
import { revalidatePath } from "next/cache";
import { deleteCloudinaryImage } from "../gallery/upload.action";
import Donors from "@/server/models/Donors";

// NEW SCHEMA ADD DONOR

export const addDonor = async (
  data: TServerSideSingleDonorForm,
  imgData: any,
) => {
  if (!imgData) return { success: false, message: "Image is required." };

  const parsedData = ServerSideSingleDonor.safeParse(data);

  if (parsedData.success && imgData) {
    const { secure_url, public_id } = imgData;
    const {
      fullname,
      address,
      phone,
      donation_type,
      donation_amount,
      donation_title,
    } = parsedData.data;

    //CHECK IF WHEN AKSHYAKOSH CHOOSEN DOMATION AMOUNT IS PROVIDED
    if (donation_type === "akshyakosh" && !donation_amount) {
      return {
        success: false,
        message: "Donation Amount is required.",
      };
    }

    //CHECK IF WHEN OTHERS CHOOSEN , DONTAINO TITTE IS PROVIDED OR NOT
    if (donation_type === "others" && !donation_title) {
      return {
        success: false,
        message: "Donation Title is required.",
      };
    }

    try {
      const newDonor = new Donors({
        fullname,
        address,
        phone,
        donation_amount,
        donation_title,
        donation_type,
        photo: {
          secure_url,
          public_id,
        },
      });
      newDonor.save();

      revalidatePath("/admin/donors");
      revalidatePath(`/admin/donors/${donation_type}`);

      return {
        success: true,
        message: "New Donor has been added!",
      };
    } catch (err) {
      console.log(err);
      return {
        sucess: false,
        message: "Failed to add new Donor!",
      };
    }
  } else {
    return {
      success: false,
      message: "Invalid Data.",
    };
  }
};

// DELETE THE DONOR
export const deleteDonor = async (id: string) => {
  if (!id) return { success: false, message: "Invalid Id provided.!" };

  try {
    await connectDB();
    const member = await Donors.findById(id);
    if (!member) return { success: false, message: "There is no such Donor!" };

    console.log("member xa donrodddd", member);
    await deleteCloudinaryImage(member.photo.public_id);

    const deleted = await Donors.findByIdAndDelete(id);

    revalidatePath("/admin/donors");
    revalidatePath(`/admin/donors/${member.donation_type}`);
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

//UPDATE DONOR
export const editDonor = async (id: string, data: any, imgData?: any) => {
  const parsedData = ServerSideSingleDonor.safeParse(data);

  if (id && parsedData.success) {
    try {
      const {
        fullname,
        address,
        phone,
        donation_type,
        donation_amount,
        donation_title,
      } = parsedData.data;
      const newUpdatedTeacherMember: TServerSideSingleDonorForm = {
        fullname,
        address,
        phone,
        donation_type,
        donation_amount,
        donation_title,
      };
      //check if there is image
      if (imgData) {
        newUpdatedTeacherMember.photo = {
          secure_url: imgData.secure_url,
          public_id: imgData.public_id,
        };
      }
      await connectDB();

      const upT = await Donors.findByIdAndUpdate(id, newUpdatedTeacherMember, {
        new: true,
      });
      revalidatePath("/admin/donors");
      revalidatePath(`/admin/donors/${donation_type}`);
      // revalidatePath("/admin/teams");
      return {
        success: true,
        message: "Successfully edited Donor Member",
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
