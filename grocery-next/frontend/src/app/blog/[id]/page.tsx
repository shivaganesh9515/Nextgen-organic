'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, ChevronLeft, Share2, Bookmark, Heart } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

// Mock blog post data
const blogPost = {
  id: 1,
  title: "10 Health Benefits of Going Organic",
  excerpt: "Discover why switching to organic foods can transform your health and well-being.",
  content: `
    <p>Going organic isn't just a trend - it's a lifestyle choice that can significantly impact your health and well-being. Here are 10 compelling reasons to make the switch to organic foods:</p>
    
    <h2 className="text-2xl font-bold mt-8 mb-4">1. Higher Nutrient Density</h2>
    <p>Organic foods often contain higher levels of essential nutrients, including antioxidants, vitamins, and minerals. Studies have shown that organic fruits and vegetables can contain up to 69% more antioxidants than conventionally grown produce.</p>
    
    <h2 className="text-2xl font-bold mt-8 mb-4">2. No Synthetic Pesticides or Herbicides</h2>
    <p>Organic farming prohibits the use of synthetic pesticides and herbicides, which can be harmful to human health. By choosing organic, you reduce your exposure to these potentially toxic chemicals.</p>
    
    <h2 className="text-2xl font-bold mt-8 mb-4">3. Better for Heart Health</h2>
    <p>Organic foods are typically lower in saturated fats and free from trans fats. They also contain higher levels of heart-healthy omega-3 fatty acids, particularly in organic dairy and meat products.</p>
    
    <h2 className="text-2xl font-bold mt-8 mb-4">4. Reduced Risk of Antibiotic Resistance</h2>
    <p>Organic livestock are not given routine antibiotics, which helps reduce the risk of antibiotic-resistant bacteria. This is crucial for maintaining the effectiveness of antibiotics in treating human diseases.</p>
    
    <h2 className="text-2xl font-bold mt-8 mb-4">5. Enhanced Immune System</h2>
    <p>The higher antioxidant content in organic foods helps strengthen your immune system, making your body more resilient to infections and diseases.</p>
    
    <h2 className="text-2xl font-bold mt-8 mb-4">6. Better Taste</h2>
    <p>Many people report that organic foods taste better than their conventional counterparts. This is likely due to the healthier soil and more natural growing methods used in organic farming.</p>
    
    <h2 className="text-2xl font-bold mt-8 mb-4">7. Supports Sustainable Agriculture</h2>
    <p>By choosing organic, you're supporting farming practices that protect the environment, conserve water, reduce soil erosion, and use less energy.</p>
    
    <h2 className="text-2xl font-bold mt-8 mb-4">8. No GMOs</h2>
    <p>Organic foods are produced without genetic modification, which some studies suggest may have long-term health implications that are not yet fully understood.</p>
    
    <h2 className="text-2xl font-bold mt-8 mb-4">9. Better for Children's Development</h2>
    <p>Children are particularly vulnerable to pesticides and other chemicals. Organic foods provide a cleaner nutritional source for growing bodies and developing brains.</p>
    
    <h2 className="text-2xl font-bold mt-8 mb-4">10. Supports Local Farmers</h2>
    <p>Buying organic often means supporting local farmers who use sustainable practices, which helps strengthen your local economy and reduces the carbon footprint of your food.</p>
    
    <h2 className="text-2xl font-bold mt-8 mb-4">Making the Transition</h2>
    <p>Transitioning to an organic diet doesn't have to be overwhelming. Start by prioritizing the "Dirty Dozen" - the fruits and vegetables that typically have the highest pesticide residues when grown conventionally. Gradually expand your organic choices as your budget allows.</p>
    
    <p>Remember, the benefits of organic eating extend beyond personal health to encompass environmental sustainability and social responsibility. Every organic purchase is a vote for a healthier planet and a more sustainable food system.</p>
  `,
  author: "Dr. Priya Sharma",
  date: "2024-05-15",
  category: "Health",
  image: "/images/blog/organic-benefits.jpg",
  readTime: "5 min read",
  tags: ["organic", "health", "nutrition", "wellness"]
};

export default function BlogPostPage() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blogPost.title,
        text: blogPost.excerpt,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Back to Blog Link */}
        <Link 
          href="/blog" 
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4">
            <span className="bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full">
              {blogPost.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {blogPost.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{blogPost.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(blogPost.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>{blogPost.readTime}</span>
            </div>
          </div>
        </motion.div>

        {/* Article Image */}
        <motion.div
          className="mb-8 rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <img 
            src={blogPost.image} 
            alt={blogPost.title} 
            className="w-full h-64 md:h-96 object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Article Content */}
        <motion.div
          className="prose max-w-none mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        />

        {/* Tags */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {blogPost.tags.map((tag, index) => (
            <Link 
              key={index}
              href={`/blog?tag=${tag}`}
              className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </Link>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-wrap gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button 
            variant="outline" 
            onClick={() => setIsLiked(!isLiked)}
            className="flex items-center gap-2"
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            {isLiked ? 'Liked' : 'Like'}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="flex items-center gap-2"
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-primary-600 text-primary-600' : ''}`} />
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleShare}
            className="flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </motion.div>

        {/* Author Bio */}
        <motion.div
          className="card mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0"></div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{blogPost.author}</h3>
              <p className="text-gray-600 mt-1">
                Nutritionist and wellness expert with over 15 years of experience in promoting healthy living through organic nutrition.
              </p>
              <Link href="/authors/dr-priya-sharma" className="text-primary-600 hover:text-primary-700 font-medium mt-2 inline-block">
                View more articles
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
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
            <Button variant="secondary">
              Subscribe
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}