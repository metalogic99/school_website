import { z } from "zod";

export const examRoutineSchema = z.object({
  grade: z.string().min(1, { message: "Grade is required." }),
  exam: z.string().min(1, { message: "Exam type is required." }),
  table: z.string().min(1, { message: "Routine Table is required." }),
});

export type TExamRoutineForm = z.infer<typeof examRoutineSchema>;
