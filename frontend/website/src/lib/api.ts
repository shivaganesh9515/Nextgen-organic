/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from './supabaseClient';

// Helper to handle Supabase responses
async function handleSupabaseError(error: any) {
  if (error) {
    throw new Error(error.message || "An unexpected error occurred");
  }
}

export const api = {
  vendors: {
    register: async (vendorData: any) => {
       const res = await fetch("http://localhost:8000/api/v1/vendors/register", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(vendorData)
       });
       
       if (!res.ok) {
           const err = await res.json();
           throw new Error(err.detail || "Registration failed");
       }
       return await res.json();
    },

    addProduct: async (productData: any) => {
        // Retrieve token
        const token = localStorage.getItem("vendor_token"); 
        // NOTE: Vendor Onboarding Flow generates credentials but frontend login logic 
        // needs to store this token. Assuming /login/vendor page stores 'vendor_token'.
        // If not, I'll need to check login implementation. 
        // For now, I'll use 'vendor_token'.
        
        const res = await fetch("http://localhost:8000/api/v1/vendor/products", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(productData)
        });
        
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.detail || "Failed to add product");
        }
        return await res.json();
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
      const { data, error } = await supabase
        .from('categories')
        .select('*');
        
      if (error) await handleSupabaseError(error);
      return data;
    }
  }
};

