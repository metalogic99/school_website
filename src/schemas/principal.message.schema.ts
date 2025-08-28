import { z } from "zod";

export const PrincipalMesssageSchema = z.object({
  fullname: z.string().min(1, { message: "Fullname is required." }),
  phone: z.string().min(10, { message: "Must be a valid contact" }),
  email: z
    .string()
    .email({ message: "Email must be valid." })
    .min(1, { message: "Email is required." }),
  message: z.string().min(1, { message: "Message is required." }),
  image: z
    .object({
      secure_url: z.string().nullish(),
      public_id: z.string().nullish(),
    })
    .nullish(),
});

export type TPrincipalMessageForm = z.infer<typeof PrincipalMesssageSchema>;
