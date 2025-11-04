'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Shield, Heart, Sparkles, CheckCircle, Award } from 'lucide-react';

export default function AboutOrganicPage() {
  const benefits = [
    {
      icon: Heart,
      title: 'Better for Your Health',
      description: 'Organic foods contain fewer pesticides and synthetic chemicals, reducing your exposure to potentially harmful substances.',
    },
    {
      icon: Leaf,
      title: 'Better for the Environment',
      description: 'Organic farming practices help preserve biodiversity, improve soil quality, and reduce pollution.',
    },
    {
      icon: Shield,
      title: 'No GMOs',
      description: 'Organic products are free from genetically modified organisms, giving you natural, authentic food.',
    },
    {
      icon: Sparkles,
      title: 'Better Taste',
      description: 'Many people find that organic foods taste better due to natural growing methods and fresh harvesting.',
    },
  ];

  const certifications = [
    'USDA Organic',
    'India Organic',
    'EU Organic',
    'Non-GMO Project Verified',
    'Fair Trade Certified',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Leaf className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Why Choose Organic?</h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
            Discover the benefits of organic products and how they make a difference for your health and the planet
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits of Organic Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Organic farming isn&apos;t just a trend—it&apos;s a commitment to healthier living and environmental sustainability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardHeader>
                    <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Makes It Organic Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Makes It Organic?</h2>
              <p className="text-lg text-gray-600">
                Understanding organic certification and standards
              </p>
            </div>

            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Organic Certification Standards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Farming Practices</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>No synthetic pesticides or fertilizers</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>No genetically modified organisms (GMOs)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Crop rotation and natural pest control</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Organic feed for livestock</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>No antibiotics or growth hormones</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Certification Process</h3>
                  <p className="text-gray-700 mb-4">
                    Organic certification requires farms to follow strict guidelines and undergo regular inspections. 
                    This ensures that products labeled as organic meet the highest standards of quality and sustainability.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Award className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recognized Certifications</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We work with vendors who are certified by the most trusted organic certification bodies
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="font-semibold text-sm">{cert}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Organic Journey Today</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Browse our selection of certified organic products and experience the difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="inline-block px-8 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Shop Organic Products
            </a>
            <a
              href="/vendors"
              className="inline-block px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Meet Our Vendors
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
