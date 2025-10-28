# Frontend Application

This directory contains the Next.js frontend application for the FreshCart eCommerce platform.

## Structure

```
frontend/
├── src/                  # Source code
│   ├── app/              # Next.js app router pages and layouts
│   ├── components/       # React components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and data
│   ├── styles/           # CSS and styling files
│   └── types/            # TypeScript types
├── public/               # Static assets
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.mjs    # PostCSS configuration
└── eslint.config.mjs     # ESLint configuration
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technology Stack

- **Next.js 15.5.6** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Query** - Server state management
- **NextAuth.js** - Authentication

## Development

### Components

Components are organized using atomic design principles:

- `atoms/` - Basic building blocks (buttons, inputs, etc.)
- `molecules/` - Groups of atoms (forms, cards, etc.)
- `organisms/` - Groups of molecules (headers, footers, etc.)
- `templates/` - Page layouts
- `pages/` - Specific page implementations

### Styling

This project uses Tailwind CSS for styling. Custom theme configurations can be found in `tailwind.config.js`.

### Routing

Next.js App Router is used for routing. Pages are defined in the `src/app/` directory.

### Data Fetching

Data fetching is handled through:

1. Server Components (default)
2. React Query for client-side data fetching
3. API routes in `src/app/api/`

## Testing

Frontend tests can be run using:

```bash
npm run test
```

## Building

To create a production build:

```bash
npm run build
```

## Deployment

The frontend can be deployed to any platform that supports Next.js, such as Vercel, Netlify, or a custom server.

## Contributing

1. Create components in the appropriate directory under `src/components/`
2. Follow the existing code style and patterns
3. Use TypeScript for type safety
4. Write tests for new functionality
5. Update documentation as needed