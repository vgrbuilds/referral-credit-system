import { Request, Response, NextFunction } from 'express';
import { recordFirstPurchase, getPurchaseStatus, PurchaseData } from '../services/purchase.service.js';
import { ApiError } from '../utils/ApiError.js';

export const makeFirstPurchase = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'User not authenticated');
    }

    const { amount }: { amount?: number } = req.body;

    await recordFirstPurchase({
      userId: req.user.userId,
      amount,
    });

    res.status(200).json({
      success: true,
      message: 'First purchase recorded successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const checkPurchaseStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'User not authenticated');
    }

    const status = await getPurchaseStatus(req.user.userId);

    res.status(200).json({
      success: true,
      data: status,
    });
  } catch (error) {
    next(error);
  }
};