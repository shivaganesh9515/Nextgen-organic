'use client';

import { Leaf, Heart, Shield, Award, Users, Sprout } from 'lucide-react';

export default function WhyOrganicPage() {
  const benefits = [
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Nutrient Dense",
      description: "Organic foods often contain more nutrients and antioxidants than conventionally grown foods."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Better for Your Health",
      description: "Free from synthetic pesticides, herbicides, and chemical fertilizers that can harm your body."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "No Harmful Chemicals",
      description: "Organic farming prohibits the use of synthetic chemicals, GMOs, and antibiotics."
    },
    {
      icon: <Sprout className="h-8 w-8" />,
      title: "Environmentally Sustainable",
      description: "Organic farming practices protect soil, water, and biodiversity for future generations."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Higher Quality Standards",
      description: "Strict certification processes ensure consistent quality and authenticity."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Supports Local Farmers",
      description: "Buying organic supports small-scale farmers who use sustainable practices."
    }
  ];

  const practices = [
    {
      title: "Natural Pest Control",
      description: "Using beneficial insects, companion planting, and natural repellents instead of synthetic pesticides."
    },
    {
      title: "Soil Health Management",
      description: "Building soil fertility through composting, crop rotation, and cover crops."
    },
    {
      title: "Biodiversity Conservation",
      description: "Maintaining diverse ecosystems that support wildlife and beneficial organisms."
    },
    {
      title: "Water Conservation",
      description: "Implementing efficient irrigation systems and protecting water sources from contamination."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Organic?</h1>
          <p className="text-xl text-gray-600">
            Discover the benefits of organic products for your health and the environment
          </p>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 mb-16 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Organic Difference</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Organic products are grown and processed according to strict standards that prioritize 
            environmental sustainability, animal welfare, and human health.
          </p>
        </div>

        {/* Benefits Section */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Benefits of Organic Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                  {benefit.icon}
                </div>
                <h4 className="text-xl font-semibold mb-2 text-center">{benefit.title}</h4>
                <p className="text-gray-600 text-center">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Organic Practices */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Organic Farming Practices</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {practices.map((practice, index) => (
              <div
                key={index}
                className="flex gap-6 p-6 bg-white rounded-xl border border-gray-200"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <span className="text-lg font-bold">{index + 1}</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">{practice.title}</h4>
                  <p className="text-gray-600">{practice.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certification Info */}
        <section className="mb-16 bg-green-50 rounded-2xl p-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Organic Certification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 mb-4">
                  Organic products sold on DailyPick are certified by recognized organic certification bodies. 
                  These certifications ensure that products meet strict organic standards throughout the 
                  production and processing chain.
                </p>
                <p className="text-gray-700 mb-4">
                  Look for these certifications when shopping:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>India Organic (NPOP) - National Programme for Organic Production</li>
                  <li>USDA Organic - United States Department of Agriculture</li>
                  <li>EU Organic - European Union Organic Standards</li>
                  <li>Jaivik Bharat - India&apos;s new organic logo</li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                      <Leaf className="h-8 w-8 text-green-600" />
                    </div>
                    <span className="font-medium text-sm text-center">India Organic</span>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                      <Leaf className="h-8 w-8 text-green-600" />
                    </div>
                    <span className="font-medium text-sm text-center">USDA Organic</span>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                      <Leaf className="h-8 w-8 text-green-600" />
                    </div>
                    <span className="font-medium text-sm text-center">EU Organic</span>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                      <Leaf className="h-8 w-8 text-green-600" />
                    </div>
                    <span className="font-medium text-sm text-center">Jaivik Bharat</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="text-center py-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
          <blockquote className="text-xl italic text-gray-700 max-w-3xl mx-auto">
            &quot;Empowering healthy living through authentic organic products while supporting 
            sustainable farming and local communities.&quot;
          </blockquote>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            At DailyPick, we believe in the power of organic products to transform lives and 
            protect our planet. We&apos;re committed to connecting health-conscious consumers with 
            trusted organic producers who share our values.
          </p>
        </section>
      </div>
    </div>
  );
}