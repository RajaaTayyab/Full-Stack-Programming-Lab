export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  phone?: string;
  addresses: Address[];
  wishlist: string[];
}

export interface Address {
  _id?: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: Category;
  tags: string[];
  stock: number;
  sku: string;
  material?: string;
  colors?: string[];
  isFeatured: boolean;
  isActive: boolean;
  rating: number;
  numReviews: number;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  color?: string;
}

export interface Order {
  _id: string;
  user: User;
  items: {
    product: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  shippingAddress: Omit<Address, '_id' | 'label' | 'isDefault'>;
  paymentMethod: string;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
}

export interface Review {
  _id: string;
  user: { _id: string; name: string; avatar?: string };
  rating: number;
  title: string;
  body: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  pages: number;
}