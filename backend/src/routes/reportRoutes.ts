// src/routes/reportsRouter.ts
import { Router } from 'express';
import { 
    createReportController, 
    getReportHistoryController, 
    getReportDetailsController, 
    updateReportStatusController,
    shareReportController,
    uploadReportMediaController,
    analyzeImageController
} from '../controllers/reportController';
import { authenticateJWT, authorizeRoles } from '../middleware/authMiddleware';
import { validateNewReport, validateStatusUpdate } from '../middleware/validationMiddleware';

const router = Router();

// Rutas de Usuario Estándar/Service Desk/Admin

/** POST /api/v1/reports (Crear un nuevo ticket) */
router.post('/', authenticateJWT, validateNewReport, createReportController);

/** GET /api/v1/reports (Historial de reportes) */
router.get('/', authenticateJWT, getReportHistoryController); // Todos los roles

/** GET /api/v1/reports/:id (Detalles del reporte) */
router.get('/:id', authenticateJWT, getReportDetailsController); 

/** POST /api/v1/reports/:id/media (Subir media) */
router.post('/:id/media', authenticateJWT, uploadReportMediaController); 

/** POST /api/v1/reports/analyze (Endpoint interno para ML/AI) */
router.post('/analyze', authenticateJWT, analyzeImageController); // Uso de AI/ML API [cite: 54, 55, 27]

// Rutas de Service Desk y Administrador
/** PUT/PATCH /api/v1/reports/:id/status (Actualizar estado: 'assigned', 'in-progress', 'closed') */
router.patch('/:id/status', authenticateJWT, authorizeRoles(['service_desk', 'admin']), validateStatusUpdate, updateReportStatusController); // Service Desk [cite: 60]

/** POST /api/v1/reports/:id/share (Compartir reporte por email) */
router.post('/:id/share', authenticateJWT, shareReportController); // Todos los roles [cite: 75]

export default router;