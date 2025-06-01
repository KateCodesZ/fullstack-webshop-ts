// User
export interface User {
  id: number;
  email: string;
  password_hash: string;
  is_admin: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface JwtPayload {
  id: number;
  email: string;
  is_admin: boolean;
}

// Category
export interface Category {
  id: number;
  name: string;
}

// Color
export interface Color {
  id: number;
  name: string;
}

// Product
export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  discount_price?: number | null;
  category_id: number;
  color_id: number;
  image: string | null;
  is_new: boolean;
  is_sale: boolean;
  favorite: boolean;
  created_at: Date;
  updated_at: Date;
}

// Order
export interface Order {
  id: number;
  user_id: number;
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  created_at: Date;
  updated_at: Date;
}

// OrderItem
export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price_at_order: number;
  created_at: Date;
}
