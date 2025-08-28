import { z } from "zod";
const MAX_FILE_SIZE = 1024 * 1024 * 10;
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
  "application/vnd.ms-excel",
];

export const documentSchema = z.object({
  title: z.string().min(1, { message: "Title should be defined" }),
  doc: z
    .any()
    .refine((file) => file !== null && file !== undefined, "File is required.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 10MB.`)
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.type),
      "Only .png, .jpg, .jpeg, pdfs and xls are supported.",
    ),
});

export type TDocumentForm = z.infer<typeof documentSchema>;
