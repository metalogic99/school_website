import { MAX_SIZE } from "@/server/actions/document/constants";
import { z } from "zod";
const MAX_FILE_SIZE = 1024 * 1024 * 10;
const ACCEPTED_FILE_TYPES = ["application/pdf", "application/vnd.ms-excel"];
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const phoneRegex = /^\d{10}$/;

export const singleDonor = z.object({
  fullname: z.string().min(1, { message: "Fullname is required." }),
  phone: z
    .string()
    .regex(phoneRegex, { message: "Please Enter valid phone no." })
    .min(10, { message: "Phone must be of 10 digits." })
    .max(10, { message: "Phone must be of 10 digits." }),
  address: z.string().min(1, { message: "Address is required." }),
  photo: z
    .object({
      secure_url: z.string().nullish(),
      public_id: z.string().nullish(),
    })
    .nullish(),
  donation_type: z.string().min(1, { message: "Donation type is required." }),
  donation_amount: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: "Donation amount must be a valid number.",
    }),
  donation_title: z.string().optional(),
});

export const ServerSideSingleDonor = z.object({
  fullname: z.string().min(1, { message: "Fullname is required." }),
  phone: z.string().min(1, { message: "Phone is required." }),
  address: z.string().min(1, { message: "Address is required." }),
  photo: z
    .object({
      secure_url: z.string().nullish(),
      public_id: z.string().nullish(),
    })
    .nullish(),
  donation_type: z.string().min(1, { message: "Donation type is required." }),
  donation_amount: z.string().optional(),
  donation_title: z.string().optional(),
});

export const akshyakoshSchema = z.object({
  fullname: z.string().min(1, { message: "Fullname is required." }),
  phone: z
    .string()
    .regex(phoneRegex, { message: "Please Enter valid phone no." })
    .min(10, { message: "Phone must be of 10 digits." })
    .max(10, { message: "Phone must be of 10 digits." }),
  address: z.string().min(1, { message: "Address is required." }),
  photo: z.any().optional(),
  donation_amount: z
    .string()
    .min(1, { message: "Donation amount is required." }),
  donation_type: z.string().min(1, { message: "Donation type is required." }),
});

export type TSingleDonorSchemaForm = z.infer<typeof singleDonor>;
export type TServerSideSingleDonorForm = z.infer<typeof ServerSideSingleDonor>;
export type TAkshyakoshSchemaForm = z.infer<typeof akshyakoshSchema>;
