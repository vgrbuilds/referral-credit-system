import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import CopyLinkButton from './CopyLinkButton';

const ReferralCard: React.FC = () => {
    const { user } = useStore();

    if (!user) return null;

    const referralLink = `${window.location.origin}/register?ref=${user.referralCode}`;

    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-8">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Invite Friends & Earn</h2>
                <p className="text-gray-500 mb-8">
                    Share your unique referral link with friends and earn credits for every successful referral.
                </p>

                <div className="flex items-center p-2 bg-gray-50 rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                    <input
                        type="text"
                        readOnly
                        value={referralLink}
                        className="flex-1 bg-transparent border-none focus:ring-0 text-gray-700 px-4 py-2 w-full outline-none"
                    />
                    <CopyLinkButton link={referralLink} />
                </div>
            </div>
        </div>
    );
};

export default ReferralCard;
