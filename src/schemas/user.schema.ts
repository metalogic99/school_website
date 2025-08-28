import { z } from "zod";

export const userSchema = z.object({
  username: z.string(),
  password: z.string(),
});
export type TUserForm = z.infer<typeof userSchema>;
