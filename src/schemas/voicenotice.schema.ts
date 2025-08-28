import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 10;
const ACCEPTED_FILE_TYPES = ["audio/mpeg", "audio/wav", "audio/ogg"];

export const voiceNoticeSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),

  voice: z
    .any()
    .refine((file) => file !== null && file !== undefined, "File is required.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Max file size is 10MB.")
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.type),
      "Only .mp3, .wav, and .ogg file formats are supported",
    ),
});

export const serverVoiceNoticeSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  voice: z.string().url(),
});

export type TServerVoiceNoticeSchema = z.infer<typeof serverVoiceNoticeSchema>;
export type TVoiceNoticeSchema = z.infer<typeof voiceNoticeSchema>;
