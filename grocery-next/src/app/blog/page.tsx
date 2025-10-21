'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, User, Tag } from 'lucide-react';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { SearchBar } from '../../components/common/SearchBar';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  readTime: string;
}

const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 Healthy Eating Habits to Adopt This Year',
    excerpt: 'Discover simple yet effective habits that can transform your relationship with food and boost your overall health.',
    content: '',
    author: 'Dr. Priya Sharma',
    date: '2025-10-15',
    category: 'Health',
    tags: ['nutrition', 'wellness', 'habits'],
    image: '/images/blog/healthy-eating.jpg',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Seasonal Produce Guide: What to Buy in October',
    excerpt: 'Learn which fruits and vegetables are at their peak in October and how to incorporate them into your meals.',
    content: '',
    author: 'Rajesh Kumar',
    date: '2025-10-10',
    category: 'Seasonal',
    tags: ['seasonal', 'produce', 'fruits', 'vegetables'],
    image: '/images/blog/seasonal-produce.jpg',
    readTime: '4 min read'
  },
  {
    id: '3',
    title: 'Sustainable Packaging: Our Commitment to the Environment',
    excerpt: 'Explore our initiatives to reduce packaging waste and promote eco-friendly alternatives in grocery delivery.',
    content: '',
    author: 'Amit Patel',
    date: '2025-10-05',
    category: 'Sustainability',
    tags: ['environment', 'packaging', 'sustainability'],
    image: '/images/blog/sustainable-packaging.jpg',
    readTime: '6 min read'
  },
  {
    id: '4',
    title: 'How to Store Fresh Produce for Maximum Freshness',
    excerpt: 'Master the art of food storage with our comprehensive guide to keeping your fruits and vegetables fresh longer.',
    content: '',
    author: 'Neha Gupta',
    date: '2025-09-28',
    category: 'Tips',
    tags: ['storage', 'freshness', 'tips'],
    image: '/images/blog/food-storage.jpg',
    readTime: '3 min read'
  },
  {
    id: '5',
    title: 'Supporting Local Farmers: The Impact of Your Purchases',
    excerpt: 'Understand how shopping with us directly supports local agriculture and strengthens your community.',
    content: '',
    author: 'Dr. Vikram Singh',
    date: '2025-09-20',
    category: 'Community',
    tags: ['local', 'farmers', 'community'],
    image: '/images/blog/local-farmers.jpg',
    readTime: '7 min read'
  },
  {
    id: '6',
    title: 'Organic vs. Conventional: What You Need to Know',
    excerpt: 'Navigate the organic food landscape with our expert guide on when to choose organic and when conventional is fine.',
    content: '',
    author: 'Dr. Priya Sharma',
    date: '2025-09-15',
    category: 'Nutrition',
    tags: ['organic', 'conventional', 'health'],
    image: '/images/blog/organic-vs-conventional.jpg',
    readTime: '8 min read'
  }
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');

  // Get unique categories and tags
  const categories = ['all', ...new Set(mockBlogPosts.map(post => post.category))];
  const allTags = [...new Set(mockBlogPosts.flatMap(post => post.tags))];
  const tags = ['all', ...allTags];

  // Filter blog posts
  const filteredPosts = mockBlogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader 
        title="Blog"
        subtitle="Insights, tips, and stories from our team"
      />
      
      {/* Search and Filters */}
      <div className="mb-12">
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar 
            onSearch={setSearchQuery} 
            placeholder="Search articles..." 
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex flex-wrap gap-2">
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
          
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedTag === tag
                    ? 'bg-secondary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Blog Posts Grid */}
      {filteredPosts.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="bg-white/80 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg border border-white/20 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              layout
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image || '/images/placeholder-blog.jpg'} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600">{post.author}</span>
                  </div>
                  
                  <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                    Read More
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-4">
                  {post.tags.map(tag => (
                    <span 
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No articles found</h3>
          <p className="mt-1 text-gray-500">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedTag('all');
            }}
            className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}