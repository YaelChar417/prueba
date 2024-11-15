import { z } from "zod";

export const teacherSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  department: z
    .string()
    .min(5, { message: "El departamente debe tener al menos 5 caracteres" }),
  last_name: z
    .string()
    .min(2, { message: "El apellido debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Debe ser un email válido" }),
  phone: z
    .string()
    .regex(/^\d{3}-\d{4}$/, {
      message: "El formato del teléfono debe ser '555-1234'",
    })
    .optional(),
});
