import { Router } from 'express';

import authRoutes from './authRoutes';
import officeRoutes from './officeRoutes';
import reportRoutes from './reportRoutes';

const router = Router();


router.use('/auth', authRoutes);
router.use('/offices', officeRoutes);
router.use('/reports', reportRoutes);


export default router;