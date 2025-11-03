import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface VendorStatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down';
  trendValue?: string;
}

export default function VendorStatsCard({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
}: VendorStatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {icon && (
          <div className="h-4 w-4 text-muted-foreground">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
        {trend && trendValue && (
          <div className={`text-xs mt-1 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? '↑' : '↓'} {trendValue}
          </div>
        )}
      </CardContent>
    </Card>
  );
}