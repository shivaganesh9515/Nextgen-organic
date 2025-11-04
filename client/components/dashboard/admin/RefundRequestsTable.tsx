'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Badge from '@/components/shared/Badge';

interface RefundRequest {
  id: string;
  orderId: string;
  customer: string;
  amount: number;
  reason: string;
  status: 'requested' | 'approved' | 'rejected' | 'completed';
  date: string;
}

interface RefundRequestsTableProps {
  requests: RefundRequest[];
  onReview: (id: string) => void;
}

export default function RefundRequestsTable({ requests, onReview }: RefundRequestsTableProps) {
  const getStatusVariant = (status: RefundRequest['status']) => {
    switch (status) {
      case 'requested': return 'warning';
      case 'approved': return 'info';
      case 'rejected': return 'error';
      case 'completed': return 'success';
      default: return 'default';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Request ID</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="font-medium">#{request.id}</TableCell>
              <TableCell>#{request.orderId}</TableCell>
              <TableCell>{request.customer}</TableCell>
              <TableCell>${request.amount.toFixed(2)}</TableCell>
              <TableCell>{request.reason}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(request.status)}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{request.date}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" onClick={() => onReview(request.id)}>
                  Review
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}