import { z } from "zod";

export const branchSchema = z.object({
  name: z.string().min(1, { message: "Branch name is required." }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Must be a valid email." }),
  phone: z
    .string()
    .min(1, { message: "Phone is required." })
    .max(10, { message: "Contact cannot be more than 10 characters." }),
  manager: z.string().min(1, { message: "Branch manager is required." }),
});

export type TBranchForm = z.infer<typeof branchSchema>;
