import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { createReportSchema, updateStatusSchema, shareReportSchema } from "../schemas/reportSchemas";

export const validateNewReport = 
(req: Request, res: Response, next: NextFunction) => {
    try {
        createReportSchema.parse(req.body);
        return next();
    } catch (error) {
        if (error instanceof ZodError) {
            const errorMessages = error.errors.map(err => err.message);
            return res.status(400).json({
                message: errorMessages[0],
                errors: errorMessages
            });
        }
        return res.status(500).json({
            message: 'Error de validación.'
        });
    }
};

export const validateStatusUpdate = 
(req: Request, res: Response, next: NextFunction) => {
    try {
        updateStatusSchema.parse(req.body);
        return next();
    } catch (error) {
        if (error instanceof ZodError) {
            const errorMessages = error.errors.map(err => err.message);
            return res.status(400).json({
                message: errorMessages[0],
                errors: errorMessages
            });
        }
        return res.status(500).json({
            message: 'Error de validación.'
        });
    }
};

export const validateShareReport = 
(req: Request, res: Response, next: NextFunction) => {
    try {
        shareReportSchema.parse(req.body);
        return next();
    } catch (error) {
        if (error instanceof ZodError) {
            const errorMessages = error.errors.map(err => err.message);
            return res.status(400).json({
                message: errorMessages[0],
                errors: errorMessages
            });
        }
        return res.status(500).json({
            message: 'Error de validación.'
        });
    }
};
