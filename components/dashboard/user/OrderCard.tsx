import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Badge from '@/components/shared/Badge';

interface OrderCardProps {
  id: string;
  date: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
  onTrackOrder?: () => void;
  onViewDetails?: () => void;
}

export default function OrderCard({
  id,
  date,
  status,
  total,
  items,
  onTrackOrder,
  onViewDetails,
}: OrderCardProps) {
  const getStatusVariant = () => {
    switch (status) {
      case 'pending': return 'warning';
      case 'confirmed': return 'info';
      case 'shipped': return 'info';
      case 'delivered': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Order #{id}</CardTitle>
            <CardDescription>{date}</CardDescription>
          </div>
          <Badge variant={getStatusVariant()}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Items:</span>
            <span>{items}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Total:</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        {onTrackOrder && (
          <Button variant="outline" size="sm" onClick={onTrackOrder}>
            Track Order
          </Button>
        )}
        {onViewDetails && (
          <Button size="sm" onClick={onViewDetails}>
            View Details
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}