'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would send this to your API
    console.log('Subscribing email:', email);
    setSubmitted(true);
    
    // Reset form
    setEmail('');
    
    // Reset submitted state after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="py-16 bg-green-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter for the latest updates, special offers, and grocery tips.
        </p>
        
        {submitted ? (
          <div className="max-w-md mx-auto">
            <div className="bg-white text-green-600 rounded-full p-3 inline-block">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <p className="mt-4 text-lg">Thank you for subscribing!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow rounded-r-none text-gray-900"
            />
            <Button type="submit" className="rounded-l-none">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}