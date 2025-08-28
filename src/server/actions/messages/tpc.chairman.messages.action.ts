"use server";

import {
  TpcChairmanMesssageSchema,
  TTpcChairmanMessageForm,
} from "@/schemas/tpc.chairman.message.schema";
import TPCChairmanMessages from "@/server/models/tpc-chairman";
import connectDB from "@/server/utils/connectDB";
import { revalidatePath } from "next/cache";

export const addTpcChairmanMessage = async (
  data: TTpcChairmanMessageForm,
  imgData: any,
) => {
  if (!imgData) throw new Error("IMage is required!");

  //safeParse is given by zod to validate the given data before sending it to database
  //it will return either error object or valid data
  const parsedData = TpcChairmanMesssageSchema.safeParse(data);

  if (parsedData.success && imgData) {
    const { secure_url, public_id } = imgData;
    const { fullname, phone, email, message } = parsedData.data;

    try {
      await connectDB();
      const newMessage = new TPCChairmanMessages({
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

//retrieve data

// export const getChairmanMessage = async () => {

// };

interface TChairmanMessage {
  fullname: string;
  email: string;
  phone: string;
  message: string;
  image?: {
    secure_url: string;
    public_id: string;
  };
}

export const editTpcChairmanMessage = async (
  id: string,
  data: any,
  imgData?: any,
) => {
  const parsedData = TpcChairmanMesssageSchema.safeParse(data);

  if (id && parsedData.success) {
    try {
      const { fullname, email, phone, message } = parsedData.data;
      const newUpdatedChairmanMsg: TChairmanMessage = {
        fullname,
        email,
        phone,
        message,
      };
      //check if there is image
      if (imgData) {
        newUpdatedChairmanMsg.image = {
          secure_url: imgData.secure_url,
          public_id: imgData.public_id,
        };
      }
      await connectDB();

      await TPCChairmanMessages.findByIdAndUpdate(id, newUpdatedChairmanMsg);
      // revalidatePath("/teams");
      revalidatePath("/admin/message");
      revalidatePath("/admin/message/chairman");
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
