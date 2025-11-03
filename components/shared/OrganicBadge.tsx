'use client';

import React from 'react';

interface OrganicBadgeProps {
  type: 'organic' | 'fresh' | 'local' | 'new' | 'sale';
  children: React.ReactNode;
}

export default function OrganicBadge({ type, children }: OrganicBadgeProps) {
  const getBadgeStyle = () => {
    switch(type) {
      case 'organic':
        return 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300';
      case 'fresh':
        return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300';
      case 'local':
        return 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300';
      case 'new':
        return 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300';
      case 'sale':
        return 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getBadgeStyle()}`}>
      {children}
    </span>
  );
}