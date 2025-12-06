import { Router } from 'express';
import { getProfileController, updateProfileController, uploadProfilePhotoController } 
from '../controllers/profileController';
import { createUserController, getAllUsersController } 
from '../controllers/userController';
import { authenticateJWT, authorizeRoles } from '../middleware/authMiddleware';
import { validateProfileUpdate, validateNewUser } from '../middleware/validationMiddleware';

const router = Router();

// Rutas de Usuario (requiere JWT)

/** GET /api/v1/profile */
router.get('/', authenticateJWT, getProfileController);

/** PUT/PATCH /api/v1/profile */
router.put('/', authenticateJWT, validateProfileUpdate, updateProfileController);


// Rutas de Administrador (requiere JWT y rol 'admin')
/** POST /api/v1/profile/users (Crear nuevo usuario) */
router.post('/users', authenticateJWT, authorizeRoles(['admin']), validateNewUser, createUserController);

/** GET /api/v1/profile/users (Ver todos los usuarios) */
router.get('/users', authenticateJWT, authorizeRoles(['admin']), getAllUsersController);

export default router;