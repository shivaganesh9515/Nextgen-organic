# Platform Access Guide

This guide explains how to access the NextGen Organics platform as different user roles: Customer, Vendor, and Admin.

## Role-Based Access Overview

The platform supports three distinct user roles, each with specific permissions and access to different areas of the application:

1. **Customer** - Browse products, make purchases, manage orders
2. **Vendor** - Manage products, view sales, handle orders
3. **Admin** - Platform management, user moderation, system oversight

## Demo Credentials

For testing purposes during development, use the following demo credentials to access each role:

### Customer Demo Credentials
- **Email**: customer@example.com
- **Password**: customer123
- **Dashboard**: `/account/user-dashboard`

### Vendor Demo Credentials
- **Email**: vendor@example.com
- **Password**: vendor123
- **Dashboard**: `/vendor/vendor-dashboard`

### Admin Demo Credentials
- **Email**: admin@example.com
- **Password**: admin123
- **Dashboard**: `/admin/admin-dashboard`

## Access Instructions

### 1. Customer Access

**Login Process:**
1. Navigate to the login page at `/auth/login`
2. Select "Customer" role from the role selection screen
3. Enter email: `customer@example.com`
4. Enter password: `customer123`
5. Click "Login"
6. You will be redirected to the homepage

**Customer Features:**
- Browse and search products in the shop
- Add items to cart and proceed to checkout
- View order history and track shipments
- Manage wishlist and saved items
- Access subscription services
- Participate in loyalty programs
- View personalized recommendations
- Manage account settings and preferences

**Customer Dashboard Navigation:**
- URL: `/account/user-dashboard`
- Access via: User profile icon in header → "My Account"
- Sections include:
  - Profile overview
  - Recent orders
  - Wishlist
  - Subscription management
  - Account settings

### 2. Vendor Access

**Pre-registered Vendor Demo Account:**
- **Email**: vendor@example.com
- **Password**: vendor123
- **Status**: Pre-approved for testing

**Login Process:**
1. Navigate to the login page at `/auth/login`
2. Select "Vendor" role from the role selection screen
3. Enter email: `vendor@example.com`
4. Enter password: `vendor123`
5. Click "Login"
6. You will be redirected to the vendor dashboard

**Vendor Features:**
- Manage product listings (add, edit, delete)
- View sales analytics and revenue reports
- Process and fulfill customer orders
- Update inventory levels
- Manage store information and branding
- View customer reviews and ratings
- Access vendor performance metrics

**Vendor Dashboard Navigation:**
- URL: `/vendor/vendor-dashboard`
- Access via: User profile icon in header → "Dashboard" (when logged in as vendor)
- Sections include:
  - Store performance overview
  - Recent orders
  - Product management
  - Inventory tracking
  - Financial reports
  - Customer reviews

**Vendor Registration (Optional):**
1. Navigate to `/auth/vendor-register`
2. Fill out the vendor registration form
3. For testing purposes, use any valid information
4. Account will be auto-approved in development mode

### 3. Admin Access

**Login Process:**
1. Navigate to the login page at `/auth/login`
2. Select "Admin" role from the role selection screen
3. Enter email: `admin@example.com`
4. Enter password: `admin123`
5. Click "Login"
6. You will be redirected to the admin dashboard

**Admin Features:**
- Approve/reject vendor applications
- Moderate product listings and content
- Monitor platform health and performance metrics
- Manage all user accounts (customers, vendors, other admins)
- View comprehensive platform analytics
- Handle customer support tickets and disputes
- Manage promotional campaigns and discounts
- Configure system settings and policies

**Admin Dashboard Navigation:**
- URL: `/admin/admin-dashboard`
- Access via: User profile icon in header → "Dashboard" (when logged in as admin)
- Sections include:
  - Platform overview and analytics
  - User management
  - Vendor applications
  - Product moderation
  - Order monitoring
  - Support ticket system
  - System configuration

## Development Notes

### Authentication Flow
The platform uses a role-based authentication system:
1. Users select their role during login
2. Credentials are validated against the selected role
3. Users are redirected to role-specific dashboards
4. Navigation and permissions are controlled based on role

### Route Structure
- **Customer Routes**: `/account/*`
- **Vendor Routes**: `/vendor/*`
- **Admin Routes**: `/admin/*`
- **Public Routes**: `/shop/*`, `/products/*`, `/vendors/*`, `/blog/*`

### Testing Different Roles
In development mode:
- Use the provided demo credentials for each role
- Role selection determines which dashboard you access
- All features are available for testing regardless of actual permissions
- You can switch roles by logging out and logging back in with different credentials

### Quick Access URLs
- **Customer Dashboard**: http://localhost:3000/account/user-dashboard
- **Vendor Dashboard**: http://localhost:3000/vendor/vendor-dashboard
- **Admin Dashboard**: http://localhost:3000/admin/admin-dashboard
- **Login Page**: http://localhost:3000/auth/login

## Troubleshooting

**Login Issues:**
- Ensure you've selected the correct role before entering credentials
- Check that you're using the correct dashboard URLs for your role
- Clear browser cache if experiencing navigation issues
- Verify you're using the exact demo credentials provided

**Dashboard Access:**
- Customers should access `/account/user-dashboard`
- Vendors should access `/vendor/vendor-dashboard`
- Admins should access `/admin/admin-dashboard`

**Role Switching:**
- Log out and log back in to switch roles
- Role is determined at login and cannot be changed without re-authentication

**Development Environment:**
- Ensure the development server is running (`npm run dev`)
- Check that all required environment variables are set
- Verify database connections are properly configured