import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AdminStatsWidgetProps {
  title: string;
  value: string | number;
  description: string;
  icon?: React.ReactNode;
  change?: string;
}

export default function AdminStatsWidget({
  title,
  value,
  description,
  icon,
  change,
}: AdminStatsWidgetProps) {
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
        {change && (
          <div className="text-xs mt-1 text-green-600">
            {change}
          </div>
        )}
      </CardContent>
    </Card>
  );
}