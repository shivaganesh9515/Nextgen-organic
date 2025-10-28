'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { categories } from '../../lib/data/categories';
import { vendors } from '../../lib/data/vendors';
import StandardizedButton from '../ui/StandardizedButton';

interface CategoryDropdownProps {
  onClose?: () => void;
}

const CategoryDropdown = ({ onClose }: CategoryDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('departments'); // 'departments' or 'vendors'
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get top vendors
  const topVendors = [...vendors]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      if (onClose) onClose();
    }
  };

  // Close dropdown when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <StandardizedButton
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="flex items-center space-x-2 w-full justify-between"
      >
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="font-medium">Shop by Category</span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </StandardizedButton>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-[90vw] max-w-[800px] bg-white rounded-lg shadow-2xl z-50 border border-gray-200 md:left-auto md:right-0">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <StandardizedButton
              variant="ghost"
              onClick={() => setActiveTab('departments')}
              className={`flex-1 px-6 py-3 text-sm font-medium transition ${
                activeTab === 'departments'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Departments
            </StandardizedButton>
            <StandardizedButton
              variant="ghost"
              onClick={() => setActiveTab('vendors')}
              className={`flex-1 px-6 py-3 text-sm font-medium transition ${
                activeTab === 'vendors'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Popular Vendors
            </StandardizedButton>
          </div>

          {/* Tab Content */}
          <div className="p-6 max-h-[500px] overflow-y-auto">
            {activeTab === 'departments' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div key={category.id} className="group">
                    <Link
                      href={`/shop?category=${category.id}`}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary-50 transition-all duration-200"
                      onClick={handleLinkClick}
                    >
                      <span className="text-3xl">{category.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                          {category.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {category.subcategories.length} subcategories
                        </p>
                      </div>
                    </Link>
                    
                    {/* Subcategories */}
                    <ul className="ml-12 mt-2 space-y-1">
                      {category.subcategories.slice(0, 5).map((sub, index) => (
                        <li key={index}>
                          <Link
                            href={`/shop?category=${category.id}&subcategory=${encodeURIComponent(sub.id)}`}
                            className="text-sm text-gray-600 hover:text-primary-600 hover:underline transition-colors duration-200"
                            onClick={handleLinkClick}
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                      {category.subcategories.length > 5 && (
                        <li>
                          <Link
                            href={`/shop?category=${category.id}`}
                            className="text-sm text-primary-600 hover:underline transition-colors duration-200"
                            onClick={handleLinkClick}
                          >
                            +{category.subcategories.length - 5} more
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {topVendors.map((vendor) => (
                  <Link
                    key={vendor.id}
                    href={`/vendors/${vendor.id}`}
                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-primary-50 transition-all duration-200 border border-gray-100"
                    onClick={handleLinkClick}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-600">
                        {vendor.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 transition-colors duration-200 group-hover:text-primary-600">{vendor.name}</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{vendor.description}</p>
                      <div className="flex items-center mt-1">
                        <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <span className="ml-1 text-sm text-gray-600">{vendor.rating} ({vendor.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <StandardizedButton
              variant="primary"
              className="w-full"
              onClick={() => {
                setIsOpen(false);
                if (onClose) onClose();
              }}
            >
              <Link
                href={activeTab === 'departments' ? '/shop' : '/vendors'}
                className="block w-full text-center font-medium"
                onClick={handleLinkClick}
              >
                {activeTab === 'departments' ? 'View All Products' : 'View All Vendors'}
              </Link>
            </StandardizedButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;