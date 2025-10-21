'use client';

import { Users, Award, Leaf, Truck } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Customer First",
      description: "We prioritize our customers' needs and strive to exceed expectations with every interaction."
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Quality Products",
      description: "We source only the finest organic and fresh products from trusted local vendors."
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Fast Delivery",
      description: "Get your groceries delivered fresh and on time, every time with our efficient delivery system."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Satisfaction Guaranteed",
      description: "We stand behind our products and services with a 100% satisfaction guarantee."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About GroceryNext</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted partner for fresh, organic groceries delivered to your doorstep
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2023, GroceryNext was born out of a simple idea: to make fresh, organic groceries 
            accessible to everyone without compromising on quality or convenience. What started as a small 
            local delivery service has grown into a comprehensive platform connecting customers with the 
            best local vendors.
          </p>
          <p className="text-gray-600 mb-4">
            Our journey began when our founder, Shivaganesh Gajavelli, noticed the gap between consumers 
            seeking fresh organic produce and local farmers struggling to reach urban markets. With a 
            vision to bridge this gap, GroceryNext was created to support local agriculture while 
            providing customers with the freshest products.
          </p>
          <p className="text-gray-600">
            Today, we partner with over 200 local vendors and serve thousands of customers across 
            multiple cities, all while maintaining our commitment to quality, sustainability, and 
            community support.
          </p>
        </div>
        
        <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl font-bold text-primary-600 mb-2">200+</div>
            <div className="text-lg text-gray-700">Local Vendors</div>
          </div>
          <div className="mx-8 h-16 w-px bg-gray-300"></div>
          <div className="text-center">
            <div className="text-5xl font-bold text-primary-600 mb-2">5000+</div>
            <div className="text-lg text-gray-700">Happy Customers</div>
          </div>
          <div className="mx-8 h-16 w-px bg-gray-300"></div>
          <div className="text-center">
            <div className="text-5xl font-bold text-primary-600 mb-2">98%</div>
            <div className="text-lg text-gray-700">Satisfaction Rate</div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary-100 rounded-full text-primary-600">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-primary-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-6">
          To revolutionize the way people access fresh groceries by creating a sustainable ecosystem 
          that benefits customers, vendors, and the environment while fostering community connections.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Sustainability</h3>
            <p className="text-gray-600">
              Supporting local farmers and reducing carbon footprint through efficient delivery routes
            </p>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
            <p className="text-gray-600">
              Building stronger local economies by connecting customers directly with vendors
            </p>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Health</h3>
            <p className="text-gray-600">
              Promoting healthier lifestyles through access to fresh, organic, and nutritious foods
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}