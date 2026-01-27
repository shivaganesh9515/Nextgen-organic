const API_URL = "http://localhost:8000/api/v1";

export async function apiRequest(endpoint: string, method: string = "GET", body?: any, token?: string) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
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
