'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/Button';
import GlassyButton from '../ui/GlassyButton';
import StandardizedButton from '../ui/StandardizedButton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { typographyClasses } from '../../lib/typography';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  fallbackImage: string;
  bgColor: string;
}

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageError, setImageError] = useState<boolean>(false);

  const slides: HeroSlide[] = [
    {
      id: 1,
      title: 'Fresh Organic Groceries',
      subtitle: 'Delivered to Your Doorstep',
      description: 'Shop from 100+ local organic vendors',
      ctaText: 'Shop Now',
      ctaLink: '/shop',
      image: '/images/hero/organic-groceries.jpg',
      fallbackImage: '/images/hero/fallback-1.jpg',
      bgColor: 'bg-gradient-to-r from-green-600 to-green-800'
    },
    {
      id: 2,
      title: 'Special Offers This Week',
      subtitle: 'Save Up to 30% on Fresh Produce',
      description: 'Limited time deals on seasonal items',
      ctaText: 'View Offers',
      ctaLink: '/offers',
      image: '/images/hero/special-offers.jpg',
      fallbackImage: '/images/hero/fallback-2.jpg',
      bgColor: 'bg-gradient-to-r from-orange-600 to-red-700'
    },
    {
      id: 3,
      title: 'Become a Vendor',
      subtitle: 'Join Our Growing Community',
      description: 'List your organic products and reach thousands of customers',
      ctaText: 'Register Now',
      ctaLink: '/vendors/join',
      image: '/images/hero/become-vendor.jpg',
      fallbackImage: '/images/hero/fallback-3.jpg',
      bgColor: 'bg-gradient-to-r from-blue-600 to-purple-700'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative h-[250px] sm:h-[350px] md:h-[500px] overflow-hidden rounded-xl">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 ${
            index === currentSlide 
              ? 'opacity-100 z-10' 
              : 'opacity-0 z-0'
          }`}
          style={{
            transition: 'opacity 0.5s ease-in-out',
            display: index === currentSlide ? 'block' : 'none'
          }}
        >
          {/* Background Image with Fallback */}
          <div className={`absolute inset-0 ${slide.bgColor}`}>
            <Image
              src={imageError ? slide.fallbackImage : slide.image}
              alt={slide.title}
              fill
              className="object-cover mix-blend-overlay"
              priority={index === 0}
              onError={() => setImageError(true)}
            />
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 flex items-center h-full max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-white max-w-2xl bg-black/30 p-4 sm:p-6 rounded-lg backdrop-blur-sm">
              <h1 className={`${typographyClasses.h1} mb-2 sm:mb-3 text-white leading-tight text-center sm:text-left`}>{slide.title}</h1>
              <h2 className={`${typographyClasses.h3} mb-2 sm:mb-3 text-white leading-tight text-center sm:text-left`}>{slide.subtitle}</h2>
              <p className={`${typographyClasses.bodyLarge} mb-4 sm:mb-6 text-white text-center sm:text-left`}>{slide.description}</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center sm:justify-start">
                <Button size="lg" asChild className="w-full sm:w-auto">
                  <Link href={slide.ctaLink}>
                    {slide.ctaText}
                  </Link>
                </Button>
                <GlassyButton className="w-full sm:w-auto">
                  Quick Shop 🛒
                </GlassyButton>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrow Navigation */}
      <StandardizedButton
        variant="icon"
        size="icon"
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full z-20 w-12 h-12 flex items-center justify-center"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </StandardizedButton>
      <StandardizedButton
        variant="icon"
        size="icon"
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full z-20 w-12 h-12 flex items-center justify-center"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </StandardizedButton>
    </div>
  );
};

export default HeroSection;
