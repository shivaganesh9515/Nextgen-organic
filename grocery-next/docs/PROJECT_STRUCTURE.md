# OrganicNext Project Structure

This document outlines the organized directory structure of the OrganicNext e-commerce platform.

## Root Directory

```
.
├── frontend/                 # Next.js frontend application
│   ├── src/                  # Source code
│   │   ├── app/              # Next.js app router pages
│   │   ├── components/       # React components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility functions and data
│   │   ├── styles/           # CSS and styling files
│   │   └── types/            # TypeScript types
│   ├── public/               # Static assets
│   ├── next.config.ts        # Next.js configuration
│   ├── tsconfig.json         # TypeScript configuration
│   ├── tailwind.config.js    # Tailwind CSS configuration
│   ├── postcss.config.mjs    # PostCSS configuration
│   └── eslint.config.mjs     # ESLint configuration
│
├── backend/                  # Backend services and database
│   ├── prisma/               # Prisma schema and migrations
│   │   ├── schema.prisma     # Database schema
│   │   └── seed.ts           # Database seeding script
│   ├── prisma.config.ts      # Prisma configuration
│   └── test-setup.ts         # Backend test setup
│
├── docs/                     # Project documentation
│   ├── SETUP.md              # Setup and installation guide
│   └── PROJECT_STRUCTURE.md  # This file
│
├── middleware.ts             # Next.js middleware (root level)
├── package.json              # Root package configuration
├── package-lock.json         # NPM lock file
└── README.md                # Project overview and quick start
```

## Frontend Structure

### `src/app/` - Next.js App Router

Contains all page components organized by route:
- `/` - Home page
- `/shop` - Product listing and shopping pages
- `/vendors` - Vendor-related pages
- `/account` - User account management
- `/blog` - Blog and article pages
- `/auth` - Authentication pages

### `src/components/` - React Components

Organized using atomic design principles:
- **UI Components** (`src/components/ui/`) - Reusable UI elements
- **Shop Components** (`src/components/shop/`) - E-commerce specific components
- **Common Components** (`src/components/common/`) - Shared components
- **Vendor Components** (`src/components/vendors/`) - Vendor-specific components

### `src/hooks/` - Custom React Hooks

Custom hooks for:
- Cart management
- Wishlist functionality
- Authentication
- Data fetching
- UI interactions

### `src/lib/` - Utility Functions

- **Data** (`src/lib/data/`) - Static data files
- **Types** (`src/lib/types/`) - TypeScript type definitions
- **Utils** (`src/lib/utils/`) - Helper functions

### `src/styles/` - Styling

- `globals.css` - Global CSS styles and Tailwind configuration
- `stability.css` - CSS for preventing UI flickering

## Backend Structure

### `prisma/` - Database Management

- `schema.prisma` - Database schema definition
- `seed.ts` - Database seeding script

## Documentation

All project documentation is stored in the `docs/` directory:
- `SETUP.md` - Detailed installation and configuration guide
- `PROJECT_STRUCTURE.md` - This file describing the directory organization

## Key Design Principles

1. **Separation of Concerns** - Frontend and backend code are completely separated
2. **Atomic Design** - Components organized by complexity level
3. **Type Safety** - Full TypeScript implementation
4. **Responsive Design** - Mobile-first approach
5. **Performance Optimization** - Lazy loading and efficient rendering
6. **Accessibility** - WCAG compliant components
7. **Scalability** - Modular architecture for easy expansion

## Asset Organization

### Images
Static images are stored in `frontend/public/images/`:
- `hero/` - Homepage carousel images
- Product and category images
- Vendor logos and banners
- UI icons and graphics

### Styles
CSS files are organized in `frontend/src/styles/`:
- `globals.css` - Global styles and Tailwind configuration
- `stability.css` - Performance optimization styles

## Configuration Files

### Frontend Configuration
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.mjs` - PostCSS configuration
- `eslint.config.mjs` - ESLint configuration

### Backend Configuration
- `prisma.config.ts` - Prisma ORM configuration

## Environment Management

Environment variables are managed through:
- `.env` - Local development environment
- Vercel/production environment variables - Deployment environments

This structure ensures maintainability, scalability, and clear separation of concerns while following modern development best practices.