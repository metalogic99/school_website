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

export const RegistrationSchema = z.object({
  fullname: z.string().min(1, { message: "Fullname is required." }),
  dob: z
    .string({ required_error: "Date of birth is required." })
    .min(1, { message: "Date of birth is required." }),
  grade: z
    .string({ required_error: "Grade is required." })
    .min(1, { message: "Select a grade you are interested in" }),
  permanentaddress: z
    .string()
    .min(1, { message: "Permanent address is required." }),
  presentaddress: z
    .string()
    .min(1, { message: "Present address is required." }),
  fathername: z.string().min(1, { message: "Father's name is required." }),
  fatherphone: z
    .string()
    .regex(phoneRegex, { message: "Please enter valid phone no." })
    .min(10, { message: "Phone no. should be of 10 digits only" })
    .max(10, { message: "Phone no. should be of 10 digits only" }),
  mothername: z.string().min(1, { message: "Mother's name is required." }),
  motherphone: z
    .string()
    .regex(phoneRegex, { message: "Please enter valid phone no." })
    .min(10, { message: "Phone no. should be of 10 digits only" })
    .max(10, { message: "Phone no. should be of 10 digits only" }),
  email: z.string().optional(),
  guardian_name: z.string().optional(),
  guardian_phone: z
    .string()

    .optional()
    .refine((val) => !val || (val.length === 10 && /^\d+$/.test(val)), {
      message: "Phone no. should be of 10 digits only",
    }),
  gender: z
    .string({ required_error: "Gender is required." })
    .min(1, { message: "Gender is required." }),
  photo: z
    .any()
    .refine((file) => file !== null && file !== undefined, "File is required")
    .refine((file) => file?.size <= MAX_FILE_SIZE, {
      message: `Max file size is 10MB.`,
    })
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
      "Only .jpg .jpeg .png file formats are supported",
    ),
  birth_certificate: z
    .any()
    .refine((file) => file !== null && file !== undefined, "File is required.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Max file size is 10 MB.")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
      "Only .jpg .jpeg .png file formats are supported.",
    ),
});

export const ServerSideRegistrationSchema = z.object({
  fullname: z.string().min(1, { message: "Fullname is required." }),
  dob: z.string().min(1, { message: "Date of birth is required." }),
  grade: z
    .string({ required_error: "Grade is required." })
    .min(1, { message: "Select a grade you are interested in" }),
  permanentaddress: z
    .string()
    .min(1, { message: "Permanent address is required." }),
  presentaddress: z
    .string()
    .min(1, { message: "Present address is required." }),
  fathername: z.string().min(1, { message: "Father's name is required." }),
  fatherphone: z
    .string()
    .min(10, { message: "Phone no. should be of 10 digits only" })
    .max(10, { message: "Phone no. should be of 10 digits only" }),
  mothername: z.string().min(1, { message: "Mother's name is required." }),
  motherphone: z
    .string()
    .min(10, { message: "Phone no. should be of 10 digits only" })
    .max(10, { message: "Phone no. should be of 10 digits only" }),
  email: z.string().optional(),
  guardian_name: z.string().optional(),
  guardian_phone: z.string().optional(),
  gender: z
    .string({ required_error: "Gender is required." })
    .min(1, { message: "Gender is required." }),
  photo: z
    .object({
      secure_url: z.string().nullish(),
      public_id: z.string().nullish(),
    })
    .nullish(),
  birth_certificate: z
    .object({
      secure_url: z.string().nullish(),
      public_id: z.string().nullish(),
    })
    .nullish(),
});

export type TRegistrationForm = z.infer<typeof RegistrationSchema>;
export type TServerSideRegistrationForm = z.infer<
  typeof ServerSideRegistrationSchema
>;
