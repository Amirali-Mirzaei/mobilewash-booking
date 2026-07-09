import { z } from "zod";

export const bookingSchema = z.object({

    firstName: z
        .string()
        .trim()
        .min(2)
        .max(30)
        .regex(/^[A-Za-z\s]+$/),

    lastName: z
        .string()
        .trim()
        .min(2)
        .max(30)
        .regex(/^[A-Za-z\s]+$/),

    phone: z
        .string()
        .trim()
        .regex(/^[0-9+\-()\s]{7,18}$/),

    address: z
        .string()
        .trim()
        .min(10)
        .max(200),

    date: z.string(),

    time: z.string()

}); 