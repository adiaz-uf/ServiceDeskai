import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    throw new Error('CRITICAL ERROR: JWT_SECRET environment variable is not set');
}

type UserRole = 'standard' | 'service_desk' | 'admin';

interface DecodedUser {
    _id: string,
    email: string,
    username: string,
    name: string,
    userRole: UserRole;
}

export interface AuthenticatedRequest extends Request {
    user?: DecodedUser;
}

export const authenticateJWT = 
(req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ 
            error: 'Unauthorized', 
            message: 'Access token is required.' 
        });
        return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ 
            error: 'Authentication failed', 
            message: 'Token not found in Authorization header.' 
        });
        return;
    }
    
    // Verify token
    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            res.status(403).json({ 
                error: 'Forbidden', 
                message: 'Invalid or expired token.' 
            });
            return;
        }

        req.user = user as DecodedUser;
        next();
    });
};

export const authorizeRoles = (allowedRoles: UserRole[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const userRole = req.user?.userRole;

        if (req.user && userRole && allowedRoles.includes(userRole)) {
            next();
        } else {
            res.status(403).json({ 
                error: 'Forbidden', 
                message: 'You do not have the required permissions to access this resource.' 
            });
        }
    };
};