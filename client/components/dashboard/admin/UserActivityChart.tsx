'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface UserActivityChartProps {
  data: {
    date: string;
    newUsers: number;
    activeUsers: number;
  }[];
}

export default function UserActivityChart({ data }: UserActivityChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Activity</CardTitle>
        <CardDescription>New and active users over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="newUsers" 
                stackId="1" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                name="New Users"
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="activeUsers" 
                stackId="2" 
                stroke="#10b981" 
                fill="#10b981" 
                name="Active Users"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}