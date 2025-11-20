import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import CopyLinkButton from './CopyLinkButton';

const ReferralCard: React.FC = () => {
    const { user } = useStore();

    if (!user) return null;

    const referralLink = `${window.location.origin}/register?ref=${user.referralCode}`;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-bold mb-4">Your Referral Link</h2>
            <p className="text-gray-600 mb-4">
                Share this link with your friends to earn credits!
            </p>
            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    readOnly
                    value={referralLink}
                    className="flex-1 p-2 border rounded bg-gray-50 text-gray-700"
                />
                <CopyLinkButton link={referralLink} />
            </div>
        </div>
    );
};

export default ReferralCard;
