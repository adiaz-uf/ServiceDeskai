import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

interface SendReportEmailData {
    to: string;
    reportId: string;
    reporterName: string;
    officeName: string;
    description: string;
    imagePath?: string; // local route
}

export const sendReportShareEmail = async (data: SendReportEmailData): Promise<void> => {
    const { to, reporterName, officeName, description, imagePath } = data;

    const attachments: nodemailer.SendMailOptions['attachments'] = [];
    let imageHtml = '';

    if (imagePath) {
        const uploadsDir = '/' + (process.env.UPLOADS_FOLDER || 'mongodb/uploads');
        const fullPath = path.join(uploadsDir, imagePath);
        
        if (fs.existsSync(fullPath)) {
            attachments.push({
                filename: path.basename(imagePath),
                path: fullPath,
                cid: 'reportImage'
            });
            imageHtml = `
                <div style="text-align: center; margin: 15px 0;">
                    <p><strong>Imagen adjunta:</strong></p>
                    <img src="cid:reportImage" alt="Imagen del reporte" style="max-width: 100%; border-radius: 8px;" />
                </div>
            `;
        } else {
            console.error('Image file not found:', fullPath);
        }
    }

    const mailOptions: nodemailer.SendMailOptions = {
        from: `"ServiceDeskAI" <${process.env.EMAIL_USER}>`,
        to,
        subject: `Nuevo reporte compartido - ${officeName}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background-color: #1C3B65; padding: 20px; text-align: center;">
                    <h1 style="color: white; margin: 0;">ServiceDeskAI</h1>
                </div>
                
                <div style="padding: 20px; background-color: #f9f9f9;">
                    <h2 style="color: #1C3B65;">Se ha compartido un reporte contigo</h2>
                    
                    <div style="background-color: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
                        <p><strong>Reportado por:</strong> ${reporterName}</p>
                        <p><strong>Oficina:</strong> ${officeName}</p>
                        <p><strong>Descripción:</strong></p>
                        <p style="background-color: #EFEFEF; padding: 10px; border-radius: 4px;">
                            ${description || 'Sin descripción'}
                        </p>
                    </div>
                    
                    ${imageHtml}
                    
                    <p style="color: #6D6D72; font-size: 12px; text-align: center; margin-top: 20px;">
                        Este es un correo automático de ServiceDeskAI. Por favor no responda a este mensaje.
                    </p>
                </div>
            </div>
        `,
        attachments
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error al enviar el email');
    }
};

// Check email connection with server
export const verifyEmailConnection = async (): Promise<boolean> => {
    try {
        await transporter.verify();
        console.log('Email server connection verified');
        return true;
    } catch (error) {
        console.error('Email server connection failed:', error);
        return false;
    }
};
