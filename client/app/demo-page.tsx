'use client';

import React from 'react';
import { Navbar, HomePage, VendorRecruitmentCTA } from '@/components';

export default function DemoPage() {
  // Mock user data for demonstration
  const user = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    userType: 'customer' as const
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout clicked');
  };

  return (
    <div>
      {/* Using the new Navbar component */}
      <Navbar user={user} onLogout={handleLogout} />
      
      {/* Using the new HomePage component */}
      <HomePage />
      
      {/* Using the Vendor Recruitment CTA */}
      <VendorRecruitmentCTA />
    </div>
  );
}