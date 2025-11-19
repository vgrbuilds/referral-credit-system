import { Request, Response, NextFunction } from 'express';
import { register, login, RegisterData, LoginData } from '../services/auth.service.js';
import { ApiError } from '../utils/ApiError.js';

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password, referralCode }: RegisterData = req.body;

    const result = await register({ name, email, password, referralCode });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password }: LoginData = req.body;

    const result = await login({ email, password });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // User info is already attached by auth middleware
    if (!req.user) {
      throw new ApiError(401, 'User not authenticated');
    }

    res.status(200).json({
      success: true,
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    next(error);
  }
};