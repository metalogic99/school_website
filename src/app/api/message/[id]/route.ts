import Message from "@/server/models/Message.model";
import connectDB from "@/server/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { id } = params;

  try {
    const { fullName, designation, image, phone, email, message } =
      await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Message ID is required" },
        { status: 400 },
      );
    }

    await connectDB();

    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { fullName, designation, image, phone, email, message },
      { new: true },
    );

    if (!updatedMessage) {
      return NextResponse.json(
        { message: "Message not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Message updated successfully",
      data: updatedMessage,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to update message" },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { message: "Message ID is required" },
      { status: 400 },
    );
  }

  try {
    await connectDB();

    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return NextResponse.json(
        { message: "Message not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Message deleted successfully",
      data: deletedMessage,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to delete message" },
      { status: 500 },
    );
  }
};
