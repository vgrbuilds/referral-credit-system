import { User } from '../models/User.js';
import { Referral } from '../models/Referral.js';
import { ApiError } from '../utils/ApiError.js';

export interface ReferralStats {
  totalReferrals: number;
  convertedReferrals: number;
  pendingReferrals: number;
  totalCreditsEarned: number;
  referralLink: string;
}

export interface ReferralUser {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'converted';
  joinedAt: Date;
}

export const getReferralStats = async (userId: string): Promise<ReferralStats> => {
  // Get user
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Get referral statistics
  const totalReferrals = await Referral.countDocuments({ referrer: userId });
  const convertedReferrals = await Referral.countDocuments({
    referrer: userId,
    status: 'converted'
  });
  const pendingReferrals = totalReferrals - convertedReferrals;

  // Generate referral link (assuming frontend is on localhost:3000)
  const referralLink = `http://localhost:3000/register?ref=${user.referralCode}`;

  return {
    totalReferrals,
    convertedReferrals,
    pendingReferrals,
    totalCreditsEarned: user.credits,
    referralLink,
  };
};

export const getReferredUsers = async (userId: string): Promise<ReferralUser[]> => {
  // Get all referrals for this user
  const referrals = await Referral.find({ referrer: userId })
    .populate('referredUser', 'name email createdAt')
    .sort({ createdAt: -1 });

  return referrals.map(referral => ({
    id: (referral.referredUser as any)._id.toString(),
    name: (referral.referredUser as any).name,
    email: (referral.referredUser as any).email,
    status: referral.status,
    joinedAt: (referral.referredUser as any).createdAt,
  }));
};

export const awardReferralCredit = async (userId: string, creditAmount: number = 10): Promise<void> => {
  // Find user
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Update user credits
  user.credits += creditAmount;
  await user.save();
};

export const convertReferral = async (referredUserId: string): Promise<void> => {
  // Find the referral record
  const referral = await Referral.findOne({ referredUser: referredUserId });
  if (!referral) {
    throw new ApiError(404, 'Referral record not found');
  }

  // Update status to converted
  referral.status = 'converted';
  await referral.save();

  // Award 2 credits to referrer
  await awardReferralCredit(referral.referrer.toString(), 2);

  // Award 2 credits to referred user
  await awardReferralCredit(referredUserId, 2);
};