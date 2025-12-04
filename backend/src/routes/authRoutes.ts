import { Router } from 'express';
import { registerController } 
from '../controllers/authController';

import { validateRegisterCredentials, validateLoginCredentials } from '../middleware/validateCredentials';

const router = Router();

// POST /api/v1/auth/register
router.post('/register', validateRegisterCredentials, registerController);

// POST /api/v1/auth/login
//router.post('/login', validateLoginCredentials, loginController);

// POST /api/v1/auth/logout
//router.post('/logout', logoutController);

export default router;
