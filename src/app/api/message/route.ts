import Message from "@/server/models/Message.model";
import connectDB from "@/server/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { fullName, designation, image, phone, email, message } =
    await req.json();
  if (!fullName || !designation || !phone || !email || !message) {
    return NextResponse.json(
      {
        message: "All fields are required",
      },
      { status: 400 },
    );
  }
  try {
    await connectDB();
    await Message.create({
      fullName,
      designation,
      image,
      phone,
      email,
      message,
    });
    return NextResponse.json({
      message: "Message added successfully",
    });
  } catch (error) {}
};

export const GET = async (_req: NextRequest) => {
  try {
    await connectDB();
    const messages = await Message.find();
    return NextResponse.json({ messages });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to fetch messages" },
      { status: 500 },
    );
  }
};
