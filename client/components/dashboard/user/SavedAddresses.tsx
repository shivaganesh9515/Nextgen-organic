'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

interface SavedAddressesProps {
  addresses: Address[];
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
  onSetDefault: (id: string) => void;
}

export default function SavedAddresses({
  addresses,
  onEdit,
  onRemove,
  onSetDefault,
}: SavedAddressesProps) {
  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <Card key={address.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{address.label}</CardTitle>
                {address.isDefault && (
                  <CardDescription>Default Address</CardDescription>
                )}
              </div>
              {!address.isDefault && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onSetDefault(address.id)}
                >
                  Set as Default
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              {address.street}
              <br />
              {address.city}, {address.state} {address.zipCode}
              <br />
              {address.country}
            </p>
            <div className="flex space-x-2 mt-4">
              <Button variant="outline" size="sm" onClick={() => onEdit(address.id)}>
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={() => onRemove(address.id)}>
                Remove
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}