import { Request, Response, NextFunction } from "express";

export const validateRegisterCredentials = 
(req: Request, res: Response, next: NextFunction) => {
    const { email, password, confirmPassword, username, name } = req.body;

    if (!email) {
        return res.status(400).json({
            message: 'Validation Error: Email is required.'
        })
    }

    if (!password) {
        return res.status(400).json({
            message: 'Validation Error: Password is required.'
        })
    }

    if (!confirmPassword) {
        return res.status(400).json({
            message: 'Validation Error: Confirm Password is required.'
        })
    }

    if (!username) {
        return res.status(400).json({
            message: 'Validation Error: Username is required.'
        })
    }

    if (!name) {
        return res.status(400).json({
            message: 'Validation Error: Name is required.'
        })
    }

    if (!email.includes('@') || email.length < 5) {
        return res.status(400).json({
            message: 'Validation Error: Invalid email format.'
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            message: 'Validation Error: Passwords must be the same.'
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: 'Validation Error: Password must be at least 6 characters long.'
        });
    }

    return next();
}


export const validateLoginCredentials = 
(req: Request, res: Response, next: NextFunction) => {
    const { email, password, confirmPassword, username, name } = req.body;

    if (!email) {
        return res.status(400).json({
            message: 'Validation Error: Email is required.'
        })
    }

    if (!password) {
        return res.status(400).json({
            message: 'Validation Error: Password is required.'
        })
    }

    if (!email.includes('@') || email.length < 5) {
        return res.status(400).json({
            message: 'Validation Error: Invalid email format.'
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: 'Validation Error: Password must be at least 6 characters long.'
        });
    }

    return next();
}

