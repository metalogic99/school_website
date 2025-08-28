import { NextRequest, NextResponse } from "next/server";
import Applicant from "@/server/models/Applicant";
import { formDataToObject } from "@/lib/form";
import {
  getCloudflareUrl,
  getAuthKeySecret,
} from "@/server/actions/document/constants";

import { nanoid } from "nanoid";
import connectDB from "@/server/utils/connectDB";

export const POST = async (req: NextRequest) => {
  const body = await req.formData();
  const data = formDataToObject(body);
  const { firstName, lastName, resume, email, contact, vacancy } = data;
  if (!firstName || !lastName || !resume || !email || !contact || !vacancy)
    return NextResponse.json(
      { message: "All fields are required." },
      { status: 400 },
    );

  await connectDB();
  try {
    const previousApplicant = await Applicant.findOne({
      email: data.email,
      vacancy: data.vacancy,
    });
    if (previousApplicant) {
      return NextResponse.json(
        {
          message: "Your application has been already sent !",
        },
        { status: 200 },
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        message: "Internal Server Error !",
      },
      { status: 500 },
    );
  }

  const id = nanoid();
  const url = `${getCloudflareUrl()}/satlok/resume/${id}`;

  // Upload resume to cloudflare
  try {
    await fetch(url, {
      method: "PUT",
      body: resume,
      headers: {
        "X-Custom-Auth-Key": getAuthKeySecret(),
      },
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Couldn't upload CV." },
      { status: 500 },
    );
  }

  // Save it to database
  try {
    const newApplicant = new Applicant({
      vacancy: vacancy,
      firstName: firstName,
      lastName: lastName,
      email: email,
      contact: contact,
      resumeUrl: url,
    });
    const res = await newApplicant.save();
    return NextResponse.json({
      message: "Application Submitted successfully!",
      success: true,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error !!" },
      { status: 500 },
    );
  }
};
