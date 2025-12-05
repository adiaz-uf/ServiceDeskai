import { Request, Response } from 'express';
import { registerUser } from '../services/registerService';
import { loginUser } from '../services/loginService';

export const registerController = async (req: Request, res: Response): Promise<void> => {
    const { email, password, username, name, userRole } = req.body;

    try {
        const user = await registerUser({ email, password, username, name, userRole });

        res.status(201).json({
            message: 'User registered successfully.',
            user: user
        });

    } catch (error: unknown) {
        const err = error as Error & { status?: number };
        
        if (err.message?.includes('ya existe')) {
            res.status(409).json({
                message: err.message
            });
            return;
        } else if (err.status === 400) {
            res.status(400).json({
                message: err.message
            });
            return;
        }

        console.error('Registration Failed: ', error);
        res.status(500).json({
            message: 'Server error during registration. Please try again later.'
        });
    }
}

export const loginController = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await loginUser({email, password});

        res.status(200).json({
            message: 'User logged in successfully.',
            user: user
        });
    } catch (error: unknown) {
        const err = error as Error;
        
        if (err.message === 'El email o la contraseña no son válidos') {
            res.status(401).json({
                message: err.message
            });
            return;
        }

        console.error('Login Failed:', error);
        res.status(500).json({
            message: 'Server error during login. Please try again later.'
        });
    }
}