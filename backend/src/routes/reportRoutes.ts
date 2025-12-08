import { Router } from 'express';
import { 
    createReportController, 
    getReportHistoryController, 
    getReportDetailsController, 
    updateReportStatusController
} from '../controllers/reportController';
import { authenticateJWT, authorizeRoles } from '../middleware/authMiddleware';
import { validateNewReport, validateStatusUpdate, validateShareReport } from '../middleware/validationMiddleware';
import upload from '../config/multerConfig';

const router = Router();

// Rutas de Usuario Estándar/Service Desk/Admin

/** POST /api/v1/reports (Crear un nuevo ticket con imagen) */
router.post('/', authenticateJWT, upload.single('image'), validateNewReport, createReportController);

/** GET /api/v1/reports (Historial de reportes) */
router.get('/', authenticateJWT, getReportHistoryController); // Todos los roles

/** GET /api/v1/reports/:id (Detalles del reporte) */
router.get('/:id', authenticateJWT, getReportDetailsController); 

// Rutas de Service Desk y Administrador
/** PUT/PATCH /api/v1/reports/:id/status (Actualizar estado: 'assigned', 'in-progress', 'closed') */
router.patch('/:id/status', authenticateJWT, authorizeRoles(['service_desk', 'admin']), validateStatusUpdate, updateReportStatusController);

export default router;