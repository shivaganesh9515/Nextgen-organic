import { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'fruits',
    name: 'Fruits & Vegetables',
    description: 'Fresh fruits and vegetables delivered daily',
    image: '/images/categories/fruits.jpg',
    icon: '🥦',
    subcategories: [
      { id: 'fresh-fruits', name: 'Fresh Fruits', description: 'Seasonal fresh fruits' },
      { id: 'fresh-vegetables', name: 'Fresh Vegetables', description: 'Farm fresh vegetables' },
      { id: 'herbs', name: 'Herbs & Seasonings', description: 'Fresh herbs and spices' },
      { id: 'organic', name: 'Organic Produce', description: 'Certified organic products' },
    ],
  },
  {
    id: 'bakery',
    name: 'Bakery & Biscuits',
    description: 'Fresh baked goods and biscuits',
    image: '/images/categories/bakery.jpg',
    icon: '🍞',
    subcategories: [
      { id: 'bread', name: 'Bread', description: 'Fresh baked breads' },
      { id: 'biscuits', name: 'Biscuits & Cookies', description: 'Sweet and savory biscuits' },
      { id: 'cakes', name: 'Cakes & Pastries', description: 'Delicious cakes and pastries' },
    ],
  },
  {
    id: 'dairy',
    name: 'Dairy & Eggs',
    description: 'Fresh dairy products and eggs',
    image: '/images/categories/dairy.jpg',
    icon: '🥛',
    subcategories: [
      { id: 'milk', name: 'Milk & Milk Drinks', description: 'Fresh milk and flavored drinks' },
      { id: 'butter-cheese', name: 'Butter & Cheese', description: 'Dairy spreads and cheese' },
      { id: 'eggs', name: 'Eggs', description: 'Fresh farm eggs' },
      { id: 'yogurt', name: 'Curd & Yogurt', description: 'Fresh curd and yogurt' },
    ],
  },
  {
    id: 'snacks',
    name: 'Snacks & Munchies',
    description: 'Delicious snacks and munchies',
    image: '/images/categories/snacks.jpg',
    icon: '🍿',
    subcategories: [
      { id: 'chips', name: 'Chips & Crisps', description: 'Crispy chips and crisps' },
      { id: 'nuts', name: 'Nuts & Seeds', description: 'Healthy nuts and seeds' },
      { id: 'namkeen', name: 'Namkeen', description: 'Traditional Indian snacks' },
    ],
  },
  {
    id: 'beverages',
    name: 'Beverages',
    description: 'Refreshing drinks and beverages',
    image: '/images/categories/beverages.jpg',
    icon: '🥤',
    subcategories: [
      { id: 'soft-drinks', name: 'Soft Drinks', description: 'Carbonated beverages' },
      { id: 'juices', name: 'Juices', description: 'Fresh fruit juices' },
      { id: 'tea-coffee', name: 'Tea & Coffee', description: 'Premium tea and coffee' },
    ],
  },
];