import { ReportModel, IReport } from '../models/Report';
import { Types } from 'mongoose';
import { sendReportShareEmail } from './emailService';
import { OfficeModel } from '../models/Office';
import { UserModel } from '../models/User';

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

export const createReport = async (data: CreateReportData): Promise<IReport> => {
    const report = new ReportModel({
        description: data.description,
        office: new Types.ObjectId(data.office),
        user: new Types.ObjectId(data.user),
        image_url: data.image_url,
        sharedWith: data.sharedWith,
        status: 'open'
    });

    const savedReport = await report.save();

    // Send email
    if (data.sharedWith) {
        try {
            const office = await OfficeModel.findById(data.office);
            const user = await UserModel.findById(data.user);
            
            await sendReportShareEmail({
                to: data.sharedWith,
                reportId: savedReport._id.toString(),
                reporterName: user?.name || 'Usuario',
                officeName: office ? `${office.city} - ${office.direction}` : 'Oficina',
                description: data.description,
                imagePath: data.image_url
            });
        } catch (emailError) {
            console.error('Error sending share email:', emailError);
            // dont block report creation
        }
    }

    return savedReport;
};

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

export const getReportById = async (reportId: string): Promise<IReport | null> => {
    return await ReportModel.findById(reportId)
        .populate('office', 'number city country direction')
        .populate('user', 'name email username');
};

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