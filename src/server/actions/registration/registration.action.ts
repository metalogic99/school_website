"use server";

import {
  RegistrationSchema,
  ServerSideRegistrationSchema,
  TRegistrationForm,
  TServerSideRegistrationForm,
} from "@/schemas/registration.schema";
import Registration from "@/server/models/registration";
import connectDB from "@/server/utils/connectDB";
import { revalidatePath } from "next/cache";

export const addStudentRegistration = async (
  data: TServerSideRegistrationForm,
  imgData?: any,
  birthCertificateImg?: any,
) => {
  const parsedData = ServerSideRegistrationSchema.safeParse(data);
  if (parsedData.success) {
    const { secure_url: s1, public_id: p1 } = imgData;
    const { secure_url: s2, public_id: p2 } = birthCertificateImg;

    const {
      fullname,
      grade,
      gender,
      guardian_phone,
      guardian_name,
      email,
      permanentaddress,
      presentaddress,
      fathername,
      mothername,
      fatherphone,
      motherphone,
      dob,
    } = parsedData.data;

    try {
      const newStudentRegister = new Registration({
        fullname,
        grade,
        gender,
        permanentaddress,
        presentaddress,
        guardian_phone,
        guardian_name,
        email,
        fathername,
        mothername,
        fatherphone,
        motherphone,
        dob,
        photo: {
          secure_url: s1,
          public_id: p1,
        },
        birth_certificate: {
          secure_url: s2,
          public_id: p2,
        },
      });
      newStudentRegister.save();
      revalidatePath("/admin/registration");
      return {
        success: true,
        message: "Your Detail has been Registered!",
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Sorry! Failed to register your detail",
      };
    }
  } else {
    return {
      success: false,
      message: "Invalid Data",
    };
  }
};

export const deleteStudentRegistration = async (id: string) => {
  if (!id) throw new Error("Invalid Id Provided!");

  try {
    const student = await Registration.findById(id);
    if (!student) throw new Error("There is no such student registration");

    await connectDB();
    await Registration.findByIdAndDelete(id);
    revalidatePath("/admin/registration");
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
};
