"use server";
import YearlyBook from "@/server/models/YearlyBook";
import connectDB from "@/server/utils/connectDB";
import { revalidatePath } from "next/cache";
import { deleteCloudinaryImage } from "../gallery/upload.action";
import { getAuthKeySecret } from "../document/constants";
import { ServerYearlyBookSchema } from "@/schemas/yearlyBook.schema";
import { serverVoiceNoticeSchema } from "@/schemas/voicenotice.schema";
import VoiceNotice from "@/server/models/VoiceNotice";

export const addVoiceNotice = async (data: any) => {
  const parsedData = serverVoiceNoticeSchema.safeParse(data);

  if (parsedData.success) {
    const { title, voice } = parsedData.data;
    try {
      const newVoiceNotice = new VoiceNotice({
        voice,
        title,
      });
      newVoiceNotice.save();
      revalidatePath("/admin/notice");
      return {
        success: true,
        message: "New Voice Notice has been added",
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Failed to add new Voice Notice!",
      };
    }
  } else {
    return {
      success: false,
      message: "Must be valid data!",
    };
  }
};

export const deleteVoiceNotice = async (id: string) => {
  if (!id) throw new Error("Must have an id.");

  try {
    const voice = await VoiceNotice.findById(id);
    if (!voice) throw new Error("There is no such Voice Notice!");
    await connectDB();

    const res = await fetch(voice.voice, {
      method: "DELETE",
      headers: {
        "X-Custom-Auth-Key": getAuthKeySecret(),
      },
    });

    if (res.ok) {
      try {
        await VoiceNotice.findByIdAndDelete(id);
        revalidatePath("/admin/notice");
        revalidatePath("/notices");
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
    }
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Failed to 222!",
    };
  }
};
