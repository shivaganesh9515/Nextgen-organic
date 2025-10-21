'use client';

import { useState } from 'react';
import { MapPin, Plus, Check } from 'lucide-react';
import { Address } from '../../lib/types';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';

interface AddressSelectorProps {
  addresses: Address[];
  selectedAddress: Address | null;
  onSelectAddress: (address: Address) => void;
  onAddAddress: (address: Omit<Address, 'id' | 'isDefault'>) => void;
}

export const AddressSelector: React.FC<AddressSelectorProps> = ({
  addresses,
  selectedAddress,
  onSelectAddress,
  onAddAddress,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    onAddAddress(newAddress);
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

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Delivery Address</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-8">
          <MapPin className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No addresses</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding a new delivery address.
          </p>
          <div className="mt-6">
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Add Address
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => {
            const isSelected = selectedAddress?.id === address.id;
            return (
              <div
                key={address.id}
                onClick={() => onSelectAddress(address)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  isSelected
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium">{address.name}</h4>
                      {address.isDefault && (
                        <span className="ml-2 badge badge-primary text-xs">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {address.address}
                      {address.addressLine2 && `, ${address.addressLine2}`}
                      {`, ${address.city}, ${address.state} ${address.pincode}`}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{address.phone}</p>
                  </div>
                  {isSelected && (
                    <div className="flex items-center text-primary-600">
                      <Check className="h-5 w-5" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Address Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Address"
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
              onClick={handleAddAddress}
              disabled={!newAddress.name || !newAddress.phone || !newAddress.address || !newAddress.city || !newAddress.state || !newAddress.pincode}
            >
              Add Address
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};