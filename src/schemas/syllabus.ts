import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 10;
const ACCEPTED_FILE_TYPES = ["application/pdf", "application/vnd.ms-excel"];
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const SyllabusSchema = z.object({
  grade: z.string().min(1, { message: "Grade is required." }),
  session: z.string().min(1, { message: "Session of syllabus is required" }),
  pdf: z
    .any()
    .refine((file) => file !== null && file !== undefined, "File is required.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Max file size is 10MB.")
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.type),
      "Only .pdf and xls file formats are supported",
    ),
});

export const ServerSyllabusSchema = z.object({
  grade: z.string().min(1, { message: "Grade is required." }),
  session: z.string().min(1, { message: "Session of syllabus is required" }),
  pdf: z.string().url(),
});

export type TServerSyllabusSchemaForm = z.infer<typeof ServerSyllabusSchema>;
export type TSyllabusSchemaForm = z.infer<typeof SyllabusSchema>;
