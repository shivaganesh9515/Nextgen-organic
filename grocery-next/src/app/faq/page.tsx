'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I place an order?",
      answer: "To place an order, simply browse our products, add items to your cart, and proceed to checkout. You can choose your preferred delivery time slot and payment method during checkout."
    },
    {
      question: "What are your delivery hours?",
      answer: "We deliver from 8:00 AM to 10:00 PM, Monday through Sunday. You can select your preferred delivery time slot during checkout."
    },
    {
      question: "Do you deliver to my area?",
      answer: "We currently deliver to most areas within Mumbai. Enter your delivery address during checkout to check if we serve your area."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit and debit cards, UPI, net banking, and cash on delivery. All payments are processed securely."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is placed, you can track its status in the 'My Orders' section of your account. You'll also receive updates via email and SMS."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 100% satisfaction guarantee. If you're not happy with your purchase, contact us within 24 hours of delivery and we'll arrange a replacement or refund."
    },
    {
      question: "Are your products organic?",
      answer: "We offer both organic and conventionally grown products. Products marked as 'Organic' are certified organic. You can filter by organic products in our shop."
    },
    {
      question: "How fresh are your products?",
      answer: "We source our products directly from local farmers and vendors daily. Most products are delivered within 24 hours of harvest or preparation."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find answers to common questions about our services
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="card">
              <button
                className="w-full flex justify-between items-center p-6 text-left"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Still have questions?</h3>
          <p className="text-gray-600 mb-6">
            Can{`'`}t find the answer you{`'`}re looking for? Please contact our support team.
          </p>
          <a 
            href="/contact" 
            className="btn-primary inline-block"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}