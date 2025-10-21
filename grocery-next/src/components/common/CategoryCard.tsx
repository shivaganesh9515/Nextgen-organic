'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Category } from '../../lib/types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="card group flex flex-col items-center p-6 text-center hover:shadow-lg transition-all duration-300"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4 text-2xl"
      >
        {category.icon}
      </motion.div>
      
      <motion.h3 
        className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors"
        whileHover={{ color: "#16a34a" }}
      >
        <Link href={`/shop?category=${category.id}`}>
          {category.name}
        </Link>
      </motion.h3>
      
      {category.description && (
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {category.description}
        </p>
      )}
    </motion.div>
  );
}