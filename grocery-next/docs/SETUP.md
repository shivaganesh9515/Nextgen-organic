# OrganicNext Setup Guide

This guide provides detailed instructions for setting up the OrganicNext e-commerce platform.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (version 18 or higher)
2. **PostgreSQL** database server
3. **npm** or **yarn** package manager
4. **Git** (for version control)

## Project Structure

The project is organized into separate frontend and backend directories:

```
.
├── frontend/        # Next.js frontend application
├── backend/         # Backend services and database
├── docs/            # Documentation
├── middleware.ts    # Next.js middleware
└── package.json     # Root package configuration
```

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd grocery-next
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/organicnext?schema=public"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret-key"

# Razorpay Configuration (for payment processing)
RAZORPAY_KEY_ID="your-razorpay-key-id"
RAZORPAY_KEY_SECRET="your-razorpay-key-secret"

# Email Configuration
EMAIL_HOST="your-email-host"
EMAIL_PORT=465
EMAIL_USER="your-email-user"
EMAIL_PASSWORD="your-email-password"
EMAIL_FROM="OrganicNext <noreply@organicnext.com>"

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database Setup

#### Generate Prisma Client
```bash
npx prisma generate
```

#### Run Database Migrations
```bash
npx prisma migrate dev --name init
```

#### Seed the Database
```bash
npm run seed
```

### 5. Start the Development Server

```bash
# Development server (using webpack to avoid Turbopack issues)
npm run dev:webpack
```

The application will be available at `http://localhost:3000`.

## Testing Accounts

Use the following credentials to test different user roles:

### Admin Account
- **Email**: admin@organicnext.com
- **Password**: password123

### Customer Accounts
- **Email**: customer1@example.com
- **Password**: password123

- **Email**: customer2@example.com
- **Password**: password123

### Vendor Accounts
- **Email**: vendor1@example.com
- **Password**: password123

- **Email**: vendor2@example.com
- **Password**: password123

- **Email**: vendor3@example.com
- **Password**: password123

## Development Workflow

### Frontend Development

Navigate to the frontend directory:
```bash
cd frontend
```

Available scripts:
- `npm run dev:webpack` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend Development

Database commands:
- `npm run seed` - Seed the database
- `npx prisma studio` - Open Prisma Studio for database management
- `npx prisma migrate dev` - Create and run migrations
- `npx prisma generate` - Generate Prisma client

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Verify your `DATABASE_URL` in the `.env` file
   - Ensure PostgreSQL is running
   - Check database credentials

2. **Prisma Client Generation Failed**
   - Run `npx prisma generate` again
   - Check Prisma schema for syntax errors

3. **Authentication Not Working**
   - Verify `NEXTAUTH_URL` and `NEXTAUTH_SECRET` in `.env`
   - Check database connection

4. **Port Already in Use**
   - The app will automatically use port 3001 if 3000 is occupied
   - Check console for actual port number

### Testing Database Setup

Run the test script to verify your database setup:
```bash
npx ts-node test-setup.ts
```

## Project Architecture

### Frontend Components

The frontend follows atomic design principles:
- **Atoms**: Basic building blocks (buttons, inputs, etc.)
- **Molecules**: Groups of atoms (forms, cards, etc.)
- **Organisms**: Groups of molecules (headers, footers, etc.)
- **Templates**: Page layouts
- **Pages**: Specific page implementations

### Backend Services

The backend uses Prisma ORM with PostgreSQL:
- **Models**: Database schema definitions
- **Migrations**: Database schema changes
- **Seeding**: Initial data population
- **API Routes**: RESTful endpoints

## Deployment

### Environment Variables for Production

Ensure all environment variables are set in your production environment:
- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `EMAIL_HOST`
- `EMAIL_PORT`
- `EMAIL_USER`
- `EMAIL_PASSWORD`
- `EMAIL_FROM`
- `NEXT_PUBLIC_APP_URL`

### Vercel Deployment

1. Push code to a Git repository
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Custom Server Deployment

For custom server deployment:
1. Build the frontend: `npm run build`
2. Start the server: `npm start`
3. Ensure all environment variables are set

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)