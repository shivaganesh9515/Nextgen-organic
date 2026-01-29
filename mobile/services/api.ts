const BASE_URL = 'http://10.0.2.2:8000/api/v1/public'; // Android Emulator
// const BASE_URL = 'http://localhost:8000/api/v1/public'; // iOS Simulator or Web

// Helper: Fetch with Timeout
const fetchWithTimeout = async (resource: RequestInfo, options: RequestInit = {}) => {
  const { timeout = 8000 } = options as any; 
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
      const response = await fetch(resource, {
        ...options,
        signal: controller.signal  
      });
      clearTimeout(id);
      return response;
  } catch (error: any) {
      clearTimeout(id);
      if (error.name === 'AbortError') {
          throw new Error('Request timed out');
      }
      throw error;
  }
}

export const api = {
  fetchProducts: async () => {
    try {
      const res = await fetchWithTimeout(`${BASE_URL}/products`);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      return await res.json();
    } catch (error) {
      console.warn("API Error fetching products:", error);
      return []; 
    }
  },

  fetchVendors: async () => {
    try {
      const res = await fetchWithTimeout(`${BASE_URL}/vendors`);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      return await res.json();
    } catch (error) {
      console.warn("API Error fetching vendors:", error);
      return [];
    }
  },

  createOrder: async (orderData: any) => {
    try {
        const res = await fetchWithTimeout(`${BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.detail || 'Order failed');
        }
        return await res.json();
    } catch (error) {
        console.error("API Error creating order:", error);
        throw error;
    }
  }
};
