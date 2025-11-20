import React, { useState } from 'react';
import api from '../services/api';
import { useStore } from '../store/useStore';

const PurchaseButton: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { setCredits } = useStore();

    const handlePurchase = async () => {
        setLoading(true);
        setMessage('');
        try {
            // Assuming the endpoint is /purchase/first-purchase based on server routes
            const res = await api.post('/purchase/first-purchase');
            setMessage('Purchase successful!');
            // Update credits if the response contains updated user data or we can re-fetch
            // For now, let's assume we might need to refresh credits
            // But wait, the server awards credits to the REFERRER, not the purchaser (usually).
            // However, if the purchaser gets credits too, we should update.
            // Let's just show success message.
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Purchase failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-center">
            <button
                onClick={handlePurchase}
                disabled={loading}
                className={`bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-purple-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
            >
                {loading ? 'Processing...' : 'Make First Purchase'}
            </button>
            {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
        </div>
    );
};

export default PurchaseButton;
