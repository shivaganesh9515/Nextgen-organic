export interface Vendor {
  id: string;
  name: string;
  image: string;
  rating: number;
  location: string;
  tags: string[];
  banner: string;
}

export interface Product {
  id: string;
  vendorId: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  isOrganic?: boolean;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

// =====================================================================
// CATEGORIES
// =====================================================================
export const CATEGORIES: Category[] = [
  { id: '1', name: 'Vegetables', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400&q=80' },
  { id: '2', name: 'Fruits', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&q=80' },
  { id: '3', name: 'Dairy', image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&q=80' },
  { id: '4', name: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80' },
  { id: '5', name: 'Aromatic', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80' },
  { id: '6', name: 'Greens', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80' },
];

// =====================================================================
// VENDORS (Contextualized)
// =====================================================================
export const VENDORS: Vendor[] = [
  {
    id: 'v1',
    name: 'Green Valley Organic Farm',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&q=80',
    rating: 4.8,
    location: 'Nashik, MH',
    tags: ['Certified Organic', 'Vegetables', 'Direct Farm'],
    banner: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80' // Green field
  },
  {
    id: 'v2',
    name: 'Pure Earth Dairy',
    image: 'https://images.unsplash.com/photo-1528642474493-227698b6d76f?w=400&q=80',
    rating: 4.9,
    location: 'Pune, MH',
    tags: ['A2 Milk', 'Ghee', 'Free Range'],
    banner: 'https://images.unsplash.com/photo-1511525287693-5777bd4d1803?w=800&q=80' // Cows grazing
  },
  {
    id: 'v3',
    name: 'Himalayan Orchard Co.',
    image: 'https://images.unsplash.com/photo-1595855709940-0538a8e31d2e?w=400&q=80',
    rating: 4.7,
    location: 'Shimla, HP',
    tags: ['Apples', 'Exotic Fruits', 'Jams'],
    banner: 'https://images.unsplash.com/photo-1589531872951-dc562d556488?w=800&q=80' // Mountains
  },
  {
    id: 'v4',
    name: 'Sunrise Spice Plantation',
    image: 'https://images.unsplash.com/photo-1532587570533-8a39c9f28639?w=400&q=80',
    rating: 4.6,
    location: 'Munnar, KL',
    tags: ['Whole Spices', 'Tea', 'Coffee'],
    banner: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80' // Spices
  },
  {
    id: 'v5',
    name: 'Urban Roots Hydroponics',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&q=80',
    rating: 4.9,
    location: 'Mumbai, MH',
    tags: ['Residue Free', 'Salad Greens', 'Superfoods'],
    banner: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&q=80' // Greenhouse
  }
];

// =====================================================================
// PRODUCTS (Curated & Reliable)
// =====================================================================
export const PRODUCTS: Product[] = [
  // --- V1: Green Valley (Veggies) ---
  {
    id: 'p1', vendorId: 'v1', name: 'Fresh Organic Tomatoes', price: 60, oldPrice: 80,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80', category: 'Vegetables',
    rating: 4.8, reviews: 124, description: 'Juicy, farm-fresh red tomatoes grown without pesticides.', isOrganic: true,
    tags: ['Natural', 'Eco-friendly']
  },
  {
    id: 'p2', vendorId: 'v1', name: 'Crunchy Spinach Bunch', price: 40, 
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&q=80', category: 'Vegetables',
    rating: 4.7, reviews: 89, description: 'Iron-rich, dark green spinach leaves harvested this morning.', isOrganic: true,
    tags: ['Chemical-free', 'Natural']
  },
  {
    id: 'p3', vendorId: 'v1', name: 'Orange Carrots (500g)', price: 55, 
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&q=80', category: 'Vegetables',
    rating: 4.9, reviews: 201, description: 'Sweet and crunchy organic carrots.', isOrganic: true,
    tags: ['Natural', 'Eco-friendly']
  },
  {
    id: 'p4', vendorId: 'v1', name: 'Bell Peppers Trio', price: 120, oldPrice: 150,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdf5efa23f?w=500&q=80', category: 'Vegetables',
    rating: 4.6, reviews: 56, description: 'Yellow, Red, and Green Capsicums pack.', isOrganic: true,
    tags: ['Chemical-free']
  },

  // --- V2: Pure Earth (Dairy) ---
  {
    id: 'p5', vendorId: 'v2', name: 'A2 Gir Cow Milk (1L)', price: 95, 
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&q=80', category: 'Dairy',
    rating: 4.9, reviews: 340, description: 'Pure A2 milk from free-grazing Gir cows. Delivered in glass bottles.', isOrganic: true,
    tags: ['Natural', 'Eco-friendly', 'Chemical-free']
  },
  {
    id: 'p6', vendorId: 'v2', name: 'Traditional Ghee (500ml)', price: 650, oldPrice: 700,
    image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc987?w=500&q=80', category: 'Dairy',
    rating: 5.0, reviews: 112, description: 'Hand-churned bilona method ghee. Golden goodness.', isOrganic: true,
    tags: ['Natural']
  },
  {
    id: 'p7', vendorId: 'v2', name: 'Farm Fresh Paneer', price: 120, 
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80', category: 'Dairy', // Generic dairy image placeholder
    rating: 4.7, reviews: 98, description: 'Soft and fresh paneer made from organic milk.', isOrganic: true,
    tags: ['Natural', 'Chemical-free']
  },

  // --- V3: Himalayan (Fruits) ---
  {
    id: 'p8', vendorId: 'v3', name: 'Shimla Apples (1kg)', price: 240, oldPrice: 280,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&q=80', category: 'Fruits',
    rating: 4.8, reviews: 210, description: 'Crisp and sweet apples directly from Himalayan orchards.', isOrganic: true,
    tags: ['Natural', 'Eco-friendly']
  },
  {
    id: 'p9', vendorId: 'v3', name: 'Peach Box', price: 180, 
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80', category: 'Fruits',
    rating: 4.6, reviews: 45, description: 'Juicy yellow peaches.', isOrganic: true,
    tags: ['Natural']
  },

  // --- V4: Sunrise (Spices/Tea) ---
  {
    id: 'p10', vendorId: 'v4', name: 'Organic Cardamom', price: 350, 
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80', category: 'Aromatic',
    rating: 4.9, reviews: 67, description: 'Bold and aromatic whole cardamom pods.', isOrganic: true,
    tags: ['Natural', 'Eco-friendly']
  },
  {
    id: 'p11', vendorId: 'v4', name: 'Assam Gold Tea', price: 450, 
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=500&q=80', category: 'Beverages',
    rating: 4.7, reviews: 156, description: 'Strong and malty CTC tea blend.', isOrganic: true,
    tags: ['Natural']
  },

  // --- V5: Urban Roots (Hydroponics) ---
  {
    id: 'p12', vendorId: 'v5', name: 'Butterhead Lettuce', price: 80, 
    image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=500&q=80', category: 'Greens',
    rating: 5.0, reviews: 88, description: 'Residue-free hydroponically grown lettuce.', isOrganic: true,
    tags: ['Chemical-free', 'Eco-friendly']
  },
  {
    id: 'p13', vendorId: 'v5', name: 'Italian Basil', price: 40, 
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&q=80', category: 'Aromatic',
    rating: 4.8, reviews: 54, description: 'Fresh aromatic basil for your pasta and pizza.', isOrganic: true,
    tags: ['Chemical-free', 'Eco-friendly', 'Natural']
  },
  {
    id: 'p14', vendorId: 'v5', name: 'Cherry Tomatoes', price: 90, 
    image: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?w=500&q=80', category: 'Vegetables',
    rating: 4.9, reviews: 112, description: 'Sweet snacking tomatoes.', isOrganic: true,
    tags: ['Natural', 'Eco-friendly']
  },
];
