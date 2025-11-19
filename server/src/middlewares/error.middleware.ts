import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError.js';
import { env } from '../config/env.js';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal server error';

  if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  // Log error in development
  if (env.NODE_ENV === 'development') {
    console.error(error);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  const error = new ApiError(404, `Route ${req.originalUrl} not found`);
  next(error);
};