import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Badge from '@/components/shared/Badge';

interface ProductStatusCardProps {
  name: string;
  status: 'pending' | 'approved' | 'rejected';
  price: number;
  stock: number;
  sales: number;
}

export default function ProductStatusCard({
  name,
  status,
  price,
  stock,
  sales,
}: ProductStatusCardProps) {
  const getStatusVariant = () => {
    switch (status) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge variant={getStatusVariant()}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Price:</span>
            <span className="font-bold">${price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Stock:</span>
            <span>{stock}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Sales:</span>
            <span>{sales}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}