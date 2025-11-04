'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface UserSpendAnalyticsProps {
  data: {
    month: string;
    amount: number;
  }[];
}

export default function UserSpendAnalytics({ data }: UserSpendAnalyticsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Analytics</CardTitle>
        <CardDescription>Your monthly spending over the past year</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Amount']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Bar dataKey="amount" fill="#10b981" name="Amount Spent" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}