import { Router } from 'express';
import { getReferralStatistics, getReferredUsersList } from '../controllers/referral.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

// All referral routes require authentication
router.get('/stats', authenticate, getReferralStatistics);
router.get('/referred-users', authenticate, getReferredUsersList);

export default router;