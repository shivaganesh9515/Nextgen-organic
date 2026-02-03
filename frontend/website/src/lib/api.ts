/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from './supabaseClient';

// Helper to handle Supabase responses
async function handleSupabaseError(error: any) {
  if (error) {
    throw new Error(error.message || "An unexpected error occurred");
  }
}

const API_BASE_URL = "http://localhost:8000/api/v1";

async function apiRequest(endpoint: string, options: RequestInit = {}, tokenKey: string | null = null) {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };

    if (tokenKey) {
        const token = localStorage.getItem(tokenKey);
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
    }

    try {
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        if (res.status === 401) {
             // Handle Unauthorized
             if (typeof window !== 'undefined') {
                 // Clear token
                 if (tokenKey) localStorage.removeItem(tokenKey);
                 // Redirect to appropriate login
                 if (tokenKey === "admin_token") window.location.href = "/login/admin";
                 if (tokenKey === "vendor_token") window.location.href = "/login/vendor";
             }
             throw new Error("Session expired. Please login again.");
        }

        if (!res.ok) {
            const err = await res.json().catch(() => ({ detail: res.statusText }));
            throw new Error(err.detail || `Request failed with status ${res.status}`);
        }

        return await res.json();
    } catch (error: any) {
        console.error(`API Error [${endpoint}]:`, error);
        throw error; // Re-throw for component handling
    }
}

export const api = {

  vendors: {
    register: async (vendorData: any) => {
       return await apiRequest("/public/vendors/register", {
           method: "POST",
           body: JSON.stringify(vendorData)
       });
    },

    addProduct: async (productData: any) => {
        return await apiRequest("/vendor/products", {
            method: "POST",
            body: JSON.stringify(productData)
        }, "vendor_token");
    },

    create: async (vendorData: any) => {
      const { data, error } = await supabase
        .from('vendors')
        .insert([vendorData])
        .select()
        .single();
      
      if (error) await handleSupabaseError(error);
      return data;
    },
    
    get: async (id: string) => {
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) await handleSupabaseError(error);
      return data;
    },
    
    update: async (id: string, updates: any) => {
       const { data, error } = await supabase
        .from('vendors')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
        
       if (error) await handleSupabaseError(error);
       return data;
    }
  },

  products: {
    list: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, vendors(business_name)')
        .eq('is_active', true)
        .eq('approval_status', 'PUBLISHED');

      if (error) await handleSupabaseError(error);
      return data;
    },
    
    get: async (slug: string) => {
      const { data, error } = await supabase
        .from('products')
        .select('*, vendors(*)')
        .eq('slug', slug)
        .single();

      if (error) await handleSupabaseError(error);
      return data;
    }
  },
  
  categories: {
    list: async () => {
      return await apiRequest("/public/categories");
    }
  },

  testimonials: {
    list: async () => {
      return await apiRequest("/public/testimonials");
    }
  }
};

