'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Badge from '@/components/shared/Badge';

interface Vendor {
  id: string;
  name: string;
  email: string;
  storeName: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface PendingVendorsTableProps {
  vendors: Vendor[];
  onReview: (id: string) => void;
}

export default function PendingVendorsTable({ vendors, onReview }: PendingVendorsTableProps) {
  const getStatusVariant = (status: Vendor['status']) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vendor</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Store Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor.id}>
              <TableCell className="font-medium">{vendor.name}</TableCell>
              <TableCell>{vendor.email}</TableCell>
              <TableCell>{vendor.storeName}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(vendor.status)}>
                  {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" onClick={() => onReview(vendor.id)}>
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