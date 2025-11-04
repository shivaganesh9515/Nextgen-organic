'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Rating from '@/components/shared/Rating';

interface ProductReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: {
    rating: number;
    title: string;
    comment: string;
  }) => void;
  productName: string;
  isLoading?: boolean;
}

export default function ProductReviewModal({
  isOpen,
  onClose,
  onSubmit,
  productName,
  isLoading = false,
}: ProductReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    
    onSubmit({ rating, title, comment });
    
    // Reset form
    setRating(0);
    setTitle('');
    setComment('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Review {productName}</DialogTitle>
          <DialogDescription>
            Share your experience with this product
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Rating</Label>
            <div className="mt-1">
              <Rating rating={rating} size="lg" />
              <div className="flex mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="text-2xl focus:outline-none"
                    aria-label={`Rate ${star} stars`}
                  >
                    {star <= rating ? '★' : '☆'}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your review a title"
            />
          </div>
          
          <div>
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share details of your experience"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading || rating === 0}>
            {isLoading ? 'Submitting...' : 'Submit Review'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}