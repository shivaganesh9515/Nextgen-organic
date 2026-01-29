const API_URL = "http://localhost:8000/api/v1";

function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("vendor_token");
  }
  return null;
}

export async function apiRequest(endpoint: string, method: string = "GET", body?: any, token?: string) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Use provided token or get from localStorage
  const authToken = token || getToken();
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || "API Request Failed");
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Network Error");
  }
}

export const authApi = {
  login: async (username: string, password: string): Promise<{ access_token: string }> => {
    // FastAPI expects form-data for OAuth2PasswordRequestForm
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Login Failed");
    }
    
    return await res.json();
  },
  
  signup: async (userData: any) => {
      return apiRequest("/auth/signup", "POST", userData);
  }
};

export const vendorApi = {
    getProducts: async () => {
        // Token is automatically included from localStorage via apiRequest
        return apiRequest("/products"); 
    },
    getProduct: async (id: string) => {
        return apiRequest(`/products/${id}`);
    },
    addProduct: async (productData: any) => {
        return apiRequest("/products", "POST", productData);
    },
    deleteProduct: async (id: string) => {
        return apiRequest(`/products/${id}`, "DELETE");
    },
    getOrders: async () => {
        return apiRequest("/orders");
    },
    updateOrderStatus: async (orderId: string, status: string) => {
        return apiRequest(`/orders/${orderId}/status`, "PUT", { status });
    },
    getProfile: async () => {
        return apiRequest("/vendor/me/profile");
    }
};

