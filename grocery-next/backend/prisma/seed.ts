import { PrismaClient, UserRole, VendorStatus } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  await prisma.cartItem.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.review.deleteMany();
  await prisma.bulkOrderItem.deleteMany();
  await prisma.bulkOrder.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.orderTracking.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.subcategory.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.vendor.deleteMany();
  await prisma.user.deleteMany();

  // Hash password
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: 'admin@organicnext.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      emailVerified: true,
    },
  });

  // Create customers
  const customers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'customer1@example.com',
        password: hashedPassword,
        firstName: 'John',
        lastName: 'Doe',
        phone: '9876543210',
        role: UserRole.CUSTOMER,
        emailVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'customer2@example.com',
        password: hashedPassword,
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '9876543211',
        role: UserRole.CUSTOMER,
        emailVerified: true,
      },
    }),
  ]);

  // Create vendor users
  const vendorUsers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'vendor1@example.com',
        password: hashedPassword,
        firstName: 'Raj',
        lastName: 'Kumar',
        phone: '9876543212',
        role: UserRole.VENDOR,
        emailVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'vendor2@example.com',
        password: hashedPassword,
        firstName: 'Priya',
        lastName: 'Sharma',
        phone: '9876543213',
        role: UserRole.VENDOR,
        emailVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'vendor3@example.com',
        password: hashedPassword,
        firstName: 'Amit',
        lastName: 'Patel',
        phone: '9876543214',
        role: UserRole.VENDOR,
        emailVerified: true,
      },
    }),
  ]);

  // Create vendors
  const vendors = await Promise.all([
    prisma.vendor.create({
      data: {
        userId: vendorUsers[0].id,
        businessName: 'Green Valley Farms',
        businessType: 'Organic Farm',
        description: 'Fresh organic produce directly from our certified organic farm',
        address: '123 Farm Road',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560001',
        phone: '9876543212',
        status: VendorStatus.APPROVED,
        rating: 4.8,
        totalReviews: 156,
        totalSales: 245000,
      },
    }),
    prisma.vendor.create({
      data: {
        userId: vendorUsers[1].id,
        businessName: 'Organic Haven',
        businessType: 'Organic Store',
        description: 'Premium organic groceries and health products',
        address: '456 Market Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        phone: '9876543213',
        status: VendorStatus.APPROVED,
        rating: 4.9,
        totalReviews: 203,
        totalSales: 380000,
      },
    }),
    prisma.vendor.create({
      data: {
        userId: vendorUsers[2].id,
        businessName: 'Fresh Fields',
        businessType: 'Organic Wholesaler',
        description: 'Bulk organic products at wholesale prices',
        address: '789 Wholesale Market',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001',
        phone: '9876543214',
        status: VendorStatus.APPROVED,
        rating: 4.7,
        totalReviews: 142,
        totalSales: 520000,
      },
    }),
  ]);

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Fruits',
        slug: 'fruits',
        icon: '🍎',
        description: 'Fresh organic fruits',
        sortOrder: 1,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Vegetables',
        slug: 'vegetables',
        icon: '🥕',
        description: 'Fresh organic vegetables',
        sortOrder: 2,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Dairy & Eggs',
        slug: 'dairy-eggs',
        icon: '🥛',
        description: 'Organic dairy products and eggs',
        sortOrder: 3,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Grains & Rice',
        slug: 'grains-rice',
        icon: '🌾',
        description: 'Organic grains and rice varieties',
        sortOrder: 4,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Spices & Herbs',
        slug: 'spices-herbs',
        icon: '🌶️',
        description: 'Pure organic spices and herbs',
        sortOrder: 5,
      },
    }),
  ]);

  // Create subcategories
  const subcategories = await Promise.all([
    // Fruits subcategories
    prisma.subcategory.create({
      data: {
        categoryId: categories[0].id,
        name: 'Apples',
        slug: 'apples',
        sortOrder: 1,
      },
    }),
    prisma.subcategory.create({
      data: {
        categoryId: categories[0].id,
        name: 'Bananas',
        slug: 'bananas',
        sortOrder: 2,
      },
    }),
    prisma.subcategory.create({
      data: {
        categoryId: categories[0].id,
        name: 'Berries',
        slug: 'berries',
        sortOrder: 3,
      },
    }),
    // Vegetables subcategories
    prisma.subcategory.create({
      data: {
        categoryId: categories[1].id,
        name: 'Leafy Greens',
        slug: 'leafy-greens',
        sortOrder: 1,
      },
    }),
    prisma.subcategory.create({
      data: {
        categoryId: categories[1].id,
        name: 'Root Vegetables',
        slug: 'root-vegetables',
        sortOrder: 2,
      },
    }),
    // Dairy subcategories
    prisma.subcategory.create({
      data: {
        categoryId: categories[2].id,
        name: 'Milk',
        slug: 'milk',
        sortOrder: 1,
      },
    }),
    prisma.subcategory.create({
      data: {
        categoryId: categories[2].id,
        name: 'Cheese',
        slug: 'cheese',
        sortOrder: 2,
      },
    }),
  ]);

  // Create products
  const products = await Promise.all([
    // Green Valley Farms products
    prisma.product.create({
      data: {
        vendorId: vendors[0].id,
        categoryId: categories[0].id,
        subcategoryId: subcategories[0].id,
        name: 'Organic Red Apples',
        slug: 'organic-red-apples',
        description: 'Fresh, crispy organic red apples from our farm',
        images: ['/images/products/red-apples.jpg'],
        unit: 'kg',
        price: 180,
        discountPrice: 150,
        stock: 100,
        minOrderQty: 1,
        maxOrderQty: 20,
        certifications: ['India Organic', 'FSSAI'],
        tags: ['fresh', 'seasonal', 'popular'],
        isFeatured: true,
        rating: 4.7,
        reviewCount: 45,
        sales: 230,
      },
    }),
    prisma.product.create({
      data: {
        vendorId: vendors[0].id,
        categoryId: categories[0].id,
        subcategoryId: subcategories[1].id,
        name: 'Organic Bananas',
        slug: 'organic-bananas',
        description: 'Sweet and naturally ripened organic bananas',
        images: ['/images/products/bananas.jpg'],
        unit: 'dozen',
        price: 60,
        stock: 150,
        minOrderQty: 1,
        maxOrderQty: 10,
        certifications: ['India Organic'],
        tags: ['fresh', 'popular'],
        isFeatured: true,
        rating: 4.8,
        reviewCount: 67,
        sales: 450,
      },
    }),
    prisma.product.create({
      data: {
        vendorId: vendors[0].id,
        categoryId: categories[1].id,
        subcategoryId: subcategories[3].id,
        name: 'Organic Spinach',
        slug: 'organic-spinach',
        description: 'Fresh organic spinach leaves, rich in iron',
        images: ['/images/products/spinach.jpg'],
        unit: 'bundle',
        price: 30,
        stock: 80,
        minOrderQty: 1,
        certifications: ['India Organic'],
        tags: ['fresh', 'leafy-green'],
        rating: 4.6,
        reviewCount: 34,
        sales: 180,
      },
    }),
    // Organic Haven products
    prisma.product.create({
      data: {
        vendorId: vendors[1].id,
        categoryId: categories[2].id,
        subcategoryId: subcategories[5].id,
        name: 'Organic A2 Milk',
        slug: 'organic-a2-milk',
        description: 'Pure A2 milk from grass-fed cows',
        images: ['/images/products/a2-milk.jpg'],
        unit: 'liter',
        price: 80,
        stock: 50,
        minOrderQty: 1,
        maxOrderQty: 10,
        certifications: ['India Organic', 'FSSAI'],
        tags: ['dairy', 'fresh', 'a2'],
        shelfLife: '3 days',
        isFeatured: true,
        rating: 4.9,
        reviewCount: 89,
        sales: 320,
      },
    }),
    prisma.product.create({
      data: {
        vendorId: vendors[1].id,
        categoryId: categories[3].id,
        name: 'Organic Basmati Rice',
        slug: 'organic-basmati-rice',
        description: 'Premium aged organic basmati rice',
        images: ['/images/products/basmati-rice.jpg'],
        unit: 'kg',
        price: 200,
        discountPrice: 180,
        stock: 200,
        minOrderQty: 1,
        maxOrderQty: 50,
        certifications: ['India Organic', 'USDA Organic'],
        tags: ['rice', 'premium', 'aged'],
        shelfLife: '12 months',
        isFeatured: true,
        rating: 4.8,
        reviewCount: 123,
        sales: 560,
      },
    }),
    // Fresh Fields products
    prisma.product.create({
      data: {
        vendorId: vendors[2].id,
        categoryId: categories[1].id,
        subcategoryId: subcategories[4].id,
        name: 'Organic Potatoes',
        slug: 'organic-potatoes',
        description: 'Fresh organic potatoes, perfect for all dishes',
        images: ['/images/products/potatoes.jpg'],
        unit: 'kg',
        price: 40,
        stock: 500,
        minOrderQty: 5,
        maxOrderQty: 100,
        certifications: ['India Organic'],
        tags: ['bulk', 'wholesale'],
        rating: 4.5,
        reviewCount: 78,
        sales: 890,
      },
    }),
    prisma.product.create({
      data: {
        vendorId: vendors[2].id,
        categoryId: categories[4].id,
        name: 'Organic Turmeric Powder',
        slug: 'organic-turmeric-powder',
        description: 'Pure organic turmeric powder, high curcumin content',
        images: ['/images/products/turmeric.jpg'],
        unit: 'gram',
        price: 250,
        stock: 100,
        minOrderQty: 1,
        certifications: ['India Organic', 'FSSAI'],
        tags: ['spices', 'pure', 'medicinal'],
        shelfLife: '24 months',
        rating: 4.9,
        reviewCount: 156,
        sales: 430,
      },
    }),
    prisma.product.create({
      data: {
        vendorId: vendors[0].id,
        categoryId: categories[0].id,
        subcategoryId: subcategories[2].id,
        name: 'Organic Strawberries',
        slug: 'organic-strawberries',
        description: 'Sweet and juicy organic strawberries',
        images: ['/images/products/strawberries.jpg'],
        unit: 'box (250g)',
        price: 150,
        stock: 40,
        minOrderQty: 1,
        maxOrderQty: 5,
        certifications: ['India Organic'],
        tags: ['fresh', 'seasonal', 'premium'],
        shelfLife: '2 days',
        isFeatured: true,
        rating: 4.9,
        reviewCount: 92,
        sales: 210,
      },
    }),
  ]);

  // Create addresses for customers
  await prisma.address.create({
    data: {
      userId: customers[0].id,
      type: 'home',
      firstName: 'John',
      lastName: 'Doe',
      phone: '9876543210',
      address: '123 MG Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      isDefault: true,
    },
  });

  await prisma.address.create({
    data: {
      userId: customers[1].id,
      type: 'home',
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '9876543211',
      address: '456 Park Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true,
    },
  });

  // Create some reviews
  await Promise.all([
    prisma.review.create({
      data: {
        userId: customers[0].id,
        productId: products[0].id,
        rating: 5,
        title: 'Excellent quality apples',
        comment: 'Very fresh and tasty apples. Worth the price!',
        isVerified: true,
      },
    }),
    prisma.review.create({
      data: {
        userId: customers[1].id,
        productId: products[1].id,
        rating: 5,
        title: 'Best bananas ever',
        comment: 'Naturally sweet and perfectly ripe. Highly recommended!',
        isVerified: true,
      },
    }),
    prisma.review.create({
      data: {
        userId: customers[0].id,
        vendorId: vendors[0].id,
        rating: 5,
        title: 'Great vendor',
        comment: 'Always delivers fresh products on time.',
        isVerified: true,
      },
    }),
  ]);

  console.log('✅ Database seeding completed successfully!');
  console.log('');
  console.log('📊 Created:');
  console.log(`- 1 Admin user (admin@organicnext.com / password123)`);
  console.log(`- 2 Customers`);
  console.log(`- 3 Vendors`);
  console.log(`- 5 Categories`);
  console.log(`- 7 Subcategories`);
  console.log(`- ${products.length} Products`);
  console.log(`- 2 Addresses`);
  console.log(`- 3 Reviews`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });