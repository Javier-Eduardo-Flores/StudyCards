// frontend/src/features/mazos/schemas/mazo.schema.ts
import { z } from 'zod';

export const crearMazoGlobalSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(1, 'El nombre del mazo no puede estar vacío.')
    .min(3, 'El mazo debe tener al menos 3 caracteres.')
    .max(100, 'El nombre es demasiado largo.')
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.,()-]+$/,
      'El mazo contiene caracteres especiales no permitidos.'
    ),
});

export type CrearMazoGlobalSchemaType = z.infer<typeof crearMazoGlobalSchema>;
