import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 10;
const ACCEPTED_FILE_TYPES = ["application/pdf", "application/vnd.ms-excel"];
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const CalenderSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  year: z.string().min(1, { message: "Year of Calender is required" }),
  pdf: z
    .any()
    .refine((file) => file !== null && file !== undefined, "File is required.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Max file size is 10MB.")
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.type),
      "Only .pdf and xls file formats are supported",
    ),
});

export const ServerCalenderSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  year: z.string().min(1, { message: "Year of Calender is required" }),
  pdf: z.string().url(),
});

export type TServerCalenderSchemaForm = z.infer<typeof ServerCalenderSchema>;
export type TCalenderSchemaForm = z.infer<typeof CalenderSchema>;
