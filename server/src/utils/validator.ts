import { ApiError } from './ApiError.js';
import validator from 'validator';

export const validateEmail = (email: string): boolean => {
  return validator.isEmail(email);
};

export const validatePassword = (password: string): boolean => {
  // At least 8 characters, one uppercase, one lowercase, one number
  return validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  });
};

export const validateReferralCode = (code: string): boolean => {
  // Alphanumeric, 8-16 characters
  return validator.isAlphanumeric(code) && validator.isLength(code, { min: 8, max: 16 });
};

export const validateRequired = (value: any, fieldName: string): void => {
  if (value === undefined || value === null || (typeof value === 'string' && validator.isEmpty(value.trim()))) {
    throw new ApiError(400, `${fieldName} is required`);
  }
};

export const validateEmailFormat = (email: string): void => {
  if (!validateEmail(email)) {
    throw new ApiError(400, 'Invalid email format');
  }
};

export const validatePasswordStrength = (password: string): void => {
  if (!validatePassword(password)) {
    throw new ApiError(400, 'Password must be at least 8 characters with uppercase, lowercase, and number');
  }
};