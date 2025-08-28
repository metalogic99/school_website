import { NextResponse } from "next/server";
import connectDB from "@/server/utils/connectDB";
import Contact from "@/server/models/Contact";

export const DELETE = async (
  _: Request,
  { params }: { params: { id: string } },
) => {
  try {
    await connectDB();
    const deletedContact = await Contact.findByIdAndDelete(params.id);
    if (!deletedContact) {
      return NextResponse.json(
        { message: "Contact not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { message: "Contact deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error deleting contact" },
      { status: 500 },
    );
  }
};
