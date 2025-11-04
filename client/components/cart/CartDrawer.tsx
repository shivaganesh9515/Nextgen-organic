'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, getTotalItems } = useCartStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
        aria-label="Open cart"
      >
        <svg 
          className="h-6 w-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
        {getTotalItems() > 0 && (
          <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {getTotalItems()}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="ml-3 h-7 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-500"
                      aria-label="Close cart"
                    >
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      {items.length === 0 ? (
                        <div className="text-center py-12">
                          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                          </svg>
                          <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                          <p className="mt-1 text-sm text-gray-500">Get shopping to add items to your cart</p>
                        </div>
                      ) : (
                        <ul className="-my-6 divide-y divide-gray-200">
                          {items.map((item) => (
                            <li key={item.id} className="py-6">
                              <CartItem
                                id={item.id}
                                name={item.name}
                                price={item.price}
                                quantity={item.quantity}
                                image={item.image}
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                {items.length > 0 && (
                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <CartSummary />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}