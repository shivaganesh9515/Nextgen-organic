'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, User, Tag, ChevronRight, Leaf, Heart, Sprout } from 'lucide-react';

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "10 Health Benefits of Going Organic",
    excerpt: "Discover why switching to organic foods can transform your health and well-being.",
    content: "Going organic isn't just a trend - it's a lifestyle choice that can significantly impact your health...",
    author: "Dr. Priya Sharma",
    date: "2024-05-15",
    category: "Health",
    image: "/images/blog/organic-benefits.jpg",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Seasonal Eating: Why It Matters",
    excerpt: "Learn how eating seasonally can improve your nutrition and support local farmers.",
    content: "Seasonal eating connects us with nature's rhythm and offers numerous health benefits...",
    author: "Rajesh Kumar",
    date: "2024-05-10",
    category: "Nutrition",
    image: "/images/blog/seasonal-eating.jpg",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "Understanding Organic Labels",
    excerpt: "Navigate the confusing world of organic certifications and labels with our guide.",
    content: "With so many labels on organic products, it's easy to get confused about what they really mean...",
    author: "Neha Patel",
    date: "2024-05-05",
    category: "Education",
    image: "/images/blog/organic-labels.jpg",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "The Environmental Impact of Organic Farming",
    excerpt: "How organic farming practices contribute to a healthier planet.",
    content: "Organic farming goes beyond just avoiding chemicals - it's a holistic approach to agriculture...",
    author: "Dr. Anil Verma",
    date: "2024-04-28",
    category: "Environment",
    image: "/images/blog/organic-environment.jpg",
    readTime: "7 min read"
  },
  {
    id: 5,
    title: "Organic Superfoods You Should Know About",
    excerpt: "Discover powerful organic superfoods that can boost your health naturally.",
    content: "Superfoods are nutritional powerhouses that offer exceptional health benefits...",
    author: "Priya Menon",
    date: "2024-04-22",
    category: "Superfoods",
    image: "/images/blog/organic-superfoods.jpg",
    readTime: "5 min read"
  },
  {
    id: 6,
    title: "Cooking with Organic Herbs and Spices",
    excerpt: "Enhance your dishes with the incredible flavors and health benefits of organic herbs.",
    content: "Organic herbs and spices not only add incredible flavors to your meals but also offer numerous health benefits...",
    author: "Chef Arjun Reddy",
    date: "2024-04-15",
    category: "Cooking",
    image: "/images/blog/organic-herbs.jpg",
    readTime: "4 min read"
  }
];

const categories = [
  { name: "All", icon: <Leaf className="h-4 w-4" /> },
  { name: "Health", icon: <Heart className="h-4 w-4" /> },
  { name: "Nutrition", icon: <Sprout className="h-4 w-4" /> },
  { name: "Environment", icon: <Leaf className="h-4 w-4" /> },
  { name: "Cooking", icon: <Leaf className="h-4 w-4" /> },
  { name: "Superfoods", icon: <Leaf className="h-4 w-4" /> }
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Health & Wellness Blog</h1>
          <p className="text-xl text-gray-600">
            Discover tips, insights, and expert advice on organic living
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.name
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <div
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-100" />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                  <Link 
                    href={`/blog/${post.id}`} 
                    className="flex items-center gap-1 text-green-600 hover:text-green-700 font-medium text-sm"
                  >
                    Read More
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Stay Informed</h3>
          <p className="mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest articles on organic living, health tips, 
            and exclusive offers from our vendors.
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-green-600 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}