import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL for API
// Uses EXPO_PUBLIC_API_URL if set (Production), otherwise falls back to User's LAN IP (Dev)
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://10.16.148.26:8000/api/v1'; 

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

// Token Management
const TOKEN_KEY = 'auth_token';
const setToken = async (token: string) => await AsyncStorage.setItem(TOKEN_KEY, token);
const getToken = async () => await AsyncStorage.getItem(TOKEN_KEY);
const removeToken = async () => await AsyncStorage.removeItem(TOKEN_KEY);

export const api = {
  // Authentication
  login: async (username: string, password: string) => {
    try {
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        const res = await fetchWithTimeout(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString(),
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.detail || 'Login failed');
        }
        
        const data = await res.json();
        if (data.access_token) {
            await setToken(data.access_token);
        }
        return data;
    } catch (error) {
        console.error("Login Error:", error);
        throw error;
    }
  },

  logout: async () => {
      await removeToken();
  },

  // Public Endpoints
  fetchProducts: async () => {
    try {
      const res = await fetchWithTimeout(`${API_URL}/public/products`);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const rawProducts = await res.json();
      
      // CRITICAL MAPPING: Backend (snake_case) to Frontend (camelCase)
      return rawProducts.map((p: any) => ({
          ...p,
          vendorId: p.vendor_id || p.vendorId,  // Handle both just in case
          image: p.image_url || p.image,        // Handle both
          price: Number(p.price) 
      }));
    } catch (error) {
      console.warn("API Error fetching products:", error);
      return []; 
    }
  },

  fetchVendors: async () => {
    try {
      const res = await fetchWithTimeout(`${API_URL}/public/vendors`);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      return await res.json();
    } catch (error) {
      console.warn("API Error fetching vendors:", error);
      return [];
    }
  },

  createOrder: async (orderData: any) => {
    try {
        const res = await fetchWithTimeout(`${API_URL}/public/orders`, {
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
  },

  // Authenticated Endpoints
  fetchMyOrders: async () => {
      try {
          const token = await getToken();
          if (!token) return []; // No token, no orders

          const res = await fetchWithTimeout(`${API_URL}/orders/my-orders`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
          
          if (res.status === 401) {
              await removeToken(); // Token expired
              return [];
          }

          if (!res.ok) throw new Error(`Status ${res.status}`);
          return await res.json();
      } catch (error) {
          console.warn("API Error fetching my orders:", error);
          return [];
      }
  },

  fetchBanners: async () => {
    try {
        const res = await fetchWithTimeout(`${API_URL}/banners`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return await res.json();
    } catch (error) {
        console.warn("API Error fetching banners:", error);
        return [];
    }
  },

  fetchOffers: async () => {
    try {
        const res = await fetchWithTimeout(`${API_URL}/offers`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return await res.json();
    } catch (error) {
        console.warn("API Error fetching offers:", error);
        return [];
    }
  }
};
