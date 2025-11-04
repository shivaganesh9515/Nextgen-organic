import { useState, useEffect } from 'react';
import { Order } from '@/types/order';

export function useOrders(userId?: string) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock data for now
      const mockOrders: Order[] = [
        {
          id: '1',
          userId: '1',
          items: [
            {
              id: '1',
              productId: '1',
              vendorId: '1',
              quantity: 2,
              price: 2.99,
              total: 5.98,
            },
          ],
          totalAmount: 5.98,
          discountAmount: 0,
          taxAmount: 0.48,
          finalAmount: 6.46,
          shippingAddress: {
            id: '1',
            label: 'Home',
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA',
            isDefault: true,
          },
          paymentMethod: 'credit_card',
          paymentStatus: 'completed',
          orderStatus: 'delivered',
          trackingNumber: 'TRK123456789',
          estimatedDelivery: new Date(),
          refundStatus: 'none',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      
      setOrders(mockOrders);
    } catch (err) {
      setError('Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  const refetch = () => {
    fetchOrders();
  };

  return {
    orders,
    loading,
    error,
    refetch,
  };
}