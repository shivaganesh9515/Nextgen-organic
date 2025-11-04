import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Badge from '@/components/shared/Badge';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
}

interface RecentOrdersProps {
  orders: Order[];
}

export default function RecentOrders({ orders }: RecentOrdersProps) {
  const getStatusVariant = (status: Order['status']) => {
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
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Your latest orders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between py-2 border-b last:border-0">
              <div>
                <p className="font-medium">Order #{order.id}</p>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant={getStatusVariant(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
                <div className="text-right">
                  <p className="font-medium">${order.total.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{order.items} items</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}