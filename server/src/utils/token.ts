import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export interface TokenPayload {
  userId: string;
  email: string;
}

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET!, { expiresIn: '7d' });
};

export const verifyToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET!);
    if (typeof decoded === 'object' && decoded !== null && 'userId' in decoded && 'email' in decoded) {
      return decoded as TokenPayload;
    }
    throw new Error('Invalid token payload');
  } catch (error) {
    throw new Error('Invalid token');
  }
};
