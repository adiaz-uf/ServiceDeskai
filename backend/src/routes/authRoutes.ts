import { Router } from 'express';
import { registerController, loginController, logoutController } 
from '../controllers/authController';

import { validateRegisterCredentials, validateLoginCredentials } from '../middleware/validateCredentials';
import { authenticateJWT, authorizeRoles } from '../middleware/authMiddleware';

const router = Router();

// POST /api/v1/auth/register
router.post('/register', validateRegisterCredentials, authenticateJWT, authorizeRoles(['admin']), registerController);

// POST /api/v1/auth/login
router.post('/login', validateLoginCredentials, loginController);

// POST /api/v1/auth/logout
router.post('/logout', authenticateJWT, logoutController);

export default router;
