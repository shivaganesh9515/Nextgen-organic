'use client';

import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Address } from '../../../lib/types';
import { AddressCard } from '../../../components/account/AddressCard';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { EmptyState } from '../../../components/common/EmptyState';
import { MapPin } from 'lucide-react';

export default function AddressesPage() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>(user?.addresses || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id' | 'isDefault'>>({
    type: 'home',
    name: '',
    phone: '',
    address: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleAddAddress = () => {
    // In a real app, this would make an API call
    const address: Address = {
      ...newAddress,
      id: `addr_${Date.now()}`,
      isDefault: addresses.length === 0,
    };
    
    setAddresses([...addresses, address]);
    setNewAddress({
      type: 'home',
      name: '',
      phone: '',
      address: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
    });
    setIsModalOpen(false);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setNewAddress({
      type: address.type,
      name: address.name,
      phone: address.phone,
      address: address.address,
      addressLine2: address.addressLine2 || '',
      city: address.city,
      state: address.state,
      pincode: address.pincode,
    });
    setIsModalOpen(true);
  };

  const handleUpdateAddress = () => {
    if (!editingAddress) return;
    
    // In a real app, this would make an API call
    const updatedAddresses = addresses.map(addr => 
      addr.id === editingAddress.id 
        ? { ...editingAddress, ...newAddress } 
        : addr
    );
    
    setAddresses(updatedAddresses);
    setEditingAddress(null);
    setNewAddress({
      type: 'home',
      name: '',
      phone: '',
      address: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
    });
    setIsModalOpen(false);
  };

  const handleDeleteAddress = (addressId: string) => {
    // In a real app, this would make an API call
    const updatedAddresses = addresses.filter(addr => addr.id !== addressId);
    setAddresses(updatedAddresses);
  };

  const handleSetDefault = (addressId: string) => {
    // In a real app, this would make an API call
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId,
    }));
    
    setAddresses(updatedAddresses);
  };

  if (!user) {
    return null; // Handled by layout
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Addresses</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          Add Address
        </Button>
      </div>
      
      {addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={handleEditAddress}
              onDelete={handleDeleteAddress}
              onSetDefault={handleSetDefault}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No addresses yet"
          description="Add your delivery addresses to make checkout faster"
          actionText="Add Address"
          onAction={() => setIsModalOpen(true)}
          icon={<MapPin className="h-12 w-12 text-gray-400" />}
        />
      )}
      
      {/* Add/Edit Address Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAddress(null);
          setNewAddress({
            type: 'home',
            name: '',
            phone: '',
            address: '',
            addressLine2: '',
            city: '',
            state: '',
            pincode: '',
          });
        }}
        title={editingAddress ? "Edit Address" : "Add New Address"}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={newAddress.name}
              onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
              required
            />
            <Input
              label="Phone Number"
              value={newAddress.phone}
              onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
              required
            />
          </div>
          
          <Input
            label="Address Line 1"
            value={newAddress.address}
            onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
            required
          />
          
          <Input
            label="Address Line 2 (Optional)"
            value={newAddress.addressLine2}
            onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="City"
              value={newAddress.city}
              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
              required
            />
            <Input
              label="State"
              value={newAddress.state}
              onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
              required
            />
            <Input
              label="Pincode"
              value={newAddress.pincode}
              onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
              required
            />
          </div>
          
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="addressType"
                checked={newAddress.type === 'home'}
                onChange={() => setNewAddress({ ...newAddress, type: 'home' })}
                className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">Home</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="addressType"
                checked={newAddress.type === 'work'}
                onChange={() => setNewAddress({ ...newAddress, type: 'work' })}
                className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">Work</span>
            </label>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={editingAddress ? handleUpdateAddress : handleAddAddress}
              disabled={!newAddress.name || !newAddress.phone || !newAddress.address || !newAddress.city || !newAddress.state || !newAddress.pincode}
            >
              {editingAddress ? 'Update Address' : 'Add Address'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}