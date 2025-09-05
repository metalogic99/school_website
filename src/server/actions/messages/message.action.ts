"use server";
import { MessageInput, MessageSchema } from "@/schemas/message.schema";
import Message from "@/server/models/Message.model";
import connectDB from "@/server/utils/connectDB";
import { revalidatePath } from "next/cache";

export const addMessage = async (data: MessageInput, imgData: any) => {
  if (!imgData) throw new Error("IMage is required!");

  //safeParse is given by zod to validate the given data before sending it to database
  //it will return either error object or valid data
  const parsedData = MessageSchema.safeParse(data);

  if (parsedData.success && imgData) {
    const { secure_url, public_id } = imgData;
    const { fullname, phone, email, message, designation, designationNepali } =
      parsedData.data;

    try {
      await connectDB();
      const newMessage = new Message({
        fullname,
        phone,
        designation,
        designationNepali,
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

interface TMessage {
  fullname: string;
  email: string;
  phone: string;
  designation: string;
  designationNepali: string;
  message: string;
  image?: {
    secure_url: string;
    public_id: string;
  };
}

export const editMessage = async (id: string, data: any, imgData?: any) => {
  const parsedData = MessageSchema.safeParse(data);
  console.log("data and id received is", id, data, parsedData);

  if (id && parsedData.success) {
    try {
      const {
        fullname,
        email,
        phone,
        message,
        designation,
        designationNepali,
      } = parsedData.data;
      const newUpdatedMessage: TMessage = {
        fullname,
        designation,
        designationNepali,
        email,
        phone,
        message,
      };
      //check if there is image
      if (imgData) {
        newUpdatedMessage.image = {
          secure_url: imgData.secure_url,
          public_id: imgData.public_id,
        };
      }
      await connectDB();

      await Message.findByIdAndUpdate(id, newUpdatedMessage);
      // revalidatePath("/teams");
      revalidatePath("/admin/message");
      //   revalidatePath("/admin/message/principal");
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

// Fetch a single message by ID
export const getMessageById = async (id: string) => {
  if (!id) {
    return { success: false, message: "Message ID is required" };
  }

  try {
    await connectDB();

    const message = await Message.findById(id); // or Message.findById(id) depending on model
    if (!message) {
      return { success: false, message: "Message not found" };
    }

    return { success: true, data: message };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to fetch message" };
  }
};

// Delete a message by ID
export const deleteMessageById = async (id: string) => {
  if (!id) {
    return { success: false, message: "Message ID is required" };
  }

  try {
    await connectDB();

    const deletedMessage = await Message.findByIdAndDelete(id);
    if (!deletedMessage) {
      return { success: false, message: "Message not found" };
    }

    revalidatePath("/admin/message");

    return { success: true, message: "Message deleted successfully" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to delete message" };
  }
};

export const getAllMessages = async () => {
  try {
    await connectDB();

    const messages = await Message.find().sort(); // latest first
    // If you want Message collection instead, use Message.find()

    return { success: true, data: messages };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to fetch messages" };
  }
};
