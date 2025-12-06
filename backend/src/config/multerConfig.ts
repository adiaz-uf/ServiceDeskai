import multer from 'multer';
import path from 'path';

const uploadsPath = '/' + (process.env.UPLOADS_FOLDER || 'mongodb/uploads');

// Define where files will be saved
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsPath); 
    },
    
    // Define unique file name
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const ext = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
    }
});

// Multer config
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Max file: 5MB 
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png/;
        const isMimeTypeValid = allowedTypes.test(file.mimetype);
        
        if (isMimeTypeValid) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes JPEG, JPG y PNG.'));
        }
    }
});

export default upload;