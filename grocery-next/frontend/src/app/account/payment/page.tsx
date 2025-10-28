'use client';

import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { PaymentCard } from '../../../components/account/PaymentCard';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { EmptyState } from '../../../components/common/EmptyState';
import { CreditCard } from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'netbanking' | 'wallet';
  name: string;
  details: string;
  expiry?: string;
  isDefault: boolean;
}

export default function PaymentMethodsPage() {
  const { user } = useAuth();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      name: 'Visa ending in 1234',
      details: '**** **** **** 1234',
      expiry: '12/25',
      isDefault: true,
    },
    {
      id: '2',
      type: 'upi',
      name: 'UPI ID',
      details: 'user@upi',
      isDefault: false,
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [newMethod, setNewMethod] = useState<Omit<PaymentMethod, 'id' | 'isDefault'>>({
    type: 'card',
    name: '',
    details: '',
    expiry: '',
  });

  const handleAddMethod = () => {
    // In a real app, this would make an API call
    const method: PaymentMethod = {
      ...newMethod,
      id: `pm_${Date.now()}`,
      isDefault: paymentMethods.length === 0,
    };
    
    setPaymentMethods([...paymentMethods, method]);
    setNewMethod({
      type: 'card',
      name: '',
      details: '',
      expiry: '',
    });
    setIsModalOpen(false);
  };

  const handleEditMethod = (method: PaymentMethod) => {
    setEditingMethod(method);
    setNewMethod({
      type: method.type,
      name: method.name,
      details: method.details,
      expiry: method.expiry || '',
    });
    setIsModalOpen(true);
  };

  const handleUpdateMethod = () => {
    if (!editingMethod) return;
    
    // In a real app, this would make an API call
    const updatedMethods = paymentMethods.map(pm => 
      pm.id === editingMethod.id 
        ? { ...editingMethod, ...newMethod } 
        : pm
    );
    
    setPaymentMethods(updatedMethods);
    setEditingMethod(null);
    setNewMethod({
      type: 'card',
      name: '',
      details: '',
      expiry: '',
    });
    setIsModalOpen(false);
  };

  const handleDeleteMethod = (methodId: string) => {
    // In a real app, this would make an API call
    const updatedMethods = paymentMethods.filter(pm => pm.id !== methodId);
    setPaymentMethods(updatedMethods);
  };

  const handleSetDefault = (methodId: string) => {
    // In a real app, this would make an API call
    const updatedMethods = paymentMethods.map(pm => ({
      ...pm,
      isDefault: pm.id === methodId,
    }));
    
    setPaymentMethods(updatedMethods);
  };

  if (!user) {
    return null; // Handled by layout
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          Add Payment Method
        </Button>
      </div>
      
      {paymentMethods.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paymentMethods.map((method) => (
            <PaymentCard
              key={method.id}
              method={method}
              onEdit={handleEditMethod}
              onDelete={handleDeleteMethod}
              onSetDefault={handleSetDefault}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No payment methods yet"
          description="Add your payment methods to make checkout faster"
          actionText="Add Payment Method"
          onAction={() => setIsModalOpen(true)}
          icon={<CreditCard className="h-12 w-12 text-gray-400" />}
        />
      )}
      
      {/* Add/Edit Payment Method Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMethod(null);
          setNewMethod({
            type: 'card',
            name: '',
            details: '',
            expiry: '',
          });
        }}
        title={editingMethod ? "Edit Payment Method" : "Add New Payment Method"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method Type
            </label>
            <select
              value={newMethod.type}
              onChange={(e) => setNewMethod({ ...newMethod, type: e.target.value as 'card' | 'upi' | 'netbanking' | 'wallet' })}
              className="input-field w-full"
              aria-label="Payment method type"
            >
              <option value="card">Credit/Debit Card</option>
              <option value="upi">UPI</option>
              <option value="netbanking">Net Banking</option>
              <option value="wallet">Wallet</option>
            </select>
          </div>
          
          <Input
            label="Name"
            value={newMethod.name}
            onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
            placeholder="e.g. Visa ending in 1234"
            required
          />
          
          <Input
            label={newMethod.type === 'card' ? 'Card Number' : newMethod.type === 'upi' ? 'UPI ID' : 'Details'}
            value={newMethod.details}
            onChange={(e) => setNewMethod({ ...newMethod, details: e.target.value })}
            placeholder={newMethod.type === 'card' ? '1234 5678 9012 3456' : newMethod.type === 'upi' ? 'user@upi' : ''}
            required
          />
          
          {newMethod.type === 'card' && (
            <Input
              label="Expiry Date"
              value={newMethod.expiry}
              onChange={(e) => setNewMethod({ ...newMethod, expiry: e.target.value })}
              placeholder="MM/YY"
            />
          )}
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={editingMethod ? handleUpdateMethod : handleAddMethod}
              disabled={!newMethod.name || !newMethod.details}
            >
              {editingMethod ? 'Update Method' : 'Add Method'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}