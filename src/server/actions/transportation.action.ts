"use server";
import connectDB from "../utils/connectDB";
import Transportation from "../models/Transportation";
import { revalidatePath } from "next/cache";

export async function addTransportation({
  staffName,
  route,
  phone,
  vehicleNo,
  appointedOn,
}: {
  staffName: string;
  phone: string;
  route: string;
  vehicleNo: string;
  appointedOn: string;
}) {
  await connectDB();
  if (!staffName || !phone || !route || !vehicleNo || !appointedOn) {
    return { error: "All fields are required !!" };
  }

  await Transportation.create({
    staffName,
    phone,
    route,
    vehicleNo,
    appointedOn,
  });
  revalidatePath("/admin/transportation");

  return { message: "Transportation added successfully !!" };
}

export async function deleteTransportation(id: string) {
  try {
    await connectDB();
    const t = await Transportation.findById(id);
    if (!t)
      return {
        success: false,
        message: "No such transportation detail found!",
      };
    await Transportation.findByIdAndDelete(id);
    revalidatePath("/admin/transportation");
    return { success: true, message: "Transportation deleted successfully !!" };
  } catch (Err) {
    console.log(Err);
    return {
      success: false,
      message: "Failed to delete!",
    };
  }
}

export async function editTransportation(
  id: string,
  {
    staffName,
    route,
    phone,
    vehicleNo,
    appointedOn,
  }: {
    staffName: string;
    phone: string;
    route: string;
    vehicleNo: string;
    appointedOn: string;
  },
) {
  await connectDB();
  await Transportation.findByIdAndUpdate(id, {
    staffName,
    route,
    phone,
    vehicleNo,
    appointedOn,
  });
  revalidatePath("/admin/transportation");
  return {
    success: true,
    message: "Transportation updated successfully !!",
  };
}
