"use server";
import {
  PrincipalMesssageSchema,
  TPrincipalMessageForm,
} from "@/schemas/principal.message.schema";
import PrincipalMessages from "@/server/models/PrincipalMessage";
import connectDB from "@/server/utils/connectDB";
import { revalidatePath } from "next/cache";

export const addPrincipalMessage = async (
  data: TPrincipalMessageForm,
  imgData: any,
) => {
  if (!imgData) throw new Error("IMage is required!");

  //safeParse is given by zod to validate the given data before sending it to database
  //it will return either error object or valid data
  const parsedData = PrincipalMesssageSchema.safeParse(data);

  if (parsedData.success && imgData) {
    const { secure_url, public_id } = imgData;
    const { fullname, phone, email, message } = parsedData.data;

    try {
      await connectDB();
      const newMessage = new PrincipalMessages({
        fullname,
        phone,
        email,
        message,
        image: { secure_url, public_id },
      });
      newMessage.save();

      return {
        success: true,
        message: "New Message added",
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Failed to add message",
      };
    }
  } else {
    return { success: false, message: "Must be valid data!" };
  }
};

interface TPrincipalMessage {
  fullname: string;
  email: string;
  phone: string;
  message: string;
  image?: {
    secure_url: string;
    public_id: string;
  };
}

export const editPrincipalMessage = async (
  id: string,
  data: any,
  imgData?: any,
) => {
  const parsedData = PrincipalMesssageSchema.safeParse(data);

  if (id && parsedData.success) {
    try {
      const { fullname, email, phone, message } = parsedData.data;
      const newUpdatedPrincipalMsg: TPrincipalMessage = {
        fullname,
        email,
        phone,
        message,
      };
      //check if there is image
      if (imgData) {
        newUpdatedPrincipalMsg.image = {
          secure_url: imgData.secure_url,
          public_id: imgData.public_id,
        };
      }
      await connectDB();

      await PrincipalMessages.findByIdAndUpdate(id, newUpdatedPrincipalMsg);
      // revalidatePath("/teams");
      revalidatePath("/admin/message");
      revalidatePath("/admin/message/principal");
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
