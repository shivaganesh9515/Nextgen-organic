import { useState, useEffect, useCallback } from 'react';

interface UseFetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  deps?: unknown[];
}

export function useFetch<T>(url: string, _options: UseFetchOptions = {}) {
  // _options is passed but not used in this function
  // This is intentional as we're using mock data for now
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock response for now
      console.log('Fetching data from:', url);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return mock data based on URL
      let mockData: unknown;
      
      if (url.includes('/api/products')) {
        mockData = {
          data: [
            { id: '1', name: 'Product 1' },
            { id: '2', name: 'Product 2' },
          ],
          total: 2,
        };
      } else if (url.includes('/api/orders')) {
        mockData = {
          data: [
            { id: '1', orderId: 'ORD-001' },
            { id: '2', orderId: 'ORD-002' },
          ],
          total: 2,
        };
      } else {
        mockData = { message: 'Success' };
      }
      
      setData(mockData as T);
    } catch (err) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, [url]); // Only depend on url, not options

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Only depend on fetchData

  const refetch = () => {
    fetchData();
  };

  return {
    data,
    loading,
    error,
    refetch,
  };
}