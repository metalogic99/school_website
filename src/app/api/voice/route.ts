import { formDataToObject } from "@/lib/form";
import { voiceNoticeSchema } from "@/schemas/voicenotice.schema";
import {
  getAuthKeySecret,
  getCloudflareUrl,
} from "@/server/actions/document/constants";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const formdata = await req.formData();

  const data = formDataToObject(formdata);
  const parsedData = voiceNoticeSchema.safeParse(data);

  if (parsedData.success) {
    const { title, voice } = parsedData.data;
    const id = nanoid();
    const url = `${getCloudflareUrl()}/voices/${id}`;

    try {
      const res = await fetch(url, {
        body: voice,
        method: "PUT",
        headers: {
          "X-Custom-Auth-Key": getAuthKeySecret(),
        },
      });
      return NextResponse.json(
        {
          message: "Voice Notice has been uploaded",
          url,
        },
        { status: 200 },
      );
    } catch (Err) {
      console.log(Err);
      return NextResponse.json(
        {
          message: "Failed to upload voice notice!",
        },
        { status: 500 },
      );
    }
  } else {
    return NextResponse.json(
      { message: "Please send us a valid data" },
      { status: 400 },
    );
  }
};
