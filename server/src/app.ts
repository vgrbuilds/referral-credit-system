import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import purchaseRoutes from './routes/purchase.routes.js';
import referralRoutes from './routes/referral.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/referral', referralRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
