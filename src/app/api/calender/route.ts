import { NextRequest, NextResponse } from "next/server";
import { formDataToObject } from "@/lib/form";
import {
  getCloudflareUrl,
  getAuthKeySecret,
} from "@/server/actions/document/constants";
import { nanoid } from "nanoid";
import { CalenderSchema } from "@/schemas/calender.schema";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const data = formDataToObject(formData);
  const parsedData = CalenderSchema.safeParse(data);

  if (parsedData.success) {
    const { title, year, pdf } = parsedData.data;
    const id = nanoid();
    const url = `${getCloudflareUrl()}/calender/${id}`;
    try {
      await fetch(url, {
        body: pdf,
        method: "PUT",
        headers: { "X-Custom-Auth-Key": getAuthKeySecret() },
      });
      return NextResponse.json(
        {
          message: "Uploaded Calender Successfully.",
          url,
        },
        { status: 200 },
      );
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        {
          message:
            "Couldn't upload the file. Please reach out to concerned party.",
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
