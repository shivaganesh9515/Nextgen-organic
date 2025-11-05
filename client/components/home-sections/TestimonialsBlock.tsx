'use client';

import TestimonialCard from '@/components/home-sections/TestimonialCard';

export default function TestimonialsBlock() {
  // Mock testimonial data
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Regular Customer',
      company: 'Home',
      content: 'The quality of produce here is unmatched. I&#39;ve been ordering for 6 months and my family has never been happier with our groceries!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Restaurant Owner',
      company: 'Tasty Bistro',
      content: 'As a restaurant owner, quality is everything. Nextgen Organics has become our go-to supplier for fresh ingredients.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'Vendor Partner',
      company: 'Green Acres Farm',
      content: 'Joining Nextgen Organics was the best decision for my farm. Their platform has helped me reach more customers than I ever could alone.',
      rating: 5,
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Community Says</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don&#39;t just take our word for it. Here&#39;s what our customers and vendors have to say.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              role={testimonial.role}
              company={testimonial.company}
              content={testimonial.content}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
}