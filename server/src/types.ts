// User
export interface User {
  id: number;
  email: string;
  password_hash: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
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
  category_id: number;
  color_id: number;
  image: string | null;
  is_new: boolean;
  is_sale: boolean;
  favorite: boolean;
  created_at: string;
  updated_at: string;
}

// Order
export interface Order {
  id: number;
  user_id: number;
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
}

// OrderItem
export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price_at_order: number;
  created_at: string;
}
