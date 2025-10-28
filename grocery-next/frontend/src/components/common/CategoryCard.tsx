'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Category } from '../../lib/types';
import { typographyClasses } from '../../lib/typography';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="card group flex flex-col items-center p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-300 h-full"
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary-100 flex items-center justify-center mb-3 sm:mb-4 text-xl sm:text-2xl flex-shrink-0 text-primary-600"
      >
        <div className="flex items-center justify-center">
          {category.icon}
        </div>
      </motion.div>
      
      <motion.h3 
        className={`${typographyClasses.h5} group-hover:text-primary-600 transition-colors mb-1 sm:mb-2 text-gray-900 leading-tight`}
        whileHover={{ color: "#65a30d" }}
      >
        <Link href={`/shop?category=${category.id}`}>
          {category.name}
        </Link>
      </motion.h3>
      
      {category.description && (
        <p className={`${typographyClasses.bodySmall} mt-1 sm:mt-2 line-clamp-2 leading-relaxed text-center`}>
          {category.description}
        </p>
      )}
    </motion.div>
  );
}