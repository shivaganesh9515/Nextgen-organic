'use client';

import { useState, useEffect } from 'react';
import { WISHLIST_STORAGE_KEY } from '../lib/constants';

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) {
        setWishlistItems(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error('Failed to load wishlist from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
      } catch (error) {
        console.error('Failed to save wishlist to localStorage:', error);
      }
    }
  }, [wishlistItems, isLoading]);

  const addToWishlist = (productId: string) => {
    setWishlistItems(prevItems => {
      if (!prevItems.includes(productId)) {
        return [...prevItems, productId];
      }
      return prevItems;
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prevItems => prevItems.filter(id => id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.includes(productId);
  };

  const toggleWishlist = (productId: string) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  return {
    wishlistItems,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
  };
};