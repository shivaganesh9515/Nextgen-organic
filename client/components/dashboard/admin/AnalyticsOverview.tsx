import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AnalyticsOverviewProps {
  data: {
    name: string;
    value: number;
  }[];
}

export default function AnalyticsOverview({ data }: AnalyticsOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Overview</CardTitle>
        <CardDescription>Key metrics across the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" name="Value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}