'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProductSortProps {
  onSortChange: (value: string) => void;
  currentSort: string;
}

export default function ProductSort({ onSortChange, currentSort }: ProductSortProps) {
  return (
    <div className="flex items-center">
      <span className="mr-2 text-sm">Sort by:</span>
      <Select value={currentSort} onValueChange={onSortChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="popular">Most Popular</SelectItem>
          <SelectItem value="price-low">Price: Low to High</SelectItem>
          <SelectItem value="price-high">Price: High to Low</SelectItem>
          <SelectItem value="rating">Highest Rated</SelectItem>
          <SelectItem value="newest">Newest Arrivals</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}