'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Hide button on mobile devices when keyboard is open
  useEffect(() => {
    const handleResize = () => {
      // On mobile devices, hide the button when viewport height is significantly reduced (keyboard open)
      if (typeof window !== 'undefined' && window.innerHeight < window.screen.height * 0.5) {
        setIsVisible(false);
      } else if (window.pageYOffset > 300) {
        setIsVisible(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle orientation change on mobile
  useEffect(() => {
    const handleOrientationChange = () => {
      // Small delay to allow UI to adjust
      setTimeout(() => {
        if (window.pageYOffset > 300) {
          setIsVisible(true);
        }
      }, 300);
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    return () => window.removeEventListener('orientationchange', handleOrientationChange);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 md:p-4 bg-primary-600 text-white rounded-full shadow-xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 z-50 hover:shadow-2xl transform hover:scale-105 active:scale-95 touch-optimized"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      )}
    </>
  );
};