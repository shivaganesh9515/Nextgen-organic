// Test script to verify database setup and seeding
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testSetup() {
  try {
    console.log('Testing database connection...');
    
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Test if data was seeded
    const userCount = await prisma.user.count();
    const vendorCount = await prisma.vendor.count();
    const productCount = await prisma.product.count();
    const categoryCount = await prisma.category.count();
    
    console.log(`📊 Database contains:`);
    console.log(`   - ${userCount} users`);
    console.log(`   - ${vendorCount} vendors`);
    console.log(`   - ${productCount} products`);
    console.log(`   - ${categoryCount} categories`);
    
    if (userCount > 0 && vendorCount > 0 && productCount > 0) {
      console.log('✅ Database seeding verified successfully');
      
      // Show sample data
      console.log('\nSample data:');
      
      // Get admin user
      const admin = await prisma.user.findFirst({
        where: { role: 'ADMIN' }
      });
      console.log(`Admin: ${admin?.email}`);
      
      // Get a customer
      const customer = await prisma.user.findFirst({
        where: { role: 'CUSTOMER' }
      });
      console.log(`Customer: ${customer?.email}`);
      
      // Get a vendor
      const vendor = await prisma.vendor.findFirst();
      console.log(`Vendor: ${vendor?.businessName}`);
      
      // Get a product
      const product = await prisma.product.findFirst();
      console.log(`Product: ${product?.name}`);
    } else {
      console.log('⚠️  Database appears to be empty. Please run the seed script.');
    }
    
  } catch (error) {
    console.error('❌ Database test failed:', (error as Error).message);
    console.log('Please check your database connection and environment variables.');
  } finally {
    await prisma.$disconnect();
  }
}

testSetup();