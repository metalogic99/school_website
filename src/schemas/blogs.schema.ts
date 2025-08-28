import { z } from "zod";

export const blogsSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  desc: z.string().min(1, { message: "Description is required." }),
  body: z.string().min(1, { message: "Content is required." }),
  image: z
    .object({
      secure_url: z.string().nullish(),
      public_id: z.string().nullish(),
    })
    .nullish(),
});

export type TBlogsForm = z.infer<typeof blogsSchema>;
