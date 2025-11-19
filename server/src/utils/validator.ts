import { ApiError } from './ApiError.js';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // At least 8 characters, one uppercase, one lowercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validateReferralCode = (code: string): boolean => {
  // Alphanumeric, 8-16 characters
  const codeRegex = /^[a-zA-Z0-9]{8,16}$/;
  return codeRegex.test(code);
};

export const validateRequired = (value: any, fieldName: string): void => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
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