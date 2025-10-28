'use client';

import { Address } from '../../lib/types';
import { MapPin, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (addressId: string) => void;
  onSetDefault?: (addressId: string) => void;
}

export const AddressCard: React.FC<AddressCardProps> = ({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}) => {
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'home':
        return 'Home';
      case 'work':
        return 'Work';
      default:
        return 'Other';
    }
  };

  return (
    <div className="card">
      <div className="flex justify-between">
        <div>
          <div className="flex items-center">
            <h3 className="font-medium text-gray-900">{address.name}</h3>
            {address.isDefault && (
              <Badge variant="primary" className="ml-2">
                Default
              </Badge>
            )}
          </div>
          <div className="mt-1 flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{getTypeLabel(address.type)}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(address)}
            className="p-2 text-gray-400 hover:text-gray-500"
            aria-label="Edit address"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(address.id)}
            className="p-2 text-gray-400 hover:text-red-500"
            aria-label="Delete address"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>{address.address}</p>
        {address.addressLine2 && <p>{address.addressLine2}</p>}
        <p>
          {address.city}, {address.state} {address.pincode}
        </p>
        <p className="mt-1">{address.phone}</p>
      </div>

      {!address.isDefault && onSetDefault && (
        <div className="mt-4">
          <button
            onClick={() => onSetDefault(address.id)}
            className="text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            Set as Default
          </button>
        </div>
      )}
    </div>
  );
};