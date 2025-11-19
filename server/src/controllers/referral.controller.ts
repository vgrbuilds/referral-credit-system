import { Request, Response, NextFunction } from 'express';
import { getReferralStats, getReferredUsers } from '../services/referral.service.js';
import { ApiError } from '../utils/ApiError.js';

export const getReferralStatistics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'User not authenticated');
    }

    const stats = await getReferralStats(req.user.userId);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

export const getReferredUsersList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'User not authenticated');
    }

    const referredUsers = await getReferredUsers(req.user.userId);

    res.status(200).json({
      success: true,
      data: referredUsers,
    });
  } catch (error) {
    next(error);
  }
};