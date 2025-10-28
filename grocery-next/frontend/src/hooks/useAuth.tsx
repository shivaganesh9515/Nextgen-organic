'use client';

import { useState, useEffect } from 'react';
import { User } from '../lib/types';
import { USER_STORAGE_KEY } from '../lib/constants';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to load user from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      try {
        if (user) {
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        } else {
          localStorage.removeItem(USER_STORAGE_KEY);
        }
      } catch (error) {
        console.error('Failed to save user to localStorage:', error);
      }
    }
  }, [user, isLoading]);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
  };
};