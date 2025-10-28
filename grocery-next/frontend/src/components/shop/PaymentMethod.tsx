'use client';

import { useState } from 'react';
import { CreditCard, Wallet, Banknote, QrCode } from 'lucide-react';
import { PaymentMethod as PaymentMethodType } from '../../lib/types';
import { Button } from '../ui/Button';

interface PaymentMethodProps {
  selectedMethod: PaymentMethodType | null;
  onSelectMethod: (method: PaymentMethodType) => void;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = ({
  selectedMethod,
  onSelectMethod,
}) => {
  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'upi', name: 'UPI', icon: QrCode },
    { id: 'netbanking', name: 'Net Banking', icon: Banknote },
    { id: 'cod', name: 'Cash on Delivery', icon: Wallet },
  ];

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
      
      <div className="space-y-3">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;
          
          return (
            <div
              key={method.id}
              onClick={() => onSelectMethod(method.id as PaymentMethodType)}
              className={`p-4 border rounded-lg cursor-pointer transition-all flex items-center ${
                isSelected
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <Icon className="h-5 w-5 text-gray-600" />
              <span className="ml-3 font-medium">{method.name}</span>
              {isSelected && (
                <div className="ml-auto w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {selectedMethod === 'card' && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-3">Card Details</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="input-field"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="input-field"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="input-field"
              />
            </div>
          </div>
        </div>
      )}
      
      {selectedMethod === 'upi' && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-3">UPI Details</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              UPI ID
            </label>
            <input
              type="text"
              placeholder="yourname@upi"
              className="input-field"
            />
          </div>
        </div>
      )}
    </div>
  );
};