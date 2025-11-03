'use client';

import React from 'react';

interface OrganicCardProps {
  variant?: 'default' | 'hover-lift' | 'gradient-border';
  children: React.ReactNode;
  className?: string;
}

export default function OrganicCard({ 
  variant = 'default', 
  children, 
  className = '' 
}: OrganicCardProps) {
  const getCardStyle = () => {
    switch(variant) {
      case 'hover-lift':
        return 'border border-green-100 bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 rounded-2xl';
      case 'gradient-border':
        return 'border-2 border-transparent bg-gradient-to-r from-green-500 to-emerald-500 p-0.5 rounded-2xl';
      default:
        return 'border border-green-100 bg-white shadow-sm rounded-2xl';
    }
  };

  const contentClasses = variant === 'gradient-border' 
    ? 'bg-white rounded-[calc(1rem-2px)] p-6' 
    : 'p-6';

  return (
    <div className={`${getCardStyle()} ${className}`}>
      <div className={contentClasses}>
        {children}
      </div>
    </div>
  );
}