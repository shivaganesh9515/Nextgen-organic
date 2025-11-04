'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

interface VendorRegisterFormProps {
  onRegister: (data: {
    name: string;
    email: string;
    password: string;
    storeName: string;
    storeDescription: string;
  }) => void;
  loading: boolean;
}

export default function VendorRegisterForm({ onRegister, loading }: VendorRegisterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    storeName: '',
    storeDescription: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    onRegister({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      storeName: formData.storeName,
      storeDescription: formData.storeDescription,
    });
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="storeName">Store Name</Label>
          <Input
            id="storeName"
            name="storeName"
            type="text"
            required
            value={formData.storeName}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="storeDescription">Store Description</Label>
          <Textarea
            id="storeDescription"
            name="storeDescription"
            rows={3}
            placeholder="Tell us about your store and the products you sell"
            value={formData.storeDescription}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Button
          type="submit"
          disabled={loading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {loading ? 'Submitting...' : 'Submit Registration'}
        </Button>
      </div>
      
      <div className="text-sm text-center">
        <Link href="/login" className="font-medium text-green-600 hover:text-green-500">
          Already have an account? Sign in
        </Link>
      </div>
    </form>
  );
}