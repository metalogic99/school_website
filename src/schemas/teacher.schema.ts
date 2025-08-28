import { z } from "zod";

export const teacherSchema = z.object({
  fullname: z.string().min(1, { message: "Fullname is required." }),
  image: z
    .object({
      secure_url: z.string().nullish(),
      public_id: z.string().nullish(),
    })
    .nullish(),
  type: z.string().min(1, { message: "Type is required." }),
  designation: z.string().min(1, { message: "Designation is required." }),
  address: z.string().min(1, { message: "Address is required." }),
  qualification: z.string().min(1, { message: "Qualification is required." }),
  phone: z
    .string()

    .min(10, { message: "Phone no. should be of 10 digits only" })
    .max(10, { message: "Phone no. should be of 10 digits only" }),
  grade: z
    .string()
    .min(1, { message: "Select a grade that the teacher teaches. " }),
  status: z.string().min(1, { message: "Choose a status of the teacher " }),
  appointment_date: z
    .string()
    .min(1, { message: "Appointment Date is required." }),
  retirement_date: z
    .string()
    .min(1, { message: "Appointment Date is required." })
    .optional(),
  isHead: z.boolean().optional(),
  rank: z.string().min(1, { message: "Rank is needed to be assigned" }),
});

export type TTeacherForm = z.infer<typeof teacherSchema>;
