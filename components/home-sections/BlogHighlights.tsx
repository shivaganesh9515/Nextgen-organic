'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import BlogCard from '@/components/home-sections/BlogCard';

export default function BlogHighlights() {
  // Mock blog data
  const blogPosts = [
    {
      id: '1',
      title: '5 Tips for Storing Fresh Produce',
      excerpt: 'Learn how to keep your fruits and vegetables fresh longer with these simple storage tips.',
      date: 'Oct 15, 2025',
      author: 'Sarah Johnson',
      category: 'Storage Tips',
    },
    {
      id: '2',
      title: 'Seasonal Eating: Why It Matters',
      excerpt: 'Discover the benefits of eating seasonal produce and how it can improve your health.',
      date: 'Oct 10, 2025',
      author: 'Michael Chen',
      category: 'Health',
    },
    {
      id: '3',
      title: 'The Rise of Local Farming',
      excerpt: 'How supporting local farmers benefits your community and the environment.',
      date: 'Oct 5, 2025',
      author: 'Emma Rodriguez',
      category: 'Community',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Latest from Our Blog</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover tips, recipes, and insights to help you make the most of your groceries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.id}
              id={post.id}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              author={post.author}
              category={post.category}
            />
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}