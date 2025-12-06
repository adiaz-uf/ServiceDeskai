import { z } from 'zod';

export const createReportSchema = z.object({
    description: z
        .string()
        .max(1000, 'La descripción no puede exceder 1000 caracteres.')
        .optional(),
    
    office: z
        .string({ required_error: 'La oficina es requerida.' })
        .regex(/^[0-9a-fA-F]{24}$/, 'ID de oficina inválido.'),
    
    sharedWith: z
        .string()
        .email('Formato de email inválido para compartir.')
        .optional()
});

export const updateStatusSchema = z.object({
    status: z.enum(['open', 'assigned', 'in-progress', 'closed'], {
        errorMap: () => ({ message: 'Estado inválido. Debe ser: open, assigned, in-progress o closed.' })
    })
});

export const shareReportSchema = z.object({
    email: z
        .string({ required_error: 'El email es requerido.' })
        .email('Formato de email inválido.')
});

export type CreateReportInput = z.infer<typeof createReportSchema>;
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;
export type ShareReportInput = z.infer<typeof shareReportSchema>;
