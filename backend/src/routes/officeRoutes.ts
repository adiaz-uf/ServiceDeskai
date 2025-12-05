// src/routes/adminRouter.ts
import { Router } from 'express';
import { createOfficeController, getAllOfficesController } from '../controllers/officeController';
import { generateReportsController } from '../controllers/adminController';
import { authenticateJWT, authorizeRoles } from '../middleware/authMiddleware';
import { validateNewOffice } from '../middleware/validationMiddleware';

const router = Router();

// Rutas de Office (requiere JWT)
/** POST /api/v1/offices (Crear nueva oficina) */
router.post('/', authenticateJWT, authorizeRoles(['admin']), validateNewOffice, createOfficeController);

/** GET /api/v1/offices (Ver todas las oficinas) */
router.get('/', authenticateJWT, getAllOfficesController);

/** GET /api/v1/admin/reports/summary (Generar reportes del sistema) TODO? */
router.get('/reports/summary', authenticateJWT, authorizeRoles(['admin']), generateReportsController);

export default router;