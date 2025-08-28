import { z } from "zod";

export const batchSchema = z.object({
  fullname: z.string().min(1, { message: "Fullname is required." }),
  gpa: z
    .number({ invalid_type_error: "GPA must be a number" })
    .min(0, { message: "GPA must be at least 0.0" })
    .max(4, { message: "GPA must be at most 4.0" })
    .refine((val) => typeof val === "number", {
      message: "Gpa should be a number",
    }),
  image: z
    .object({
      secure_url: z.string().nullish(),
      public_id: z.string().nullish(),
    })
    .nullish(),
  passedYear: z.string().min(1, { message: "Batch is required" }),
});

export type TBatchForm = z.infer<typeof batchSchema>;
