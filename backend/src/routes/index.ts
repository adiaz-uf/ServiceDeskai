import { Router } from 'express';

import authRoutes from './authRoutes';
import officeRoutes from './officeRoutes';
// import ticketRoutes from './ticketRoutes'; 

const router = Router();


router.use('/auth', authRoutes);
router.use('/offices', officeRoutes);
// router.use('/tickets', ticketRoutes); 


export default router;