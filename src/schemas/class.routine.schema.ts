import { z } from "zod";

export const classRoutineSchema = z.object({
  grade: z.string().min(1, { message: "Grade is required." }),
  section: z.string().min(1, { message: "Section is required." }),
  table: z.string().min(1, { message: "Routine Table is required." }),
});

export type TClassRoutineForm = z.infer<typeof classRoutineSchema>;
