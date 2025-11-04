'use client';

import { useState } from 'react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I place an order?",
      answer: "To place an order, simply browse our products, add items to your cart, and proceed to checkout. You can pay using any major credit card or through our secure payment gateway."
    },
    {
      question: "What are your delivery hours?",
      answer: "We deliver from 8:00 AM to 10:00 PM, 7 days a week. Orders placed before 2:00 PM are typically delivered the same day."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is confirmed, you{`'`}ll receive a confirmation email with a tracking link. You can also track your order status in the {`'`}My Orders{`'`} section of your account."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 100% satisfaction guarantee. If you{`'`}re not happy with your purchase, you can return it within 7 days for a full refund. Perishable items must be returned within 2 days."
    },
    {
      question: "How do I become a vendor?",
      answer: "To become a vendor, visit our {`'`}Vendor Registration{`'`} page and fill out the application form. Our team will review your application and get back to you within 3-5 business days."
    },
    {
      question: "Do you offer discounts for bulk orders?",
      answer: "Yes, we offer special pricing for bulk orders. Please contact our sales team at sales@dailypick.com with your requirements, and we{`'`}ll provide you with a custom quote."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Frequently Asked Questions</h1>
        <p className="text-gray-600 mb-8 text-center">
          Find answers to common questions about our services
        </p>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                className="flex justify-between items-center w-full p-4 text-left font-medium text-gray-900 hover:bg-gray-50"
                onClick={() => toggleAccordion(index)}
              >
                <span>{faq.question}</span>
                <svg 
                  className={`w-5 h-5 transition-transform ${openIndex === index ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {openIndex === index && (
                <div className="p-4 pt-0 border-t border-gray-200">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-green-50 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Still have questions?</h2>
          <p className="text-gray-700 mb-4">
            Can{`'`}t find the answer you{`'`}re looking for? We{`'`}re here to help!
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}