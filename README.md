# NextGen Organic E-Commerce Platform

A premium, full-featured organic grocery e-commerce platform built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core E-Commerce Features
- ✅ Complete product catalog with search and filters
- ✅ Shopping cart functionality
- ✅ Order management system
- ✅ Payment integration (Stripe & Razorpay ready)
- ✅ User authentication (NextAuth with Google OAuth)
- ✅ Role-based access control (User, Vendor, Admin)

### Vendor Management
- ✅ Vendor registration and approval system
- ✅ Product upload and management
- ✅ Vendor dashboard with analytics
- ✅ Order fulfillment system

### Admin Features
- ✅ Admin dashboard
- ✅ Product and vendor approval system
- ✅ User management
- ✅ Analytics and reporting

### User Experience
- ✅ Beautiful, modern UI design
- ✅ Smooth animations and transitions
- ✅ Responsive design (mobile-first)
- ✅ Product reviews and ratings
- ✅ Wishlist functionality
- ✅ Refund system

## 🎨 Design Highlights

### Modern UI Components
- Gradient buttons with hover effects
- Animated cards with smooth transitions
- Professional color scheme (Green/Emerald theme)
- Loading states and skeleton screens
- Enhanced focus states for accessibility

### Animations
- Smooth scroll animations
- Hover effects on interactive elements
- Loading animations
- Gradient text effects
- Card transforms on hover

## 📁 Project Structure

```
.
├── client/                 # Frontend (Next.js)
│   ├── app/               # Next.js app router pages
│   ├── components/        # React components
│   │   ├── ui/           # Base UI components (Shadcn/ui)
│   │   ├── layout/       # Layout components
│   │   ├── home-sections/ # Homepage sections
│   │   └── custom/       # Custom components
│   ├── lib/              # Utility functions
│   ├── store/            # Zustand state management
│   └── public/           # Static assets
│
├── server/                # Backend API
│   ├── api/              # API routes
│   ├── models/           # MongoDB models
│   └── server.ts         # Express server
│
└── ...                    # Configuration files
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui + Radix UI
- **State Management**: Zustand
- **Authentication**: NextAuth.js
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **File Upload**: Cloudinary
- **Payments**: Stripe, Razorpay

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Nextgen-organic
   ```

2. **Install dependencies**

   Frontend:
   ```bash
   cd client
   npm install
   ```

   Backend:
   ```bash
   cd server
   npm install
   ```

3. **Set up environment variables**

   Create `.env.local` in `client/`:
   ```env
   MONGODB_URI=your_mongodb_uri
   NEXTAUTH_SECRET=your_secret
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_ID=your_google_client_id
   GOOGLE_SECRET=your_google_client_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   STRIPE_SECRET_KEY=your_stripe_key
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```

   Create `.env` in `server/`:
   ```env
   MONGODB_URI=your_mongodb_uri
   PORT=5000
   ```

4. **Run the development server**

   Frontend:
   ```bash
   cd client
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

   Backend:
   ```bash
   cd server
   npm run dev
   ```
   Server runs on [http://localhost:5000](http://localhost:5000)

## 📝 Recent Improvements

### Critical Fixes
- ✅ Fixed all syntax errors in API routes
- ✅ Fixed NextAuth configuration
- ✅ Improved error handling
- ✅ Enhanced type safety

### UI Enhancements
- ✅ Polished button components with gradients and animations
- ✅ Enhanced product cards with hover effects
- ✅ Improved hero section with animations
- ✅ Better color scheme and typography
- ✅ Added loading states and skeleton screens

### Performance
- ✅ Optimized component rendering
- ✅ Improved image handling
- ✅ Better code splitting

## 🎯 Roadmap

- [ ] Advanced search with AI recommendations
- [ ] Mobile app (React Native)
- [ ] Live chat support
- [ ] Advanced analytics dashboard
- [ ] Email marketing integration
- [ ] Loyalty program enhancements
- [ ] Multi-language support

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For questions or suggestions, please contact the development team.

## 📞 Support

For support, email support@nextgenorganic.com or create an issue in the repository.

---

**Built with ❤️ for fresh, organic living**