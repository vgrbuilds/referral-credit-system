import { Purchase } from '../models/Purchase.js';
import { convertReferral } from './referral.service.js';
import { ApiError } from '../utils/ApiError.js';

export interface PurchaseData {
  userId: string;
  amount?: number; // Optional for now, can be used for future features
}

export const recordFirstPurchase = async (data: PurchaseData): Promise<void> => {
  const { userId } = data;

  // Check if user already has a first purchase record
  const existingPurchase = await Purchase.findOne({ user: userId });
  if (existingPurchase) {
    throw new ApiError(409, 'First purchase already recorded for this user');
  }

  // Create first purchase record
  await Purchase.create({
    user: userId,
    isFirstPurchase: true,
  });

  // Convert referral status and award credit to referrer
  try {
    await convertReferral(userId);
  } catch (error) {
    // If referral conversion fails, log but don't fail the purchase
    console.error('Failed to convert referral:', error);
  }
};

export const getPurchaseStatus = async (userId: string): Promise<{ hasMadeFirstPurchase: boolean }> => {
  const purchase = await Purchase.findOne({ user: userId });
  return {
    hasMadeFirstPurchase: !!purchase,
  };
};