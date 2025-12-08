import { Router } from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/authMiddleware';
import { getAllOfficesController, createOfficeController } from '../controllers/officeController';
//import { generateReportsController } from '../controllers/adminController';


const router = Router();

// Rutas de Office (requiere JWT)
/** POST /api/v1/offices (Crear nueva oficina) */
router.post('/', authenticateJWT, authorizeRoles(['admin']), createOfficeController);

/** GET /api/v1/offices (Ver todas las oficinas) */
router.get('/', authenticateJWT, getAllOfficesController);



export default router;