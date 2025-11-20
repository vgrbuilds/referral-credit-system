import React from 'react';

interface StatsCardProps {
  title: string;
  value: number;
  icon?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        </div>
        {icon && (
          <div className="p-3 bg-blue-50 rounded-lg text-2xl">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
