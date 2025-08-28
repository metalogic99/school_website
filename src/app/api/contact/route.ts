import Contact from "@/server/models/Contact";
import connectDB from "@/server/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (
      !body.fullName ||
      !body.email ||
      !body.contact ||
      !body.subject ||
      !body.description
    ) {
      return NextResponse.json(
        {
          message: "All fields required",
        },
        { status: 400 },
      );
    }
    await connectDB();
    await Contact.create(body);
    return NextResponse.json(
      {
        message: "Contact submitted successfully.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error submitting contact:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export const GET = async () => {
  try {
    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(contacts);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching contacts" },
      { status: 500 },
    );
  }
};
