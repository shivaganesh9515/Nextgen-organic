import { User } from '../types';

export const users: User[] = [
  {
    id: 'u1',
    name: 'Shivaganesh Gajavelli',
    email: 'shivaganesh@example.com',
    phone: '+91 98765 43210',
    avatar: '/images/users/user1.jpg',
    addresses: [
      {
        id: 'a1',
        type: 'home',
        name: 'Home',
        phone: '+91 98765 43210',
        address: '123 Main Street',
        addressLine2: 'Apartment 4B',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        isDefault: true,
      },
      {
        id: 'a2',
        type: 'work',
        name: 'Office',
        phone: '+91 98765 43210',
        address: '456 Business Park',
        addressLine2: 'Sector 12',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400002',
        isDefault: false,
      },
    ],
    orders: [],
    wishlist: ['1', '2', '4'],
  },
];