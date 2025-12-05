import { z } from 'zod';

export const registerSchema = z.object({
    email: z
        .string({ required_error: 'El email es requerido.' })
        .email('Formato de email inválido.')
        .min(5, 'El email debe tener al menos 5 caracteres.'),
    
    password: z
        .string({ required_error: 'La contraseña es requerida.' })
        .min(6, 'La contraseña debe tener al menos 6 caracteres.')
        .regex(/[A-Z]/, 'La contraseña debe contener al menos una mayúscula.')
        .regex(/[a-z]/, 'La contraseña debe contener al menos una minúscula.')
        .regex(/[0-9]/, 'La contraseña debe contener al menos un número.'),
    
    confirmPassword: z
        .string({ required_error: 'La confirmación de contraseña es requerida.' }),
    
    username: z
        .string({ required_error: 'El nombre de usuario es requerido.' })
        .min(3, 'El nombre de usuario debe tener al menos 3 caracteres.')
        .max(20, 'El nombre de usuario no puede tener más de 20 caracteres.')
        .regex(/^[a-zA-Z0-9_-]+$/, 'El nombre de usuario solo puede contener letras, números y guiones.'),
    
    name: z
        .string({ required_error: 'El nombre es requerido.' })
        .min(2, 'El nombre debe tener al menos 2 caracteres.')
        .max(50, 'El nombre no puede tener más de 50 caracteres.'),
    
    userRole: z
        .enum(['user', 'service_desk', 'admin'], {
            errorMap: () => ({ message: 'Rol de usuario inválido.' })
        })
        .optional()
        .default('user')
}).refine((data: any) => data.password === data.confirmPassword, {
    message: 'Las contraseñas deben coincidir.',
    path: ['confirmPassword']
});

export const loginSchema = z.object({
    email: z
        .string({ required_error: 'El email es requerido.' })
        .email('Formato de email inválido.')
        .min(5, 'El email debe tener al menos 5 caracteres.'),
    
    password: z
        .string({ required_error: 'La contraseña es requerida.' })
        .min(1, 'La contraseña es requerida.')
});


export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
