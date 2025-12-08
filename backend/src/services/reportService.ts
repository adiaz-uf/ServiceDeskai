import { Types } from 'mongoose';
import { GoogleGenerativeAI } from "@google/generative-ai";

import { ReportModel, IReport } from '../models/Report';
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

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

const BACKEND_URL = process.env.BACKEND_URL;
const BACKEND_PORT = process.env.BACKEND_PORT;

const generateDescriptionFromImage = async (imagePath: string): Promise<string> => {
    if (!GEMINI_API_KEY) throw new Error('Gemini API key not set');
    if (!BACKEND_URL || !BACKEND_PORT) throw new Error('BACKEND_URL or BACKEND_PORT not set in .env');
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Build image URL
    const imageUrl = imagePath.startsWith('http') ? imagePath : 
    `${BACKEND_URL}:${BACKEND_PORT}/uploads/${imagePath}`;

    // Fetch image as base64
    const fetch = (await import('node-fetch')).default;
    const res = await fetch(imageUrl);
    const arrayBuffer = await res.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString('base64');

    const prompt = `Analiza esta imagen de una oficina. Si hay algún daño o 
    problema con el mobiliario, descríbelo con detalle en unos 200 caracteres. 
    Enfócate en el estado del equipo y muebles. Responde en español.`;

    const result = await model.generateContent([
        prompt,
        {
            inlineData: {
                mimeType: 'image/jpeg',
                data: base64Image
            }
        }
    ]);

    const response = result.response;
    return response.text().trim();
};

export const createReport = async (data: CreateReportData): Promise<IReport> => {
    let description = data.description;
    if (!description && data.image_url) {
        try {
            description = await generateDescriptionFromImage(data.image_url);
        } catch (err) {
            console.error('Error generating description with Gemini:', err);
            description = '';
        }
    }

    const report = new ReportModel({
        description,
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
                description,
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