import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { 
    createReport, 
    getReportHistory, 
    getReportById, 
    updateReportStatus, 
    shareReport,
    userHasAccessToReport 
} from '../services/reportService';

/**
 * Crear un nuevo reporte
 * POST /api/v1/reports
 */
export const createReportController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { description, office, sharedWith } = req.body;
    const userId = req.user?._id;

    if (!userId) {
        res.status(401).json({ message: 'Usuario no autenticado' });
        return;
    }

    // image_url viene del middleware multer
    const image_url = req.file?.filename;

    if (!image_url) {
        res.status(400).json({ message: 'La imagen es requerida' });
        return;
    }

    try {
        const report = await createReport({ 
            description, 
            office, 
            user: userId, 
            image_url,
            sharedWith 
        });

        res.status(201).json({
            message: 'Reporte creado correctamente',
            report: report
        });
    } catch (error: unknown) {
        console.error('Report creation failed: ', error);
        res.status(500).json({
            message: 'Error al crear el reporte'
        });
    }
};

/**
 * Obtener historial de reportes
 * GET /api/v1/reports
 */
export const getReportHistoryController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?._id;
    const userRole = req.user?.userRole;

    if (!userId || !userRole) {
        res.status(401).json({ message: 'Usuario no autenticado' });
        return;
    }

    try {
        const reports = await getReportHistory(userId, userRole);
        res.status(200).json({ reports });
    } catch (error: unknown) {
        console.error('Get report history failed: ', error);
        res.status(500).json({
            message: 'Error al obtener el historial de reportes'
        });
    }
};

/**
 * Obtener detalles de un reporte
 * GET /api/v1/reports/:id
 */
export const getReportDetailsController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    const userId = req.user?._id;
    const userRole = req.user?.userRole;

    if (!userId || !userRole) {
        res.status(401).json({ message: 'Usuario no autenticado' });
        return;
    }

    try {
        const hasAccess = await userHasAccessToReport(id, userId, userRole);
        if (!hasAccess) {
            res.status(403).json({ message: 'No tienes acceso a este reporte' });
            return;
        }

        const report = await getReportById(id);
        if (!report) {
            res.status(404).json({ message: 'Reporte no encontrado' });
            return;
        }

        res.status(200).json({ report });
    } catch (error: unknown) {
        console.error('Get report details failed: ', error);
        res.status(500).json({
            message: 'Error al obtener los detalles del reporte'
        });
    }
};

/**
 * Actualizar estado de un reporte
 * PATCH /api/v1/reports/:id/status
 */
export const updateReportStatusController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const report = await updateReportStatus(id, { status });
        if (!report) {
            res.status(404).json({ message: 'Reporte no encontrado' });
            return;
        }

        res.status(200).json({
            message: 'Estado del reporte actualizado',
            report
        });
    } catch (error: unknown) {
        console.error('Update report status failed: ', error);
        res.status(500).json({
            message: 'Error al actualizar el estado del reporte'
        });
    }
};

/**
 * Compartir reporte por email
 * POST /api/v1/reports/:id/share
 */
export const shareReportController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    const { email } = req.body;
    const userId = req.user?._id;
    const userRole = req.user?.userRole;

    if (!userId || !userRole) {
        res.status(401).json({ message: 'Usuario no autenticado' });
        return;
    }

    try {
        const hasAccess = await userHasAccessToReport(id, userId, userRole);
        if (!hasAccess) {
            res.status(403).json({ message: 'No tienes acceso a este reporte' });
            return;
        }

        const report = await shareReport(id, email);
        if (!report) {
            res.status(404).json({ message: 'Reporte no encontrado' });
            return;
        }

        res.status(200).json({
            message: 'Reporte compartido correctamente',
            report
        });
    } catch (error: unknown) {
        console.error('Share report failed: ', error);
        res.status(500).json({
            message: 'Error al compartir el reporte'
        });
    }
};