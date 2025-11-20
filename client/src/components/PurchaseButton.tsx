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
            // Sending amount as required by the server
            const res = await api.post('/purchase/first-purchase', { amount: 100 });
            setMessage('Purchase successful!');
            // Ideally we should update credits here, but for now we just show success
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
