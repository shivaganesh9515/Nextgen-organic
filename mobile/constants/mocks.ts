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
  { id: '1', name: 'Fresh Vegetables', image: 'https://placehold.co/200x200/png?text=Veg' },
  { id: '2', name: 'Organic Fruits', image: 'https://placehold.co/200x200/png?text=Fruits' },
  { id: '3', name: 'Dairy & Eggs', image: 'https://placehold.co/200x200/png?text=Dairy' },
  { id: '4', name: 'Grains & Pulses', image: 'https://placehold.co/200x200/png?text=Grains' },
];

export const VENDORS: Vendor[] = [
  { id: 'v1', name: 'Green Valley Farms', rating: 4.8, location: 'California, USA', image: 'https://placehold.co/100x100/png?text=GV' },
  { id: 'v2', name: 'Nature\'s Best', rating: 4.5, location: 'Oregon, USA', image: 'https://placehold.co/100x100/png?text=NB' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Organic Kale Bunch',
    description: 'Fresh, crunchy, and nutrient-dense organic kale.',
    price: 3.99,
    image: 'https://placehold.co/400x400/png?text=Kale',
    rating: 4.7,
    reviews: 120,
    vendorId: 'v1',
    categoryId: '1',
    isNew: true,
  },
  {
    id: 'p2',
    name: 'Free Range Eggs (Dozen)',
    description: 'Farm-fresh free range eggs with rich orange yolks.',
    price: 5.49,
    image: 'https://placehold.co/400x400/png?text=Eggs',
    rating: 4.9,
    reviews: 350,
    vendorId: 'v1',
    categoryId: '3',
  },
  {
    id: 'p3',
    name: 'Honeycrisp Apples',
    description: 'Sweet, crisp, and juicy organic apples.',
    price: 2.99, // Per lb
    image: 'https://placehold.co/400x400/png?text=Apples',
    rating: 4.6,
    reviews: 85,
    vendorId: 'v2',
    categoryId: '2',
  },
  {
    id: 'p4',
    name: 'Almond Milk',
    description: 'Unsweetened, creamy almond milk made from organic almonds.',
    price: 4.29,
    image: 'https://placehold.co/400x400/png?text=Milk',
    rating: 4.4,
    reviews: 200,
    vendorId: 'v2',
    categoryId: '3',
  },
];
