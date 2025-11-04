'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Rating from '@/components/shared/Rating';

interface VendorProfileCardProps {
  name: string;
  description: string;
  rating: number;
  reviewCount: number;
  totalProducts: number;
  totalSales: number;
  joinDate: string;
}

export default function VendorProfileCard({
  name,
  description,
  rating,
  reviewCount,
  totalProducts,
  totalSales,
  joinDate,
}: VendorProfileCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
          <div>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
            <div className="mt-1">
              <Rating rating={rating} reviewCount={reviewCount} />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Products</p>
            <p className="font-medium">{totalProducts}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Sales</p>
            <p className="font-medium">${totalSales.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Member since</p>
            <p className="font-medium">{joinDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Response Rate</p>
            <p className="font-medium">98%</p>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <Button variant="outline" size="sm">
            View Products
          </Button>
          <Button variant="outline" size="sm">
            Contact Vendor
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}