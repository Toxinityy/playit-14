import React from 'react';

export default function WasteIndicator({ status = 'N/A' }) {
  const statusInfo = {
    low: {
      color: 'text-green-600',
      label: 'Low',
      description: 'Food waste is within acceptable limits.',
    },
    medium: {
      color: 'text-yellow-600',
      label: 'Medium',
      description: 'Food waste is moderate and may need attention.',
    },
    high: {
      color: 'text-red-600',
      label: 'High',
      description: 'High food waste levels, immediate action recommended.',
    },
    'N/A': {
      color: 'text-gray-500',
      label: 'N/A',
      description: 'No food waste data available.',
    },
  };

  const { color, label, description } = statusInfo[status] || statusInfo['N/A'];

  return (
    <div className="text-center p-4">
      <h3 className="text-l font-bold mb-2">Food Waste Indicator</h3>
      <div className={`text-4xl font-extrabold ${color} mb-2`}>{label}</div>
      <p className="text-base text-gray-600">{description}</p>
    </div>
  );
}
