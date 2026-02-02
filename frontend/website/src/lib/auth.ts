import { supabase } from './supabaseClient';

export const auth = {
  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  signup: async (email: string, password: string, metadata?: Record<string, any>) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  },

  getUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },
  
  getSession: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  }
};
