import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 10;
const ACCEPTED_FILE_TYPES = ["application/pdf", "application/vnd.ms-excel"];
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const yearlyBookSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  image: z
    .any()
    .refine((file) => file !== null && file !== undefined, "File is required.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 10MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
      "Only .png, .jpg, .jpeg, .webp are supported.",
    ),
  book: z
    .any()
    .refine((file) => file !== null && file !== undefined, "File is required.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Max file size is 10MB.")
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.type),
      "Only .pdf and xls file formats are supported",
    ),
});

export const ServerYearlyBookSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  image: z
    .object({
      secure_url: z.string().nullish(),
      public_id: z.string().nullish(),
    })
    .nullish(),
  book: z.string().url(),
});

export type TServerYearlyBookForm = z.infer<typeof ServerYearlyBookSchema>;
export type TYearlyBookForm = z.infer<typeof yearlyBookSchema>;
