import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CartEmpty() {
  return (
    <div className="text-center py-12">
      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6" />
      <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
      <p className="text-gray-600 mb-6">
        Looks like you haven{`'`}t added any items to your cart yet.
      </p>
      <Button asChild>
        <Link href="/products">Start Shopping</Link>
      </Button>
    </div>
  );
}