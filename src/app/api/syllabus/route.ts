import { NextRequest, NextResponse } from "next/server";
import { documentSchema } from "@/schemas/document.schema";
import { formDataToObject } from "@/lib/form";
import {
  getCloudflareUrl,
  getAuthKeySecret,
} from "@/server/actions/document/constants";
import { nanoid } from "nanoid";
import Doc from "@/server/models/Document";
import connectDB from "@/server/utils/connectDB";
import { revalidatePath } from "next/cache";
import { yearlyBookSchema } from "@/schemas/yearlyBook.schema";
import CloudinaryUpload from "@/components/common/CloudinaryUpload";
import { addYearlyBook } from "@/server/actions/yearlyBook/yearlybook.action";
import { SyllabusSchema } from "@/schemas/syllabus";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const data = formDataToObject(formData);
  const parsedData = SyllabusSchema.safeParse(data);

  if (parsedData.success) {
    const { grade, session, pdf } = parsedData.data;
    const id = nanoid();
    const url = `${getCloudflareUrl()}/syllabus/${id}`;
    try {
      await fetch(url, {
        body: pdf,
        method: "PUT",
        headers: { "X-Custom-Auth-Key": getAuthKeySecret() },
      });
      return NextResponse.json(
        {
          message: "Uploaded Syllabus Successfully.",
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
