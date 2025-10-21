'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { Accordion } from '../../../components/ui/Accordion';
import { SearchBar } from '../../../components/common/SearchBar';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'How do I place an order?',
    answer: 'To place an order, browse our products, add items to your cart, and proceed to checkout. You can choose your preferred delivery time slot and payment method during checkout.',
    category: 'Ordering'
  },
  {
    id: '2',
    question: 'What are your delivery hours?',
    answer: 'We deliver from 7:00 AM to 10:00 PM, Monday through Sunday. You can select your preferred delivery time slot during checkout.',
    category: 'Delivery'
  },
  {
    id: '3',
    question: 'How can I track my order?',
    answer: 'Once your order is placed, you can track its status in the "My Orders" section of your account. You will also receive email and SMS notifications at each stage of the delivery process.',
    category: 'Ordering'
  },
  {
    id: '4',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit and debit cards, UPI, net banking, and cash on delivery. All transactions are secured with industry-standard encryption.',
    category: 'Payment'
  },
  {
    id: '5',
    question: 'Can I modify or cancel my order?',
    answer: 'You can modify or cancel your order as long as it is in "Pending" status. Once an order is confirmed and processing begins, modifications may not be possible. Contact support immediately for assistance.',
    category: 'Ordering'
  },
  {
    id: '6',
    question: 'How do I return a product?',
    answer: 'If you receive a damaged or incorrect item, please contact our support team within 24 hours of delivery. We will arrange for a replacement or refund as appropriate.',
    category: 'Returns'
  },
  {
    id: '7',
    question: 'Are your products organic?',
    answer: 'We offer a wide selection of organic products clearly marked with an "Organic" badge. All our organic products are certified by recognized authorities.',
    category: 'Products'
  },
  {
    id: '8',
    question: 'How do I contact customer support?',
    answer: 'You can reach our support team via phone at +91 98765 43210 (Mon-Fri 8am-8pm, Sat-Sun 9am-6pm) or email at support@grocerynext.com. We typically respond within 24 hours.',
    category: 'Support'
  },
  {
    id: '9',
    question: 'Do you offer subscription services?',
    answer: 'Yes, we offer subscription services for regularly purchased items. You can set up daily, weekly, or monthly deliveries and modify your subscription at any time.',
    category: 'Services'
  },
  {
    id: '10',
    question: 'What is your refund policy?',
    answer: 'We offer full refunds for damaged, expired, or incorrect items. Refunds are processed within 5-7 business days and credited to your original payment method.',
    category: 'Returns'
  }
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  // Get unique categories
  const categories = ['all', ...new Set(faqData.map(item => item.category))];

  // Filter FAQ items
  const filteredItems = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id: string) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader 
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our services"
      />
      
      {/* Search and Filters */}
      <div className="mb-12">
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar 
            onSearch={setSearchQuery} 
            placeholder="Search questions..." 
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* FAQ List */}
      {filteredItems.length > 0 ? (
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              layout
            >
              <button
                className="w-full flex justify-between items-center p-6 text-left"
                onClick={() => toggleItem(item.id)}
                aria-expanded={openItemId === item.id ? "true" : "false"}
              >
                <h3 className="text-lg font-medium text-gray-900">{item.question}</h3>
                <motion.div
                  animate={{ rotate: openItemId === item.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </motion.div>
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: openItemId === item.id ? 'auto' : 0,
                  opacity: openItemId === item.id ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pt-0 border-t border-gray-100">
                  <p className="text-gray-600">{item.answer}</p>
                  <div className="mt-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {item.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No questions found</h3>
          <p className="mt-1 text-gray-500">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
      
      {/* Still Need Help */}
      <div className="max-w-3xl mx-auto mt-16 text-center">
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="mb-6 opacity-90">
            Our support team is here to assist you with any questions or issues you may have.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-primary-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Contact Support
            </button>
            <button className="bg-white/20 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/30 transition-colors">
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}