import { User } from '../models/User.js';
import { Referral } from '../models/Referral.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { generateToken } from '../utils/token.js';
import { validateEmailFormat, validatePasswordStrength, validateRequired } from '../utils/validator.js';
import { ApiError } from '../utils/ApiError.js';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  referralCode?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    referralCode: string;
    credits: number;
  };
  token: string;
}

const generateReferralCode = (): string => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const { name, email, password, referralCode } = data;

  // Validate input
  validateRequired(name, 'Name');
  validateRequired(email, 'Email');
  validateRequired(password, 'Password');
  validateEmailFormat(email);
  validatePasswordStrength(password);

  // Check if user already exists
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new ApiError(409, 'User with this email already exists');
  }

  // Handle referral code if provided
  let referredBy = null;
  if (referralCode) {
    const referrer = await User.findOne({ referralCode });
    if (!referrer) {
      throw new ApiError(400, 'Invalid referral code');
    }
    referredBy = referrer._id;
  }

  // Generate unique referral code
  let userReferralCode: string;
  let codeExists = true;
  do {
    userReferralCode = generateReferralCode();
    const existingCode = await User.findOne({ referralCode: userReferralCode });
    codeExists = !!existingCode;
  } while (codeExists);

  // Hash password
  const passwordHash = await hashPassword(password);

  // Create user
  const user = new User({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    passwordHash,
    referralCode: userReferralCode,
    referredBy,
    credits: 0,
  });

  await user.save();

  // Create referral record if referred
  if (referredBy) {
    await Referral.create({
      referrer: referredBy,
      referredUser: user._id,
      status: 'pending',
    });
  }

  // Generate token
  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
  });

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      referralCode: user.referralCode,
      credits: user.credits,
    },
    token,
  };
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const { email, password } = data;

  // Validate input
  validateRequired(email, 'Email');
  validateRequired(password, 'Password');
  validateEmailFormat(email);

  // Find user
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Check password
  const isPasswordValid = await comparePassword(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Generate token
  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
  });

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      referralCode: user.referralCode,
      credits: user.credits,
    },
    token,
  };
};