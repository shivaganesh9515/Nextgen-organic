# Comprehensive Qoder AI Prompt: Transform FreshCart to Organic Multi-Vendor Marketplace

## Project Vision & Mission

Transform the existing FreshCart React e-commerce template into a **comprehensive organic products multi-vendor marketplace** with the mission to **promote healthy living through organic products and support sustainable farming practices**. The platform will connect organic product vendors with health-conscious consumers while maintaining a minimal, clean, and user-friendly interface.

---

## Core Objectives

1. **Convert product categories** from general groceries to **organic-focused categories**
2. **Implement multi-vendor architecture** with separate vendor and admin dashboards
3. **Integrate modern dashboard UI** using Shadcn UI components
4. **Add payment gateway integration** (Razorpay for Indian market)
5. **Reorganize navigation** to remove vendor login from header and create dedicated vendor onboarding section
6. **Create role-based access control** (Admin, Vendor, Customer)
7. **Build comprehensive dashboards** for admin monitoring and vendor management

---

## 1. Product Categories Transformation

### Replace ALL existing categories with organic product categories:

#### **Primary Categories (Navigation & Footer)**

1. **Organic Fruits & Vegetables**
   - Fresh Organic Fruits (Seasonal)
   - Fresh Organic Vegetables
   - Organic Leafy Greens
   - Organic Exotic Vegetables
   - Organic Root Vegetables

2. **Organic Grains & Pulses**
   - Organic Rice (Brown, Red, Black, White)
   - Organic Wheat & Flours
   - Organic Millets (Ragi, Jowar, Bajra)
   - Organic Dals & Lentils
   - Ancient Grains (Quinoa, Amaranth)

3. **Organic Dairy & Alternatives**
   - Organic Milk & Ghee
   - Organic Paneer & Cheese
   - Organic Yogurt & Curd
   - Plant-Based Dairy Alternatives
   - Organic Butter

4. **Organic Beverages**
   - Organic Herbal Teas
   - Organic Green Tea
   - Organic Coffee
   - Organic Fruit Juices
   - Organic Health Drinks

5. **Organic Oils & Ghee**
   - Cold-Pressed Organic Oils
   - Organic Coconut Oil
   - Organic Mustard Oil
   - Organic A2 Ghee
   - Organic Sesame Oil

6. **Organic Spices & Condiments**
   - Whole Organic Spices
   - Organic Spice Powders
   - Organic Herbs
   - Organic Honey
   - Organic Jaggery & Sweeteners

7. **Organic Snacks & Dry Fruits**
   - Organic Nuts & Seeds
   - Organic Dried Fruits
   - Organic Trail Mix
   - Organic Namkeen
   - Organic Health Bars

8. **Organic Personal Care**
   - Organic Skincare
   - Organic Hair Care
   - Organic Bath & Body
   - Organic Baby Care
   - Natural Hygiene Products

9. **Organic Home Care**
   - Eco-Friendly Cleaning Products
   - Organic Laundry Detergents
   - Natural Air Fresheners
   - Sustainable Packaging Products

10. **Organic Superfoods**
    - Organic Moringa Powder
    - Organic Spirulina
    - Organic Chia Seeds
    - Organic Flax Seeds
    - Organic Wheatgrass Powder

---

## 2. Navigation Structure Redesign

### **Header Navigation (Top Bar)**

```jsx
<nav className="navbar">
  <ul className="nav-menu">
    <li className="nav-item">
      <Link to="/">Home</Link>
    </li>
    
    <li className="nav-item dropdown">
      <a href="#" className="dropdown-toggle">Shop by Category</a>
      <div className="dropdown-menu">
        <Link to="/category/fruits-vegetables">Organic Fruits & Vegetables</Link>
        <Link to="/category/grains-pulses">Organic Grains & Pulses</Link>
        <Link to="/category/dairy">Organic Dairy & Alternatives</Link>
        <Link to="/category/beverages">Organic Beverages</Link>
        <Link to="/category/oils-ghee">Organic Oils & Ghee</Link>
        <Link to="/category/spices">Organic Spices & Condiments</Link>
        <Link to="/category/snacks">Organic Snacks & Dry Fruits</Link>
        <Link to="/category/personal-care">Organic Personal Care</Link>
        <Link to="/category/home-care">Organic Home Care</Link>
        <Link to="/category/superfoods">Organic Superfoods</Link>
      </div>
    </li>
    
    <li className="nav-item">
      <Link to="/about-organic">Why Organic?</Link>
    </li>
    
    <li className="nav-item">
      <Link to="/all-vendors">Our Vendors</Link>
    </li>
    
    <li className="nav-item">
      <Link to="/blog">Health Blog</Link>
    </li>
    
    <li className="nav-item">
      <Link to="/contact">Contact</Link>
    </li>
  </ul>
  
  <div className="nav-actions">
    <Link to="/search">
      <i className="fa-search"></i>
    </Link>
    <Link to="/wishlist">
      <i className="fa-heart"></i>
    </Link>
    <Link to="/cart">
      <i className="fa-shopping-cart"></i>
    </Link>
    {/* User Login Dropdown - NO VENDOR LOGIN HERE */}
    <div className="dropdown">
      <button className="dropdown-toggle">
        <i className="fa-user"></i> Account
      </button>
      <div className="dropdown-menu">
        <Link to="/customer/signin">Customer Sign In</Link>
        <Link to="/customer/signup">Customer Sign Up</Link>
        <Link to="/customer/orders">My Orders</Link>
        <Link to="/customer/wishlist">My Wishlist</Link>
        <Link to="/customer/settings">Account Settings</Link>
      </div>
    </div>
  </div>
</nav>
```

### **Remove Vendor Login from Header Navigation**
- **IMPORTANT**: Remove all vendor-related links from the header navigation
- Remove vendor login, vendor signup, vendor dashboard links from top menu
- These will be placed in a prominent section on the homepage instead

---

## 3. Homepage Vendor Onboarding Section

### **Add Prominent Vendor Call-to-Action Section**

Place this section **AFTER the hero section and featured products** (approximately 60-70% down the homepage):

```jsx
<section className="vendor-cta-section">
  <div className="container">
    <div className="row align-items-center">
      <div className="col-lg-6">
        <div className="vendor-cta-content">
          <span className="badge bg-success mb-3">Join Our Marketplace</span>
          <h2 className="display-4 mb-4">Wanna Become a Vendor?</h2>
          <p className="lead mb-4">
            Partner with us to reach thousands of health-conscious customers 
            looking for authentic organic products. Grow your organic business 
            and contribute to a healthier planet.
          </p>
          
          <div className="benefits-list mb-4">
            <div className="benefit-item">
              <i className="fa-check-circle text-success"></i>
              <span>Zero Listing Fees for First 3 Months</span>
            </div>
            <div className="benefit-item">
              <i className="fa-check-circle text-success"></i>
              <span>Dedicated Vendor Dashboard</span>
            </div>
            <div className="benefit-item">
              <i className="fa-check-circle text-success"></i>
              <span>Real-time Sales Analytics</span>
            </div>
            <div className="benefit-item">
              <i className="fa-check-circle text-success"></i>
              <span>Direct Payments via Razorpay</span>
            </div>
            <div className="benefit-item">
              <i className="fa-check-circle text-success"></i>
              <span>Marketing & SEO Support</span>
            </div>
          </div>
          
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-lg btn-success me-3">
              <i className="fa-envelope me-2"></i>
              Contact Us to Get Started
            </Link>
            <Link to="/vendor/register" className="btn btn-lg btn-outline-success">
              <i className="fa-user-plus me-2"></i>
              Apply as Vendor
            </Link>
          </div>
          
          <p className="text-muted mt-3">
            <small>Already a vendor? <Link to="/vendor/signin">Sign in to your dashboard</Link></small>
          </p>
        </div>
      </div>
      
      <div className="col-lg-6">
        <div className="vendor-cta-image">
          <img 
            src="/images/vendor-partnership.jpg" 
            alt="Become a Vendor" 
            className="img-fluid rounded shadow"
          />
          <div className="stats-overlay">
            <div className="stat-card">
              <h3>500+</h3>
              <p>Active Vendors</p>
            </div>
            <div className="stat-card">
              <h3>50K+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-card">
              <h3>100%</h3>
              <p>Organic Certified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## 4. Multi-Vendor Architecture Implementation

### **User Roles & Access Control**

Create three distinct user types:

#### **1. Customer (Default User)**
- Browse and purchase products
- Add to cart and wishlist
- Track orders
- Write reviews
- Manage profile

#### **2. Vendor**
- Separate vendor dashboard
- Product management (add, edit, delete)
- Inventory management
- Order processing
- Sales analytics
- Payout tracking
- Store settings

#### **3. Admin (Super User)**
- Full system access
- Vendor management and approval
- Product moderation
- Order oversight
- Platform analytics
- Customer management
- Commission settings

### **Authentication Flow**

```javascript
// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'customer', 'vendor', 'admin'
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email, password, role) => {
    // API call to authenticate
    // Set user data based on role
  };

  const logout = () => {
    setUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, userRole, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### **Protected Routes**

```javascript
// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};
```

---

## 5. Shadcn Dashboard Implementation

### **Installation Commands**

```bash
# Initialize shadcn in your React project
npx shadcn@latest init

# Follow the prompts:
# - Would you like to use TypeScript? Yes
# - Which style would you like to use? Default
# - Which color would you like to use as base color? Green (organic theme)
# - Where is your global CSS file? src/index.css
# - Would you like to use CSS variables for colors? Yes
# - Where is your tailwind.config.js located? tailwind.config.js
# - Configure the import alias for components? @/components
# - Configure the import alias for utils? @/lib/utils

# Add required dashboard components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dropdown-menu
npx shadcn@latest add dialog
npx shadcn@latest add table
npx shadcn@latest add badge
npx shadcn@latest add tabs
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add select
npx shadcn@latest add textarea
npx shadcn@latest add calendar
npx shadcn@latest add chart
npx shadcn@latest add sidebar
npx shadcn@latest add avatar
npx shadcn@latest add alert
npx shadcn@latest add toast
npx shadcn@latest add switch
npx shadcn@latest add separator
npx shadcn@latest add scroll-area
```

### **Install Additional Dependencies**

```bash
# Install Tailwind CSS and dependencies (if not already installed)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install chart library for analytics
npm install recharts

# Install date handling
npm install date-fns

# Install form handling
npm install react-hook-form zod @hookform/resolvers

# Install icons
npm install lucide-react
```

### **Vendor Dashboard Structure**

Create the following folder structure:

```
src/
├── pages/
│   ├── Vendor/
│   │   ├── VendorDashboard.jsx
│   │   ├── VendorLayout.jsx
│   │   ├── VendorProducts.jsx
│   │   ├── VendorAddProduct.jsx
│   │   ├── VendorEditProduct.jsx
│   │   ├── VendorOrders.jsx
│   │   ├── VendorAnalytics.jsx
│   │   ├── VendorPayouts.jsx
│   │   ├── VendorSettings.jsx
│   │   ├── VendorProfile.jsx
│   │   └── VendorSignIn.jsx
```

### **Vendor Dashboard Main Page**

```jsx
// src/pages/Vendor/VendorDashboard.jsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingBag, 
  DollarSign, 
  Users, 
  TrendingUp,
  Package,
  Clock
} from "lucide-react";

export const VendorDashboard = () => {
  return (
    <div className="vendor-dashboard">
      <div className="dashboard-header mb-6">
        <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your store overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">+15 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+45 today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Your sales performance this month</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Add Recharts chart here */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Add recent orders table here */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
```

### **Admin Dashboard Structure**

```
src/
├── pages/
│   ├── Admin/
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminLayout.jsx
│   │   ├── AdminVendors.jsx
│   │   ├── AdminVendorDetails.jsx
│   │   ├── AdminProducts.jsx
│   │   ├── AdminOrders.jsx
│   │   ├── AdminCustomers.jsx
│   │   ├── AdminAnalytics.jsx
│   │   ├── AdminSettings.jsx
│   │   ├── AdminCommissions.jsx
│   │   └── AdminReports.jsx
```

### **Admin Dashboard - Vendor Management**

```jsx
// src/pages/Admin/AdminVendors.jsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle, XCircle, MoreHorizontal } from "lucide-react";

export const AdminVendors = () => {
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: "Green Valley Farms",
      email: "greenvalley@example.com",
      products: 45,
      revenue: "₹1,23,456",
      status: "active",
      joinDate: "2024-01-15"
    },
    // Add more vendor data
  ]);

  return (
    <div className="admin-vendors">
      <div className="page-header mb-6">
        <h1 className="text-3xl font-bold">Vendor Management</h1>
        <p className="text-muted-foreground">Manage and monitor all vendors on the platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">198</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium">{vendor.name}</TableCell>
                  <TableCell>{vendor.email}</TableCell>
                  <TableCell>{vendor.products}</TableCell>
                  <TableCell>{vendor.revenue}</TableCell>
                  <TableCell>
                    <Badge variant={vendor.status === 'active' ? 'success' : 'secondary'}>
                      {vendor.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
```

---

## 6. Razorpay Payment Integration

### **Installation**

```bash
# Install Razorpay React library
npm install react-razorpay

# Install Razorpay Node.js SDK (for backend)
npm install razorpay
```

### **Frontend Implementation**

```jsx
// src/components/Payment/RazorpayCheckout.jsx
import React from 'react';
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { Button } from "@/components/ui/button";

export const RazorpayCheckout = ({ orderDetails, onSuccess, onFailure }) => {
  const { error, isLoading, Razorpay } = useRazorpay();

  const handlePayment = async () => {
    // Create order on backend
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: orderDetails.amount,
        currency: 'INR',
        receipt: orderDetails.orderId,
      })
    });

    const order = await response.json();

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Organic Marketplace',
      description: 'Order Payment',
      order_id: order.id,
      handler: function (response) {
        // Verify payment on backend
        verifyPayment(response);
      },
      prefill: {
        name: orderDetails.customerName,
        email: orderDetails.customerEmail,
        contact: orderDetails.customerPhone,
      },
      theme: {
        color: '#22C55E', // Green organic theme
      },
      modal: {
        ondismiss: function() {
          onFailure('Payment cancelled by user');
        }
      }
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };

  const verifyPayment = async (paymentResponse) => {
    const response = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_signature: paymentResponse.razorpay_signature,
      })
    });

    const result = await response.json();
    
    if (result.success) {
      onSuccess(paymentResponse);
    } else {
      onFailure('Payment verification failed');
    }
  };

  return (
    <div className="razorpay-checkout">
      <Button 
        onClick={handlePayment} 
        disabled={isLoading}
        className="w-full bg-green-600 hover:bg-green-700"
      >
        {isLoading ? 'Loading...' : `Pay ₹${orderDetails.amount / 100}`}
      </Button>
      {error && <p className="text-red-500 mt-2">Error: {error}</p>}
    </div>
  );
};
```

### **Backend Implementation (Node.js)**

```javascript
// server/routes/payment.js
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;

    const options = {
      amount: amount * 100, // Convert to paise
      currency: currency || 'INR',
      receipt: receipt,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify Payment
app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      // Payment is verified
      // Update order status in database
      res.json({ success: true, message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

---

## 7. Updated Routing Structure

### **Main App Routes**

```jsx
// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Layouts
import MainLayout from './layouts/MainLayout';
import VendorLayout from './pages/Vendor/VendorLayout';
import AdminLayout from './pages/Admin/AdminLayout';

// Customer Pages
import Home from './pages/Home';
import Shop from './pages/Shop/Shop';
import ProductDetails from './pages/Shop/ProductDetails';
import ShopCart from './pages/Shop/ShopCart';
import ShopCheckout from './pages/Shop/ShopCheckout';
import ShopWishList from './pages/Shop/ShopWishList';

// Customer Account
import CustomerSignIn from './pages/Customer/CustomerSignIn';
import CustomerSignUp from './pages/Customer/CustomerSignUp';
import CustomerOrders from './pages/Customer/CustomerOrders';
import CustomerProfile from './pages/Customer/CustomerProfile';

// Vendor Pages
import VendorSignIn from './pages/Vendor/VendorSignIn';
import VendorSignUp from './pages/Vendor/VendorSignUp';
import VendorDashboard from './pages/Vendor/VendorDashboard';
import VendorProducts from './pages/Vendor/VendorProducts';
import VendorOrders from './pages/Vendor/VendorOrders';
import VendorAnalytics from './pages/Vendor/VendorAnalytics';

// Admin Pages
import AdminSignIn from './pages/Admin/AdminSignIn';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminVendors from './pages/Admin/AdminVendors';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminOrders from './pages/Admin/AdminOrders';

// Info Pages
import AboutOrganic from './pages/About/AboutOrganic';
import Blog from './pages/About/Blog';
import Contact from './pages/About/Contact';
import AllVendors from './pages/Store/AllVendors';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Customer Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="category/:categoryName" element={<Shop />} />
            <Route path="product/:productId" element={<ProductDetails />} />
            <Route path="cart" element={<ShopCart />} />
            <Route path="checkout" element={<ShopCheckout />} />
            <Route path="wishlist" element={<ShopWishList />} />
            <Route path="about-organic" element={<AboutOrganic />} />
            <Route path="all-vendors" element={<AllVendors />} />
            <Route path="blog" element={<Blog />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Customer Account Routes */}
          <Route path="/customer/signin" element={<CustomerSignIn />} />
          <Route path="/customer/signup" element={<CustomerSignUp />} />
          <Route 
            path="/customer/orders" 
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <CustomerOrders />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/customer/profile" 
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <CustomerProfile />
              </ProtectedRoute>
            } 
          />

          {/* Vendor Routes */}
          <Route path="/vendor/signin" element={<VendorSignIn />} />
          <Route path="/vendor/register" element={<VendorSignUp />} />
          <Route 
            path="/vendor" 
            element={
              <ProtectedRoute allowedRoles={['vendor']}>
                <VendorLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<VendorDashboard />} />
            <Route path="dashboard" element={<VendorDashboard />} />
            <Route path="products" element={<VendorProducts />} />
            <Route path="orders" element={<VendorOrders />} />
            <Route path="analytics" element={<VendorAnalytics />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/signin" element={<AdminSignIn />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="vendors" element={<AdminVendors />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
```

---

## 8. Design Guidelines

### **Color Scheme (Organic Theme)**

```css
:root {
  /* Primary Green (Organic) */
  --primary: #22C55E;
  --primary-hover: #16A34A;
  --primary-light: #86EFAC;
  
  /* Earth Tones */
  --earth-brown: #92400E;
  --earth-beige: #FEF3C7;
  --earth-green: #166534;
  
  /* Neutral */
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-200: #E5E7EB;
  --gray-500: #6B7280;
  --gray-900: #111827;
  
  /* Status */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;
}
```

### **Typography**

```css
/* Use clean, minimal fonts */
body {
  font-family: 'Inter', 'Segoe UI', 'Roboto', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Poppins', 'Inter', sans-serif;
  font-weight: 600;
}
```

### **Component Styling Principles**

1. **Minimal and Clean**: Avoid clutter, use whitespace effectively
2. **Nature-Inspired**: Use organic shapes, soft shadows
3. **High Readability**: Good contrast, clear hierarchy
4. **Trust Signals**: Display certifications, badges prominently
5. **Responsive**: Mobile-first approach

---

## 9. Key Features to Implement

### **For Customers**
- ✅ Browse organic products by category
- ✅ Advanced search and filters (price, certification, vendor)
- ✅ Product reviews and ratings
- ✅ Add to cart and wishlist
- ✅ Secure checkout with Razorpay
- ✅ Order tracking
- ✅ Save delivery addresses
- ✅ Reorder previous purchases

### **For Vendors**
- ✅ Vendor registration and approval workflow
- ✅ Product management (CRUD operations)
- ✅ Inventory tracking with low-stock alerts
- ✅ Order management and fulfillment
- ✅ Sales analytics dashboard
- ✅ Revenue and payout tracking
- ✅ Customer reviews management
- ✅ Store profile customization

### **For Admin**
- ✅ Vendor approval and management
- ✅ View all vendor dashboards
- ✅ Product moderation
- ✅ Order oversight across all vendors
- ✅ Commission management
- ✅ Platform-wide analytics
- ✅ Customer support management
- ✅ Platform settings and configuration

---

## 10. Database Schema Suggestions

### **Users Table**
```javascript
{
  user_id: String,
  email: String,
  password: String (hashed),
  role: Enum['customer', 'vendor', 'admin'],
  name: String,
  phone: String,
  created_at: Date,
  updated_at: Date,
  is_active: Boolean
}
```

### **Vendors Table**
```javascript
{
  vendor_id: String,
  user_id: String (foreign key),
  business_name: String,
  business_email: String,
  business_phone: String,
  gst_number: String,
  fssai_license: String,
  organic_certification: String,
  store_description: String,
  store_logo: String,
  status: Enum['pending', 'approved', 'rejected', 'suspended'],
  commission_rate: Number,
  razorpay_account_id: String,
  created_at: Date
}
```

### **Products Table**
```javascript
{
  product_id: String,
  vendor_id: String (foreign key),
  name: String,
  description: String,
  category: String,
  subcategory: String,
  price: Number,
  compare_price: Number,
  images: Array[String],
  stock_quantity: Number,
  sku: String,
  certifications: Array[String],
  tags: Array[String],
  is_active: Boolean,
  created_at: Date
}
```

### **Orders Table**
```javascript
{
  order_id: String,
  customer_id: String (foreign key),
  vendor_id: String (foreign key),
  items: Array[{
    product_id: String,
    quantity: Number,
    price: Number
  }],
  total_amount: Number,
  payment_id: String,
  payment_status: Enum['pending', 'completed', 'failed', 'refunded'],
  order_status: Enum['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
  shipping_address: Object,
  created_at: Date
}
```

---

## 11. Testing Checklist

### **Customer Flow**
- [ ] User can browse products by category
- [ ] User can add products to cart
- [ ] User can proceed to checkout
- [ ] Payment integration works correctly
- [ ] Order confirmation email is sent
- [ ] User can track order status

### **Vendor Flow**
- [ ] Vendor can register and submit documents
- [ ] Vendor receives approval/rejection notification
- [ ] Vendor can add/edit/delete products
- [ ] Vendor receives new order notifications
- [ ] Vendor can update order status
- [ ] Vendor can view sales analytics
- [ ] Payout calculations are accurate

### **Admin Flow**
- [ ] Admin can approve/reject vendors
- [ ] Admin can view all vendor dashboards
- [ ] Admin can moderate products
- [ ] Admin can view platform-wide analytics
- [ ] Admin can manage commissions
- [ ] Admin receives critical notifications

---

## 12. Additional Recommendations

### **SEO Optimization**
- Add meta tags for all pages
- Implement structured data for products
- Create sitemap.xml
- Optimize images with alt tags
- Use semantic HTML

### **Performance**
- Implement lazy loading for images
- Use React.memo for expensive components
- Code splitting for routes
- Optimize bundle size
- Implement caching strategies

### **Security**
- Input validation on all forms
- SQL injection prevention
- XSS protection
- CSRF tokens
- Secure payment handling
- Rate limiting on API endpoints

### **Accessibility**
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Focus indicators

---

## 13. Implementation Priority

### **Phase 1: Core Structure (Week 1-2)**
1. Update categories to organic products
2. Remove vendor login from header
3. Add vendor CTA section to homepage
4. Set up basic routing structure

### **Phase 2: Authentication & Roles (Week 2-3)**
1. Implement role-based authentication
2. Create protected routes
3. Build sign-in/sign-up pages for all roles

### **Phase 3: Dashboards (Week 3-5)**
1. Install and configure Shadcn UI
2. Build vendor dashboard
3. Build admin dashboard
4. Create vendor management system

### **Phase 4: E-commerce Features (Week 5-7)**
1. Product listing and details pages
2. Cart and wishlist functionality
3. Checkout process
4. Razorpay integration

### **Phase 5: Analytics & Reporting (Week 7-8)**
1. Sales analytics for vendors
2. Platform analytics for admin
3. Revenue tracking and payouts
4. Order management system

### **Phase 6: Polish & Launch (Week 8-9)**
1. UI/UX refinements
2. Performance optimization
3. Security audit
4. Testing and bug fixes
5. Documentation

---

## 14. Environment Variables

Create a `.env` file with the following:

```env
# Razorpay
REACT_APP_RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

# Backend API
REACT_APP_API_URL=http://localhost:5000/api

# Database
DATABASE_URL=your_database_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Email Service (for notifications)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password

# File Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

---

## 15. Mission Statement Integration

Ensure that throughout the platform, the mission is clear:

**"Empowering healthy living through authentic organic products while supporting sustainable farming and local communities."**

### **Display Mission on:**
- Homepage hero section
- About page
- Vendor registration page
- Footer
- Product pages (why organic badges)
- Email communications

---

## Final Notes

This prompt provides a comprehensive blueprint for transforming FreshCart into an organic products multi-vendor marketplace. The implementation should prioritize:

1. **User Experience**: Clean, intuitive navigation
2. **Trust**: Display certifications, vendor credibility
3. **Performance**: Fast loading, responsive design
4. **Security**: Secure payments, data protection
5. **Scalability**: Architecture that supports growth

The Shadcn UI components will provide a modern, minimal aesthetic that aligns with the organic/natural brand identity. The multi-vendor architecture ensures clear separation of concerns between customers, vendors, and admins while maintaining a cohesive platform experience.

Remember to test thoroughly at each phase and gather user feedback to refine the implementation.