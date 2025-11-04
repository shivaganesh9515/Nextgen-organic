import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  maxStock: number;
}

interface InventoryWidgetProps {
  items: InventoryItem[];
}

export default function InventoryWidget({ items }: InventoryWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Status</CardTitle>
        <CardDescription>Low stock alerts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => {
            const percentage = (item.stock / item.maxStock) * 100;
            
            return (
              <div key={item.id}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="text-sm text-gray-500">{item.stock}/{item.maxStock}</span>
                </div>
                <Progress value={percentage} />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}