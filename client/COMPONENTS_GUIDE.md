# NextGen Organics Component Library Guide

## Overview
This project includes a comprehensive component library organized in three files:
1. `unified-components.tsx` - Base components
2. `unified-components-v2.tsx` - Enhanced UI with navbar, vendor card, login flows
3. `ecommerce-components-v3.tsx` - Complete e-commerce: products, cart, reviews

## Installation Requirements
The components require the following dependencies which should already be installed:
- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS
- Shadcn/ui components
- Lucide React icons

## Available Components

### Navigation & Layout
- `Navbar` - Advanced navbar with role-based navigation
- `VendorRecruitmentCTA` - Vendor recruitment section for homepage

### Authentication
- `LoginPageWithRoles` - Role-based login page (Customer, Vendor, Admin)

### Homepage
- `HomePage` - Complete homepage with hero section, vendor showcase, etc.

### Vendor Components
- `VendorIDCard` - Beautiful vendor profile showcase

### E-commerce Components
- `ProductDetailPage` - Complete product page like Amazon
- `ProductCard` - Product card for listings
- `ShoppingCartPage` - Complete shopping cart page

## How to Use

### Method 1: Import Individual Components
```tsx
import { Navbar, HomePage } from '@/components';
// or more specifically
import { Navbar } from '@/components/unified-components-v2';
import { ProductDetailPage } from '@/components/ecommerce-components-v3';
```

### Method 2: Import Component Collections
```tsx
import { unifiedComponentsV2 } from '@/components';
const { Navbar, HomePage } = unifiedComponentsV2;

import { ecommerceComponentsV3 } from '@/components';
const { ProductDetailPage, ShoppingCartPage } = ecommerceComponentsV3;
```

## Implementation Steps
1. Copy the component function from the appropriate file
2. Paste into your page component
3. Replace `// TODO: fetch()` comments with your actual API calls
4. Connect to your database
5. All styling is Tailwind CSS - no additional CSS needed

## Key API Endpoints to Connect
- GET `/api/products/:id` - Product details
- POST `/api/cart` - Add item to cart
- DELETE `/api/cart/:id` - Remove item from cart
- GET `/api/vendors/:id` - Vendor details
- POST `/api/login` - User authentication

## Example Usage
```tsx
'use client';

import { ProductDetailPage } from '@/components';

export default function ProductPage({ productId }: { productId: string }) {
  return (
    <ProductDetailPage productId={productId} />
  );
}
```

## Customization
All components use Tailwind CSS classes which can be easily customized:
- Primary color: `green-600` (organic theme)
- Secondary colors: `blue-500`, `purple-500` for role-specific elements
- Responsive design: Works on mobile, tablet, and desktop

## Notes
- Components are built with TypeScript for type safety
- All components are client components ('use client' directive included)
- Components follow accessibility best practices
- Components are fully responsive and mobile-friendly