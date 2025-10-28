# Backend Services

This directory contains all backend-related code and services for the FreshCart eCommerce application.

## Structure

```
backend/
├── prisma/               # Prisma ORM configuration and database schema
│   ├── schema.prisma     # Database schema definition
│   └── seed.ts           # Database seeding script
├── prisma.config.ts      # Prisma client configuration
└── test-setup.ts         # Backend test setup utilities
```

## Database

This project uses Prisma ORM with PostgreSQL as the database provider.

### Prisma Schema

The database schema is defined in `prisma/schema.prisma`. To make changes to the database schema:

1. Update the schema file
2. Run `npx prisma migrate dev` to create and apply migrations
3. Run `npx prisma generate` to update the Prisma client

### Seeding Data

To seed the database with initial data:

```bash
npm run seed
```

Or directly:

```bash
npx ts-node prisma/seed.ts
```

### Database Management

Prisma Studio provides a visual interface for managing the database:

```bash
npx prisma studio
```

## Environment Variables

Backend services require the following environment variables:

- `DATABASE_URL` - Connection string for the PostgreSQL database
- `NEXTAUTH_SECRET` - Secret for NextAuth.js
- `NEXTAUTH_URL` - URL for NextAuth.js callbacks

## API Routes

While some API routes may exist in the frontend `src/app/api/` directory, complex business logic and data processing should be handled here.

## Testing

Backend tests can be run using:

```bash
npm run test
```

Test setup utilities are available in `test-setup.ts`.

## Deployment

The backend services are deployed as part of the Next.js application, but can be extracted to a separate service if needed.