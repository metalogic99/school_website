import { z } from "zod";

export const speechSchema = z.object({
  speech: z.string().min(1, { message: "Speech name is required." }),
});

export type TSpeechSchema = z.infer<typeof speechSchema>;
