import React from 'react';
import Navbar from '../components/Navbar';

const Analytics: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Analytics</h1>
                <p className="text-gray-600">Analytics features coming soon...</p>
            </div>
        </div>
    );
};

export default Analytics;
