import { Request, Response } from 'express';
import { registerUser } from '../services/registerService';

export const registerController = async (req: Request, res: Response): Promise<void> => {
    const { email, password, username, name } = req.body;

    try {
        const user = await registerUser({ email, password, username, name });

        res.status(201).json({
            message: 'User registered successfully.',
            user: user
        });

    } catch (error: unknown) {
        const err = error as Error & { status?: number };
        
        if (err.message?.includes('User already exists')) {
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