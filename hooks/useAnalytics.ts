import { useState, useEffect } from 'react';
import { AnalyticsData } from '@/types/analytics';

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock data for now
      const mockAnalytics: AnalyticsData = {
        totalSales: 12500,
        totalOrders: 342,
        totalUsers: 128,
        totalVendors: 24,
        salesData: [
          { date: '2023-01-01', amount: 1200 },
          { date: '2023-02-01', amount: 1800 },
          { date: '2023-03-01', amount: 2100 },
          { date: '2023-04-01', amount: 1900 },
          { date: '2023-05-01', amount: 2400 },
          { date: '2023-06-01', amount: 2800 },
        ],
        topProducts: [
          { id: '1', name: 'Organic Apples', sales: 45 },
          { id: '2', name: 'Whole Wheat Bread', sales: 28 },
          { id: '3', name: 'Organic Milk', sales: 22 },
        ],
        topVendors: [
          { id: '1', name: 'Fresh Farms', sales: 1200 },
          { id: '2', name: 'Bakery Delight', sales: 800 },
          { id: '3', name: 'Dairy Fresh', sales: 650 },
        ],
      };
      
      setAnalytics(mockAnalytics);
    } catch (err) {
      setError('Failed to fetch analytics');
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const refetch = () => {
    fetchAnalytics();
  };

  return {
    analytics,
    loading,
    error,
    refetch,
  };
}