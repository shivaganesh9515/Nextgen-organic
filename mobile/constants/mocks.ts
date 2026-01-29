export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string; // URL or local asset require path (placeholder for now)
  rating: number;
  reviews: number;
  vendorId: string;
  categoryId: string;
  isNew?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Vendor {
  id: string;
  name: string;
  rating: number;
  location: string;
  image: string;
}

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Vegetables', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400' },
  { id: '2', name: 'Fruits', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400' },
  { id: '3', name: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
  { id: '4', name: 'Essentials', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400' },
  { id: '5', name: 'Snacks', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400' },
];

export const VENDORS: Vendor[] = [
  { id: 'v1', name: 'Green Valley Farms', rating: 4.8, location: 'California, USA', image: 'https://placehold.co/100x100/png?text=GV' },
  { id: 'v2', name: 'Nature\'s Best', rating: 4.5, location: 'Oregon, USA', image: 'https://placehold.co/100x100/png?text=NB' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Organic Red Tomatoes',
    description: 'Fresh, juicy, and pesticide-free organic tomatoes sourced from local farms.',
    price: 40,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500',
    rating: 4.8,
    reviews: 150,
    vendorId: 'v1',
    categoryId: '1',
    isNew: true,
  },
  {
    id: 'p2',
    name: 'Fresh Spinach Bundle',
    description: 'Nutrient-rich leafy greens, harvested this morning.',
    price: 15,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500',
    rating: 4.9,
    reviews: 80,
    vendorId: 'v1',
    categoryId: '1',
  },
  {
    id: 'p3',
    name: 'Raw Honey (Wild)',
    description: '100% pure wild forest honey. Unprocessed and unfiltered.',
    price: 850, 
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500',
    rating: 5.0,
    reviews: 210,
    vendorId: 'v2',
    categoryId: '4',
  },
  {
    id: 'p4',
    name: 'Sona Masoori Rice',
    description: 'Premium aged aromatic rice, perfect for daily meals.',
    price: 65,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500', 
    rating: 4.6,
    reviews: 320,
    vendorId: 'v2',
    categoryId: '4', // Essentials/Grains
  },
  {
    id: 'p5',
    name: 'Guntur Chillies',
    description: 'Spicy, dried red chillies from Guntur. High heat level.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1563714272436-1e5631557371?w=500',
    rating: 4.7,
    reviews: 95,
    vendorId: 'v1',
    categoryId: '5', // Snacks/Spices
  },
  {
    id: 'p6',
    name: 'Fresh Mangoes',
    description: 'Sweet, juicy, and naturally ripened organic mangoes.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500',
    rating: 4.9,
    reviews: 400,
    vendorId: 'v2',
    categoryId: '2',
  }
];
