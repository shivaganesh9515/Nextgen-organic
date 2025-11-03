'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ProductApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: (status: 'approved' | 'rejected', reason?: string) => void;
  productName: string;
  isLoading?: boolean;
}

export default function ProductApprovalModal({
  isOpen,
  onClose,
  onApprove,
  productName,
  isLoading = false,
}: ProductApprovalModalProps) {
  const [status, setStatus] = useState<'approved' | 'rejected' | null>(null);
  const [reason, setReason] = useState('');

  const handleApprove = () => {
    if (!status) {
      alert('Please select an action');
      return;
    }
    
    onApprove(status, status === 'rejected' ? reason : undefined);
    
    // Reset form
    setStatus(null);
    setReason('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Review Product: {productName}</DialogTitle>
          <DialogDescription>
            Approve or reject this product for the marketplace
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Button
              variant={status === 'approved' ? 'default' : 'outline'}
              onClick={() => setStatus('approved')}
              className={status === 'approved' ? 'bg-green-600 hover:bg-green-700' : ''}
            >
              Approve
            </Button>
            <Button
              variant={status === 'rejected' ? 'default' : 'outline'}
              onClick={() => setStatus('rejected')}
              className={status === 'rejected' ? 'bg-red-600 hover:bg-red-700' : ''}
            >
              Reject
            </Button>
          </div>
          
          {status === 'rejected' && (
            <div>
              <Label htmlFor="reason">Rejection Reason</Label>
              <Textarea
                id="reason"
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Explain why this product is being rejected"
                className="mt-1"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            onClick={handleApprove} 
            disabled={isLoading || !status || (status === 'rejected' && !reason)}
          >
            {isLoading ? 'Processing...' : 'Submit Decision'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}