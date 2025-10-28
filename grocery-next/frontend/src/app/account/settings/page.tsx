'use client';

import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export default function SettingsPage() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isPasswordSaving, setIsPasswordSaving] = useState(false);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // In a real app, this would make an API call
    setTimeout(() => {
      if (user) {
        updateUser({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        });
      }
      setIsSaving(false);
    }, 1000);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match");
      return;
    }
    
    setIsPasswordSaving(true);
    
    // In a real app, this would make an API call
    setTimeout(() => {
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setIsPasswordSaving(false);
      alert('Password updated successfully');
    }, 1000);
  };

  if (!user) {
    return null; // Handled by layout
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
      
      {/* Profile Settings */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          
          <Input
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          
          <div className="pt-4">
            <Button type="submit" isLoading={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
      
      {/* Password Settings */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Change Password</h3>
        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            required
          />
          
          <Input
            label="New Password"
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            required
          />
          
          <Input
            label="Confirm New Password"
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
            required
          />
          
          <div className="pt-4">
            <Button type="submit" isLoading={isPasswordSaving}>
              {isPasswordSaving ? 'Updating...' : 'Update Password'}
            </Button>
          </div>
        </form>
      </div>
      
      {/* Account Deletion */}
      <div className="card border-red-200">
        <h3 className="text-lg font-semibold mb-4">Delete Account</h3>
        <p className="text-gray-600 mb-4">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <Button variant="danger">
          Delete Account
        </Button>
      </div>
    </div>
  );
}