'use client';

import { Users, Award, TrendingUp, Heart } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function CareersPage() {
  const benefits = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Collaborative Culture",
      description: "Work with a diverse team of passionate professionals committed to making a difference."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Growth Opportunities",
      description: "Continuous learning and career advancement in a fast-growing company."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Competitive Compensation",
      description: "Market-leading salary packages and performance-based bonuses."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs for you and your family."
    }
  ];

  const positions = [
    {
      title: "Delivery Driver",
      department: "Operations",
      location: "Mumbai",
      type: "Full-time",
      description: "Responsible for timely and safe delivery of groceries to customers."
    },
    {
      title: "Customer Support Specialist",
      department: "Customer Service",
      location: "Mumbai",
      type: "Full-time",
      description: "Provide exceptional support to customers through various channels."
    },
    {
      title: "Software Engineer",
      department: "Technology",
      location: "Mumbai",
      type: "Full-time",
      description: "Develop and maintain our platform to enhance user experience."
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "Mumbai",
      type: "Full-time",
      description: "Drive brand awareness and customer acquisition through innovative campaigns."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Team</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Be part of a company that{`'`}s revolutionizing the grocery industry while making a positive impact on communities
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Work at GroceryNext?</h2>
          <p className="text-gray-600 mb-6">
            At GroceryNext, we believe in empowering our employees to make a meaningful difference 
            in the way people access fresh groceries. We foster an environment of innovation, 
            collaboration, and continuous growth.
          </p>
          <p className="text-gray-600 mb-6">
            Our team is passionate about sustainability, community, and technology. We{`'`}re looking 
            for talented individuals who share our values and want to be part of something bigger.
          </p>
          <Button>View Open Positions</Button>
        </div>
        
        <div className="bg-gray-100 rounded-xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Our Culture</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="h-3 w-3 rounded-full bg-primary-600"></div>
              </div>
              <p className="ml-3 text-gray-600">
                <span className="font-semibold">Innovation:</span> We encourage creative thinking and experimentation
              </p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="h-3 w-3 rounded-full bg-primary-600"></div>
              </div>
              <p className="ml-3 text-gray-600">
                <span className="font-semibold">Integrity:</span> We operate with honesty and transparency
              </p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="h-3 w-3 rounded-full bg-primary-600"></div>
              </div>
              <p className="ml-3 text-gray-600">
                <span className="font-semibold">Community:</span> We{`'`}re committed to giving back to our communities
              </p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="h-3 w-3 rounded-full bg-primary-600"></div>
              </div>
              <p className="ml-3 text-gray-600">
                <span className="font-semibold">Sustainability:</span> We prioritize eco-friendly practices
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Employee Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="card text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary-100 rounded-full text-primary-600">
                  {benefit.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Open Positions</h2>
        <div className="space-y-6">
          {positions.map((position, index) => (
            <div key={index} className="card p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{position.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="badge badge-secondary">{position.department}</span>
                    <span className="badge badge-secondary">{position.location}</span>
                    <span className="badge badge-secondary">{position.type}</span>
                  </div>
                  <p className="mt-3 text-gray-600">{position.description}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Button variant="outline">Apply Now</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Don{`'`}t see a position that fits?</h3>
          <p className="text-gray-600 mb-6">
            We{`'`}re always looking for talented individuals. Send us your resume and we{`'`}ll contact you.
          </p>
          <Button variant="outline">Submit Your Resume</Button>
        </div>
      </div>
    </div>
  );
}