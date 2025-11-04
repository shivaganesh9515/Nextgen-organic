import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '../../ui/avatar';

interface Vendor {
  id: string;
  name: string;
  sales: number;
  rating: number;
}

interface TopVendorsCardProps {
  vendors: Vendor[];
}

export default function TopVendorsCard({ vendors }: TopVendorsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Vendors</CardTitle>
        <CardDescription>Highest performing vendors on the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {vendors.map((vendor) => (
            <div key={vendor.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>{vendor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{vendor.name}</p>
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-500 ml-1">{vendor.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">${vendor.sales.toFixed(2)}</p>
                <p className="text-sm text-gray-500">in sales</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}