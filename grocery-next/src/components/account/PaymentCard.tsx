'use client';

import { CreditCard, Trash2, Pencil } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'netbanking' | 'wallet';
  name: string;
  details: string;
  expiry?: string;
  isDefault: boolean;
}

interface PaymentCardProps {
  method: PaymentMethod;
  onEdit: (method: PaymentMethod) => void;
  onDelete: (methodId: string) => void;
  onSetDefault?: (methodId: string) => void;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({
  method,
  onEdit,
  onDelete,
  onSetDefault,
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'card':
        return <CreditCard className="h-5 w-5" />;
      case 'upi':
        return <div className="text-lg font-bold">UPI</div>;
      case 'netbanking':
        return <div className="text-lg font-bold">NB</div>;
      case 'wallet':
        return <div className="text-lg font-bold">W</div>;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'card':
        return 'Card';
      case 'upi':
        return 'UPI';
      case 'netbanking':
        return 'Net Banking';
      case 'wallet':
        return 'Wallet';
      default:
        return type;
    }
  };

  return (
    <div className="card">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-100 text-gray-600">
            {getTypeIcon(method.type)}
          </div>
          <div className="ml-3">
            <div className="flex items-center">
              <h3 className="font-medium text-gray-900">{method.name}</h3>
              {method.isDefault && (
                <Badge variant="primary" className="ml-2">
                  Default
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-500">
              {getTypeLabel(method.type)} • {method.details}
            </p>
            {method.expiry && (
              <p className="text-sm text-gray-500">Expires {method.expiry}</p>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(method)}
            className="p-2 text-gray-400 hover:text-gray-500"
            aria-label="Edit payment method"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(method.id)}
            className="p-2 text-gray-400 hover:text-red-500"
            aria-label="Delete payment method"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!method.isDefault && onSetDefault && (
        <div className="mt-4">
          <button
            onClick={() => onSetDefault(method.id)}
            className="text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            Set as Default
          </button>
        </div>
      )}
    </div>
  );
};