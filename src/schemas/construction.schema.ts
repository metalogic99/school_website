import { z } from "zod";

export const constructionSchema = z.object({
  fullname: z.string().min(1, { message: "Fullname is required." }),
  image: z
    .object({
      secure_url: z.string().nullish(),
      public_id: z.string().nullish(),
    })
    .nullish(),
  project_title: z.string().min(1, { message: "Project title is required." }),
  type: z.string().min(1, { message: "Type is required" }),
  designation: z.string().min(1, { message: "Designation is required." }),
  address: z.string().min(1, { message: "Address is required." }),
  qualification: z.string().min(1, { message: "Qualification is required." }),
  phone: z
    .string()

    .min(10, { message: "Phone no. should be of 10 digits only" })
    .max(10, { message: "Phone no. should be of 10 digits only" }),
  appointment_date: z.string({
    required_error: "Appointment Date is required.",
  }),
  isHead: z.boolean().optional(),
});

export type TConstructionForm = z.infer<typeof constructionSchema>;
