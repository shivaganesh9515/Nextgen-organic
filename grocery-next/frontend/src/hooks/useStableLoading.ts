import { useState, useEffect } from 'react';

/**
 * A hook that provides a stable loading state to prevent UI flickering
 * @param isLoading The actual loading state
 * @param delay The delay in ms before showing the loading state (default: 300ms)
 * @returns A stable loading state that prevents flickering
 */
export const useStableLoading = (isLoading: boolean, delay: number = 300) => {
  const [stableLoading, setStableLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isLoading) {
      // If loading starts, set a timeout to show loading state
      timeoutId = setTimeout(() => {
        setShowLoading(true);
      }, delay);
    } else {
      // If loading stops, immediately hide loading state
      setShowLoading(false);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isLoading, delay]);

  useEffect(() => {
    setStableLoading(showLoading);
  }, [showLoading]);

  return stableLoading;
};