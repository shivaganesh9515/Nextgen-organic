const API_URL = "http://localhost:8000/api/v1";

function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("admin_token");
  }
  return null;
}

export async function apiRequest<T>(endpoint: string, method: string = "GET", body?: unknown, token?: string): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

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
  } catch (error: unknown) {
    throw new Error((error as Error).message || "Network Error");
  }
}

export const authApi = {
  login: async (username: string, password: string): Promise<{ access_token: string }> => {
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
  
  signup: async (userData: Record<string, unknown>) => {
      return apiRequest("/auth/signup", "POST", userData);
  }
};

export const adminApi = {
  // Dashboard/Analytics
  getDashboardStats: async () => {
    return apiRequest("/analytics/dashboard");
  },
  
  // Products
  getAllProducts: async () => {
    return apiRequest("/products/all");
  },
  
  // Vendors
  getAllVendors: async () => {
    return apiRequest("/vendors/all");
  },
  
  getVendorById: async (id: string) => {
    return apiRequest(`/vendors/${id}`);
  },
  
  updateVendorStatus: async (id: string, status: string) => {
    return apiRequest(`/vendors/${id}/status`, "PUT", { status });
  },
  
  // Orders
  getAllOrders: async () => {
    return apiRequest("/orders/all");
  },
  
  getOrderById: async (id: string) => {
    return apiRequest(`/orders/${id}`);
  },
  
  updateOrderStatus: async (id: string, status: string) => {
    return apiRequest(`/orders/${id}/status`, "PUT", { status });
  },
  
  // Categories
  getCategories: async () => {
    return apiRequest("/categories");
  },

  // Notifications
  getNotifications: async () => {
    return apiRequest("/admin/notifications/received");
  },

  getUnreadCount: async () => {
    return apiRequest<{ unread_count: number }>("/admin/notifications/received/unread-count");
  },

  markRead: async (id: string) => {
    return apiRequest(`/admin/notifications/received/${id}/read`, "POST");
  },

  markAllRead: async () => {
    return apiRequest("/admin/notifications/received/mark-all-read", "POST");
  },

  // Banners
  getBanners: async () => {
    return apiRequest("/banners");
  },

  createBanner: async (data: any) => {
    return apiRequest("/banners", "POST", data);
  },

  updateBanner: async (id: number, data: any) => {
    return apiRequest(`/banners/${id}`, "PUT", data);
  },

  deleteBanner: async (id: number) => {
    return apiRequest(`/banners/${id}`, "DELETE");
  }
};

