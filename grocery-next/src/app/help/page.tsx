'use client';

import Link from 'next/link';
import { 
  ShoppingCart, 
  Package, 
  CreditCard, 
  User, 
  Phone, 
  Shield,
  ArrowRight,
  Mail
} from 'lucide-react';

export default function HelpPage() {
  const helpTopics = [
    {
      icon: <ShoppingCart className="h-6 w-6" />,
      title: "Ordering",
      description: "How to place orders, modify cart, and manage your shopping experience",
      link: "/help/ordering"
    },
    {
      icon: <Package className="h-6 w-6" />,
      title: "Delivery",
      description: "Delivery options, tracking, and scheduling information",
      link: "/help/delivery"
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Payment",
      description: "Payment methods, billing, and refund processes",
      link: "/help/payment"
    },
    {
      icon: <User className="h-6 w-6" />,
      title: "Account",
      description: "Managing your profile, addresses, and preferences",
      link: "/help/account"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Security",
      description: "Privacy, data protection, and account security",
      link: "/help/security"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Contact",
      description: "How to reach our support team for assistance",
      link: "/contact"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find answers to your questions and get help with our services
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {helpTopics.map((topic, index) => (
            <Link 
              key={index} 
              href={topic.link}
              className="card p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                  {topic.icon}
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-900">{topic.title}</h3>
              </div>
              <p className="mt-3 text-gray-600">{topic.description}</p>
              <div className="mt-4 flex items-center text-primary-600 font-medium">
                Learn more
                <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>

        <div className="card p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
            <p className="text-gray-600 mb-6">
              Our support team is here to assist you with any questions or issues you may have.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Phone className="mx-auto h-8 w-8 text-primary-600" />
                <h3 className="mt-2 font-semibold">Phone Support</h3>
                <p className="mt-1 text-gray-600">+91 98765 43210</p>
                <p className="text-sm text-gray-500">Mon-Fri 8am-8pm, Sat-Sun 9am-6pm</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Mail className="mx-auto h-8 w-8 text-primary-600" />
                <h3 className="mt-2 font-semibold">Email Support</h3>
                <p className="mt-1 text-gray-600">support@grocerynext.com</p>
                <p className="text-sm text-gray-500">We respond within 24 hours</p>
              </div>
            </div>
            <div className="mt-6">
              <Link href="/contact" className="btn-primary inline-block">
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="card p-4">
              <h3 className="font-semibold text-gray-900">How do I track my order?</h3>
              <p className="mt-2 text-gray-600">
                You can track your order status in the {`'`}My Orders{`'`} section of your account. 
                You{`'`}ll also receive email and SMS notifications at each stage of the delivery process.
              </p>
            </div>
            <div className="card p-4">
              <h3 className="font-semibold text-gray-900">What if I{`'`}m not home when my order arrives?</h3>
              <p className="mt-2 text-gray-600">
                Our delivery partners will call you before arriving. You can also specify 
                delivery instructions during checkout or contact the delivery person directly 
                using the phone number provided in the delivery notification.
              </p>
            </div>
            <div className="card p-4">
              <h3 className="font-semibold text-gray-900">Can I modify or cancel my order?</h3>
              <p className="mt-2 text-gray-600">
                You can modify or cancel your order as long as it{`'`}s in {`'`}Pending{`'`} status. 
                Once an order is confirmed and processing begins, modifications may not be possible. 
                Contact support immediately for assistance.
              </p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link href="/faq" className="text-primary-600 hover:text-primary-700 font-medium">
              View all FAQs
              <ArrowRight className="ml-1 h-4 w-4 inline" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}