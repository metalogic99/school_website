import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_FILE_SIZE = 1024 * 1024 * 10;

const teamMemberSchema = z.object({
  fullname: z.string().optional(),
  grade: z.string().optional(),
  section: z.string().optional(),
});

export const houseDivisionSchema = z.object({
  house_color: z
    .string({ required_error: "Please select a color" })
    .min(1, { message: "Please select a color" }),
  house_name: z.string().min(1, { message: "House name is required." }),
  house_captain: z.object({
    fullname: z.string().min(1, { message: "Captain name is required." }),
    photo: z
      .object({
        secure_url: z.string().nullish(),
        public_id: z.string().nullish(),
      })
      .nullish(), // Assuming photo can be optional
    grade: z.string().min(1, { message: "Captain grade is required." }),
    section: z.string().min(1, { message: "Captain section is required." }),
  }),
  house_vice_captain: z.object({
    fullname: z.string().min(1, { message: "Vice Captain name is required." }),
    photo: z
      .object({
        secure_url: z.string().nullish(),
        public_id: z.string().nullish(),
      })
      .nullish(),
    grade: z.string().min(1, { message: "Vice Captain grade is required." }),
    section: z
      .string()
      .min(1, { message: "Vice Captain section is required." }),
  }),
  team_members: z.array(teamMemberSchema),
});

// NEW SCHEMA
export const serverhouseMemberSchema = z.object({
  house_color: z
    .string({ required_error: "Please select a color" })
    .min(1, { message: "Please select a color" }),
  house_name: z.string().min(1, { message: "House name is required." }),
  fullname: z.string().min(1, { message: "name is required." }),
  photo: z
    .object({
      secure_url: z.string().nullish(),
      public_id: z.string().nullish(),
    })
    .nullish(), // Assuming photo can be optional
  grade: z.string().min(1, { message: "grade is required." }),
  section: z.string().min(1, { message: "section is required." }),
  role: z.string().min(1, { message: "Role is required." }),
});

// NEW SCHEMA
export const houseMemberSchema = z.object({
  house_color: z
    .string({ required_error: "Please select a color" })
    .min(1, { message: "Please select a color" }),
  house_name: z.string().min(1, { message: "House name is required." }),
  fullname: z.string().min(1, { message: "Fullname is required." }),
  photo: z
    .any()
    .refine((file) => file !== undefined && file !== null, "Image is required.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Max file size is 10MB.")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
      "Only .jpeg, .png, .jpg, .webp file formats are supported.",
    )
    .optional(),
  grade: z.string().min(1, { message: "Grade is required." }),
  section: z.string().min(1, { message: "Section is required." }),
  role: z.string().min(1, { message: "Role is required." }),
});

export type THouseDivisionForm = z.infer<typeof houseDivisionSchema>;

// NEW SCHMR ATYPE
export type THouseMemberSchemaForm = z.infer<typeof houseMemberSchema>;
export type TServerhouseMemberSchemaForm = z.infer<
  typeof serverhouseMemberSchema
>;
