'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { ShoppingCart, Star, Leaf, Search, Filter } from 'lucide-react';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  price: number;
  discountedPrice: number;
  discount: number;
  category: string;
  categorySlug: string;
  rating: number;
  reviewCount: number;
  image: string;
  vendor?: string;
  unit?: string;
}

// Indian products data
const indianProducts: Product[] = [
  // Fresh Vegetables (156 products - sample)
  { id: 'v1', name: 'Organic Bhindi (Okra)', price: 60, discountedPrice: 55, discount: 8, category: 'Fresh Vegetables', categorySlug: 'fresh-vegetables', rating: 4.7, reviewCount: 234, image: '', unit: '500g', vendor: 'Green Valley Farm' },
  { id: 'v2', name: 'Baingan (Eggplant)', price: 50, discountedPrice: 45, discount: 10, category: 'Fresh Vegetables', categorySlug: 'fresh-vegetables', rating: 4.6, reviewCount: 189, image: '', unit: '1kg', vendor: 'Organic Harvest' },
  { id: 'v3', name: 'Shimla Mirch (Bell Pepper)', price: 80, discountedPrice: 75, discount: 6, category: 'Fresh Vegetables', categorySlug: 'fresh-vegetables', rating: 4.8, reviewCount: 312, image: '', unit: '500g', vendor: 'Farm Fresh Direct' },
  { id: 'v4', name: 'Aloo (Potato)', price: 35, discountedPrice: 30, discount: 14, category: 'Fresh Vegetables', categorySlug: 'fresh-vegetables', rating: 4.5, reviewCount: 456, image: '', unit: '1kg', vendor: 'Nature\'s Best' },
  { id: 'v5', name: 'Pyaz (Onion)', price: 40, discountedPrice: 35, discount: 12, category: 'Fresh Vegetables', categorySlug: 'fresh-vegetables', rating: 4.6, reviewCount: 389, image: '', unit: '1kg', vendor: 'Green Valley Farm' },
  { id: 'v6', name: 'Tamatar (Tomato)', price: 55, discountedPrice: 50, discount: 9, category: 'Fresh Vegetables', categorySlug: 'fresh-vegetables', rating: 4.7, reviewCount: 523, image: '', unit: '1kg', vendor: 'Organic Harvest' },
  { id: 'v7', name: 'Gajar (Carrot)', price: 70, discountedPrice: 65, discount: 7, category: 'Fresh Vegetables', categorySlug: 'fresh-vegetables', rating: 4.8, reviewCount: 298, image: '', unit: '1kg', vendor: 'Farm Fresh Direct' },
  { id: 'v8', name: 'Dhaniya (Coriander Leaves)', price: 20, discountedPrice: 18, discount: 10, category: 'Fresh Vegetables', categorySlug: 'fresh-vegetables', rating: 4.9, reviewCount: 167, image: '', unit: '100g', vendor: 'Nature\'s Best' },
  { id: 'v9', name: 'Palak (Spinach)', price: 45, discountedPrice: 40, discount: 11, category: 'Fresh Vegetables', categorySlug: 'fresh-vegetables', rating: 4.7, reviewCount: 445, image: '', unit: '500g', vendor: 'Green Valley Farm' },
  { id: 'v10', name: 'Lauki (Bottle Gourd)', price: 40, discountedPrice: 35, discount: 12, category: 'Fresh Vegetables', categorySlug: 'fresh-vegetables', rating: 4.5, reviewCount: 234, image: '', unit: '1kg', vendor: 'Organic Harvest' },
  { id: 'v11', name: 'Tinda (Apple Gourd)', price: 50, discountedPrice: 45, discount: 10, category: 'Fresh Vegetables', categorySlug: 'fresh-vegetables', rating: 4.6, reviewCount: 156, image: '', unit: '500g', vendor: 'Farm Fresh Direct' },
  { id: 'v12', name: 'Karela (Bitter Gourd)', price: 60, discountedPrice: 55, discount: 8, category: 'Fresh Vegetables', categorySlug: 'fresh-vegetables', rating: 4.4, reviewCount: 198, image: '', unit: '500g', vendor: 'Nature\'s Best' },
  
  // Organic Fruits (124 products - sample)
  { id: 'f1', name: 'Desi Kela (Banana)', price: 50, discountedPrice: 45, discount: 10, category: 'Organic Fruits', categorySlug: 'organic-fruits', rating: 4.8, reviewCount: 678, image: '', unit: '1 dozen', vendor: 'Green Valley Farm' },
  { id: 'f2', name: 'Seb (Apple)', price: 180, discountedPrice: 160, discount: 11, category: 'Organic Fruits', categorySlug: 'organic-fruits', rating: 4.7, reviewCount: 523, image: '', unit: '1kg', vendor: 'Organic Harvest' },
  { id: 'f3', name: 'Santra (Orange)', price: 120, discountedPrice: 110, discount: 8, category: 'Organic Fruits', categorySlug: 'organic-fruits', rating: 4.6, reviewCount: 412, image: '', unit: '1kg', vendor: 'Farm Fresh Direct' },
  { id: 'f4', name: 'Aam (Mango)', price: 250, discountedPrice: 220, discount: 12, category: 'Organic Fruits', categorySlug: 'organic-fruits', rating: 4.9, reviewCount: 892, image: '', unit: '1kg', vendor: 'Nature\'s Best' },
  { id: 'f5', name: 'Angur (Grapes)', price: 150, discountedPrice: 135, discount: 10, category: 'Organic Fruits', categorySlug: 'organic-fruits', rating: 4.7, reviewCount: 367, image: '', unit: '500g', vendor: 'Green Valley Farm' },
  { id: 'f6', name: 'Papita (Papaya)', price: 80, discountedPrice: 70, discount: 12, category: 'Organic Fruits', categorySlug: 'organic-fruits', rating: 4.5, reviewCount: 289, image: '', unit: '1 piece', vendor: 'Organic Harvest' },
  { id: 'f7', name: 'Ananas (Pineapple)', price: 100, discountedPrice: 90, discount: 10, category: 'Organic Fruits', categorySlug: 'organic-fruits', rating: 4.6, reviewCount: 234, image: '', unit: '1 piece', vendor: 'Farm Fresh Direct' },
  { id: 'f8', name: 'Chikoo (Sapota)', price: 120, discountedPrice: 110, discount: 8, category: 'Organic Fruits', categorySlug: 'organic-fruits', rating: 4.7, reviewCount: 178, image: '', unit: '1kg', vendor: 'Nature\'s Best' },
  { id: 'f9', name: 'Jamun (Black Plum)', price: 200, discountedPrice: 180, discount: 10, category: 'Organic Fruits', categorySlug: 'organic-fruits', rating: 4.8, reviewCount: 145, image: '', unit: '1kg', vendor: 'Green Valley Farm' },
  { id: 'f10', name: 'Amla (Indian Gooseberry)', price: 150, discountedPrice: 135, discount: 10, category: 'Organic Fruits', categorySlug: 'organic-fruits', rating: 4.9, reviewCount: 267, image: '', unit: '500g', vendor: 'Organic Harvest' },
  
  // Dairy Products (89 products - sample)
  { id: 'd1', name: 'Organic Full Cream Milk', price: 65, discountedPrice: 60, discount: 8, category: 'Dairy Products', categorySlug: 'dairy-products', rating: 4.8, reviewCount: 1245, image: '', unit: '1 liter', vendor: 'Farm Fresh Direct' },
  { id: 'd2', name: 'Desi Ghee', price: 850, discountedPrice: 800, discount: 6, category: 'Dairy Products', categorySlug: 'dairy-products', rating: 4.9, reviewCount: 892, image: '', unit: '500g', vendor: 'Nature\'s Best' },
  { id: 'd3', name: 'Organic Paneer', price: 280, discountedPrice: 250, discount: 11, category: 'Dairy Products', categorySlug: 'dairy-products', rating: 4.7, reviewCount: 567, image: '', unit: '500g', vendor: 'Green Valley Farm' },
  { id: 'd4', name: 'Organic Curd', price: 55, discountedPrice: 50, discount: 9, category: 'Dairy Products', categorySlug: 'dairy-products', rating: 4.6, reviewCount: 723, image: '', unit: '500g', vendor: 'Organic Harvest' },
  { id: 'd5', name: 'Butter', price: 450, discountedPrice: 420, discount: 7, category: 'Dairy Products', categorySlug: 'dairy-products', rating: 4.8, reviewCount: 434, image: '', unit: '500g', vendor: 'Farm Fresh Direct' },
  
  // Fresh Herbs (45 products - sample)
  { id: 'h1', name: 'Tulsi (Holy Basil)', price: 50, discountedPrice: 45, discount: 10, category: 'Fresh Herbs', categorySlug: 'fresh-herbs', rating: 4.9, reviewCount: 234, image: '', unit: '100g', vendor: 'Nature\'s Best' },
  { id: 'h2', name: 'Mint Leaves (Pudina)', price: 30, discountedPrice: 25, discount: 17, category: 'Fresh Herbs', categorySlug: 'fresh-herbs', rating: 4.8, reviewCount: 456, image: '', unit: '100g', vendor: 'Green Valley Farm' },
  { id: 'h3', name: 'Curry Leaves (Kadi Patta)', price: 20, discountedPrice: 18, discount: 10, category: 'Fresh Herbs', categorySlug: 'fresh-herbs', rating: 4.7, reviewCount: 389, image: '', unit: '100g', vendor: 'Organic Harvest' },
  
  // Bakery Items (67 products - sample)
  { id: 'b1', name: 'Organic Whole Wheat Roti', price: 120, discountedPrice: 110, discount: 8, category: 'Bakery Items', categorySlug: 'bakery-items', rating: 4.6, reviewCount: 523, image: '', unit: '10 pieces', vendor: 'Farm Fresh Direct' },
  { id: 'b2', name: 'Brown Bread', price: 55, discountedPrice: 50, discount: 9, category: 'Bakery Items', categorySlug: 'bakery-items', rating: 4.7, reviewCount: 678, image: '', unit: '400g', vendor: 'Nature\'s Best' },
  { id: 'b3', name: 'Organic Paratha', price: 180, discountedPrice: 160, discount: 11, category: 'Bakery Items', categorySlug: 'bakery-items', rating: 4.8, reviewCount: 445, image: '', unit: '6 pieces', vendor: 'Green Valley Farm' },
  
  // Spices & Oils (92 products - sample)
  { id: 's1', name: 'Turmeric Powder (Haldi)', price: 120, discountedPrice: 110, discount: 8, category: 'Spices & Oils', categorySlug: 'spices-oils', rating: 4.9, reviewCount: 892, image: '', unit: '250g', vendor: 'Organic Harvest' },
  { id: 's2', name: 'Cumin Seeds (Jeera)', price: 150, discountedPrice: 135, discount: 10, category: 'Spices & Oils', categorySlug: 'spices-oils', rating: 4.8, reviewCount: 567, image: '', unit: '250g', vendor: 'Farm Fresh Direct' },
  { id: 's3', name: 'Mustard Oil (Sarson Ka Tel)', price: 180, discountedPrice: 165, discount: 8, category: 'Spices & Oils', categorySlug: 'spices-oils', rating: 4.7, reviewCount: 723, image: '', unit: '1 liter', vendor: 'Nature\'s Best' },
  { id: 's4', name: 'Red Chili Powder (Lal Mirch)', price: 100, discountedPrice: 90, discount: 10, category: 'Spices & Oils', categorySlug: 'spices-oils', rating: 4.6, reviewCount: 634, image: '', unit: '250g', vendor: 'Green Valley Farm' },
];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>(categoryParam || 'all');
  const [sortOption, setSortOption] = useState('popular');

  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setProducts(indianProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (categoryParam) {
      setCategoryFilter(categoryParam);
    }
  }, [categoryParam]);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.discountedPrice,
      image: product.image || '/placeholder.svg',
      vendorId: product.vendor || 'vendor1',
    });
  };

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || product.categorySlug === categoryFilter || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOption === 'price-low') return a.discountedPrice - b.discountedPrice;
      if (sortOption === 'price-high') return b.discountedPrice - a.discountedPrice;
      if (sortOption === 'rating') return b.rating - a.rating;
      return 0;
    });

  // Get unique categories
  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'fresh-vegetables', label: 'Fresh Vegetables' },
    { value: 'organic-fruits', label: 'Organic Fruits' },
    { value: 'dairy-products', label: 'Dairy Products' },
    { value: 'fresh-herbs', label: 'Fresh Herbs' },
    { value: 'bakery-items', label: 'Bakery Items' },
    { value: 'spices-oils', label: 'Spices & Oils' },
  ];

  const currentCategory = categories.find(cat => cat.value === categoryFilter);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="spinner-organic w-12 h-12 mx-auto mb-4"></div>
            <p className="text-[#5a5a5a]">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nature-pattern py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gradient-organic">
            {currentCategory?.label || 'All Products'}
          </h1>
          <p className="text-[#5a5a5a] text-lg">
            {filteredProducts.length} products available
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-[#d4c4a8]/30">
          <div className="flex items-center gap-4 flex-1">
            <Search className="w-5 h-5 text-[#8b8b8b]" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 max-w-md input-organic"
            />
          </div>
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-[#8b8b8b]" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48 input-organic">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-48 input-organic">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <Card className="card-organic border-2 border-[#d4c4a8]">
            <CardContent className="py-16 text-center">
              <p className="text-xl text-[#5a5a5a] mb-4">No products found</p>
              <p className="text-[#8b8b8b]">Try adjusting your filters</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="card-organic group overflow-hidden border-2 border-[#d4c4a8]/50 hover:border-[#87a96b] transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2"
              >
                {/* Product Image */}
                <div className="relative h-48 bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                  {product.discount > 0 && (
                    <Badge className="absolute top-3 right-3 bg-gradient-to-r from-[#c17767] to-[#d48777] text-white">
                      -{product.discount}%
                    </Badge>
                  )}
                  <div className="absolute bottom-2 left-2">
                    <Badge className="badge-organic text-xs">
                      <Leaf className="w-3 h-3 mr-1 inline" />
                      Organic
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                    <span className="text-sm font-semibold text-[#2d5016]">{product.rating}</span>
                    <span className="text-xs text-[#8b8b8b]">({product.reviewCount})</span>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-lg font-bold text-[#2d5016] mb-2 group-hover:text-[#4a7c59] transition-colors line-clamp-2 min-h-[3rem]">
                    {product.name}
                  </h3>

                  {/* Unit */}
                  {product.unit && (
                    <p className="text-xs text-[#8b8b8b] mb-3">{product.unit}</p>
                  )}

                  {/* Vendor */}
                  {product.vendor && (
                    <p className="text-xs text-[#5a5a5a] mb-3">by {product.vendor}</p>
                  )}

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-[#4a7c59]">₹{product.discountedPrice}</span>
                      {product.discount > 0 && (
                        <span className="text-sm text-[#8b8b8b] line-through">₹{product.price}</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <Button
                    variant="organic"
                    className="w-full"
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}