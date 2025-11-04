import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PayoutStatusProps {
  availableBalance: number;
  pendingBalance: number;
  lastPayout: string;
  onWithdraw: () => void;
}

export default function PayoutStatus({
  availableBalance,
  pendingBalance,
  lastPayout,
  onWithdraw,
}: PayoutStatusProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payout Status</CardTitle>
        <CardDescription>Your earnings and withdrawals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-500">Available Balance:</span>
            <span className="text-xl font-bold text-green-600">${availableBalance.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Pending Balance:</span>
            <span className="text-lg">${pendingBalance.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Last Payout:</span>
            <span>{lastPayout}</span>
          </div>
          <Button className="w-full" onClick={onWithdraw}>
            Withdraw Funds
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}