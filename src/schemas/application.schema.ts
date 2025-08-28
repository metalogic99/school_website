import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1025;
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "text/plain",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const applicationSchema = z.object({
  vacancy: z.string(),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .email({ message: "Must be a valid email" })
    .min(1, { message: "Emaill is required" }),
  contact: z.string().min(10, { message: "Must be a valid contact" }),
  resumeUrl: z.string().optional(),
  resume: z
    .any()
    .refine((files) => files?.length == 1, "Resume is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`,
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      ".pdf, .doc and .docx, .txt files are accepted.",
    ),
});

export type TApplicationSchema = z.infer<typeof applicationSchema>;

export const serverApplicationSchema = z.object({
  vacancy: z.string(),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .email({ message: "Must be a valid email" })
    .min(1, { message: "Emaill is required" }),
  contact: z.string().min(10, { message: "Must be a valid contact" }),
  resumeUrl: z.string(),
});

export type TServerApplicationData = z.infer<typeof applicationSchema>;
