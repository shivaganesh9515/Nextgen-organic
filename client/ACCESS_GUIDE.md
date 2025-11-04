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
1. Navigate to the login page at `/login`
2. Select "Customer" role from the role selection screen
3. Enter your email and password
4. You will be redirected to the homepage

**Customer Features:**
- Browse and search products
- Add items to cart and checkout
- View order history
- Manage wishlist
- Access subscription services
- Participate in loyalty programs
- View personalized recommendations

**Customer Dashboard:**
- URL: `/account/user-dashboard`
- Access your account information, orders, and preferences

### 2. Vendor Access

**Registration Process:**
1. Navigate to the vendor registration page at `/auth/vendor-register`
2. Complete the vendor registration form
3. Wait for admin approval (simulated in development)

**Login Process:**
1. Navigate to the login page at `/login`
2. Select "Vendor" role from the role selection screen
3. Enter your email and password
4. You will be redirected to the vendor dashboard

**Vendor Features:**
- Manage product listings
- View sales analytics and reports
- Process customer orders
- Update inventory
- Manage store information

**Vendor Dashboard:**
- URL: `/vendor/vendor-dashboard`
- Monitor store performance and manage products

### 3. Admin Access

**Login Process:**
1. Navigate to the login page at `/login`
2. Select "Admin" role from the role selection screen
3. Enter your admin credentials
4. You will be redirected to the admin dashboard

**Admin Features:**
- Approve/reject vendor applications
- Moderate product listings
- Monitor platform health and performance
- Manage user accounts
- View platform analytics
- Handle customer support tickets

**Admin Dashboard:**
- URL: `/admin/admin-dashboard`
- Platform oversight and management tools

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

### Testing Different Roles
In development mode:
- Use any email/password combination to log in
- Role selection determines which dashboard you access
- All features are available for testing regardless of actual permissions

## Troubleshooting

**Login Issues:**
- Ensure you've selected the correct role before entering credentials
- Check that you're using the correct dashboard URLs for your role
- Clear browser cache if experiencing navigation issues

**Dashboard Access:**
- Customers should access `/account/user-dashboard`
- Vendors should access `/vendor/vendor-dashboard`
- Admins should access `/admin/admin-dashboard`

**Role Switching:**
- Log out and log back in to switch roles
- Role is determined at login and cannot be changed without re-authentication