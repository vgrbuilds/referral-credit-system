import React from 'react';
import Navbar from '../components/Navbar';

const Analytics: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-6 py-12">
                <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center">
                    <div className="text-6xl mb-6">📊</div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Analytics Dashboard</h1>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Detailed analytics and insights about your referrals and earnings are coming soon.
                        Stay tuned for updates!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
