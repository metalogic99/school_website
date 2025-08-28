import { z } from "zod";

export const transportationSchema = z.object({
  staffName: z.string().min(1, "Staff name is required"),
  phone: z
    .string()
    .min(10, "Phone number must be of 10 digits")
    .max(10, "Phone number must be of 10 digits."),
  route: z.string().min(1, "Route is required"),
  vehicleNo: z.string().min(1, "Vehicle number is required"),
  appointedOn: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), "Invalid date"),
});

export type TStaffForm = z.infer<typeof transportationSchema>;
