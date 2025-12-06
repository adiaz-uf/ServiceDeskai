import { ReportModel, IReport } from '../models/Report';
import { Types } from 'mongoose';

interface CreateReportData {
    description: string;
    office: string;
    user: string;
    image_url: string;
    sharedWith?: string;
}

interface UpdateStatusData {
    status: 'open' | 'assigned' | 'in-progress' | 'closed';
}

/**
 * Crear un nuevo reporte
 */
export const createReport = async (data: CreateReportData): Promise<IReport> => {
    const report = new ReportModel({
        description: data.description,
        office: new Types.ObjectId(data.office),
        user: new Types.ObjectId(data.user),
        image_url: data.image_url,
        sharedWith: data.sharedWith,
        status: 'open'
    });

    return await report.save();
};

/**
 * Obtener historial de reportes (filtrado por usuario o todos para admin/service_desk)
 */
export const getReportHistory = async (
    userId: string, 
    userRole: string
): Promise<IReport[]> => {
    const query = userRole === 'user' 
        ? { user: new Types.ObjectId(userId) } 
        : {};
    
    return await ReportModel.find(query)
        .populate('office', 'number city direction')
        .populate('user', 'name email username')
        .sort({ createdAt: -1 });
};

/**
 * Obtener detalles de un reporte por ID
 */
export const getReportById = async (reportId: string): Promise<IReport | null> => {
    return await ReportModel.findById(reportId)
        .populate('office', 'number city country direction')
        .populate('user', 'name email username');
};

/**
 * Actualizar estado de un reporte
 */
export const updateReportStatus = async (
    reportId: string, 
    data: UpdateStatusData
): Promise<IReport | null> => {
    return await ReportModel.findByIdAndUpdate(
        reportId,
        { status: data.status },
        { new: true }
    );
};

/**
 * Compartir reporte (actualizar email de compartido)
 */
export const shareReport = async (
    reportId: string, 
    email: string
): Promise<IReport | null> => {
    return await ReportModel.findByIdAndUpdate(
        reportId,
        { sharedWith: email },
        { new: true }
    );
};

/**
 * Verificar si un usuario tiene acceso a un reporte
 */
export const userHasAccessToReport = async (
    reportId: string,
    userId: string,
    userRole: string
): Promise<boolean> => {
    if (userRole === 'admin' || userRole === 'service_desk') {
        return true;
    }
    
    const report = await ReportModel.findById(reportId);
    if (!report) return false;
    
    return report.user.toString() === userId;
};