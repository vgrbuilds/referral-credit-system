import { Router } from 'express';
import { makeFirstPurchase, checkPurchaseStatus } from '../controllers/purchase.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

// All purchase routes require authentication
router.post('/first-purchase', authenticate, makeFirstPurchase);
router.get('/status', authenticate, checkPurchaseStatus);

export default router;