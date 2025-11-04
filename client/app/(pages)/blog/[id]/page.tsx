'use client';

import { Calendar, User, Tag, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "10 Health Benefits of Going Organic",
    excerpt: "Discover why switching to organic foods can transform your health and well-being.",
    content: `Going organic isn't just a trend - it's a lifestyle choice that can significantly impact your health. Here are 10 compelling reasons to make the switch:

1. **Reduced Chemical Exposure**: Organic foods are grown without synthetic pesticides, herbicides, or chemical fertilizers, reducing your exposure to potentially harmful substances.

2. **Higher Nutrient Density**: Studies show that organic produce often contains higher levels of vitamins, minerals, and antioxidants compared to conventionally grown counterparts.

3. **No GMOs**: Organic standards prohibit the use of genetically modified organisms, ensuring you consume food in its natural state.

4. **Better for Heart Health**: Organic foods typically contain lower levels of saturated fats and higher levels of heart-healthy omega-3 fatty acids.

5. **Antibiotic-Free Animal Products**: Organic meat and dairy come from animals not treated with antibiotics or growth hormones, reducing the risk of antibiotic resistance.

6. **Enhanced Flavor**: Many people find that organic foods taste better due to healthier soil and natural growing methods.

7. **Supports Local Farmers**: Buying organic often means supporting small-scale, local farmers who use sustainable practices.

8. **Environmental Protection**: Organic farming practices protect soil, water, and biodiversity, contributing to a healthier planet.

9. **Improved Digestive Health**: Organic foods are free from artificial additives and preservatives that can disrupt gut health.

10. **Long-term Health Benefits**: Choosing organic supports overall wellness and may reduce the risk of chronic diseases.

Making the switch to organic doesn't have to be overwhelming. Start by prioritizing the "Dirty Dozen" - fruits and vegetables known to have the highest pesticide residues - and gradually expand your organic choices over time.`,
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
    content: `Seasonal eating is a practice that connects us with nature's rhythm and offers numerous health and environmental benefits. Here's why it matters:

**Nutritional Benefits**
Seasonal produce is harvested at its peak ripeness, meaning it contains the highest concentration of nutrients. Fruits and vegetables that travel long distances or are stored for months lose nutritional value during transit and storage.

**Better Taste**
Seasonal foods taste better because they're allowed to ripen naturally. That summer tomato from your local farmer's market will taste infinitely better than a winter tomato shipped from thousands of miles away.

**Cost-Effective**
When produce is in season, it's abundant and less expensive. You'll save money by eating what's naturally available during each season.

**Environmental Impact**
Eating seasonally reduces the need for long-distance transportation, storage in climate-controlled facilities, and out-of-season greenhouse production - all of which have significant environmental costs.

**Supporting Local Economy**
Buying seasonal produce from local farmers keeps your money in the community and supports sustainable agriculture practices.

**Seasonal Guide**
- Spring: Asparagus, peas, strawberries, spinach
- Summer: Tomatoes, corn, berries, zucchini
- Fall: Apples, pumpkins, squash, sweet potatoes
- Winter: Citrus fruits, root vegetables, cabbage, Brussels sprouts

Try planning your meals around what's in season in your area. Visit local farmer's markets, join a CSA (Community Supported Agriculture), or simply pay attention to what looks best at the grocery store during different times of year.`,
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
    content: `The organic food aisle can be overwhelming with all the different labels and certifications. Here's a guide to help you understand what each label means:

**USDA Organic**
Products with this label must contain at least 95% organic ingredients. The remaining 5% must be on an approved list of non-organic substances.

**100% Organic**
Products labeled "100% Organic" must contain only organically produced ingredients (excluding water and salt).

**Made with Organic Ingredients**
Products with this label must contain at least 70% organic ingredients. The specific organic ingredients must be identified on the ingredient panel.

**Organic (Ingredient List)**
Products with less than 70% organic ingredients can't use the word "organic" on the front of the package but can list organic ingredients in the ingredient panel.

**Certified Organic by State**
Some states have their own organic certification programs that may be stricter than USDA standards.

**Biodynamic**
This certification goes beyond organic standards, incorporating holistic farming practices that treat the farm as a living ecosystem.

**Regenerative Organic**
A newer certification focusing on soil health, animal welfare, and social fairness for farmers and workers.

**Non-GMO Project Verified**
While not specifically an organic label, this indicates the product has been verified to be free of genetically modified organisms.

**Tips for Shopping**
1. Look for the official USDA Organic seal
2. Read ingredient lists carefully
3. Be aware that "natural" doesn't mean "organic"
4. Check for third-party certifications
5. When in doubt, buy from trusted local sources

Understanding these labels empowers you to make informed choices that align with your health and environmental values.`,
    author: "Neha Patel",
    date: "2024-05-05",
    category: "Education",
    image: "/images/blog/organic-labels.jpg",
    readTime: "6 min read"
  }
  // Add more posts as needed
];

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const postId = parseInt(params.id);
  const post = blogPosts.find(p => p.id === postId);
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">
            The blog post you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6"
        >
          <ChevronLeft className="h-5 w-5" />
          Back to Blog
        </Link>
        
        <article className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="relative h-64 md:h-80 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-100" />
            <div className="absolute top-4 left-4">
              <span className="bg-green-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <span>{post.readTime}</span>
            </div>
            
            <div className="prose max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>
        
        {/* Related Posts */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts
              .filter(p => p.id !== postId)
              .slice(0, 2)
              .map(relatedPost => (
                <Link 
                  key={relatedPost.id} 
                  href={`/blog/${relatedPost.id}`}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4 p-4">
                    <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{relatedPost.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">{relatedPost.excerpt}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{new Date(relatedPost.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}