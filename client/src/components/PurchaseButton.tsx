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
        <div className="text-center mt-12">
            <button
                onClick={handlePurchase}
                disabled={loading}
                className={`
          group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600
          ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:from-purple-700 hover:to-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5'}
        `}
            >
                {loading ? (
                    <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                    </span>
                ) : (
                    'Make First Purchase'
                )}
            </button>
            {message && (
                <p className={`mt-4 text-sm font-medium ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default PurchaseButton;
