'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface UserProfileCardProps {
  name: string;
  email: string;
  role: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
}

export default function UserProfileCard({
  name,
  email,
  role,
  joinDate,
  totalOrders,
  totalSpent,
}: UserProfileCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
          <div>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{email}</CardDescription>
            <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              {role}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Member since</p>
            <p className="font-medium">{joinDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="font-medium">{totalOrders}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Spent</p>
            <p className="font-medium">${totalSpent.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Loyalty Points</p>
            <p className="font-medium">450</p>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <Button variant="outline" size="sm">
            Edit Profile
          </Button>
          <Button variant="outline" size="sm">
            View Orders
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}