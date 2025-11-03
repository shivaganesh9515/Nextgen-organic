export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Make password optional since it won't be returned to client
  role: 'user' | 'vendor' | 'admin';
  phone?: string;
  profilePicture?: string;
  isEmailVerified: boolean;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserAddress {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface UserPaymentMethod {
  id: string;
  type: string;
  cardToken?: string;
  isDefault: boolean;
}