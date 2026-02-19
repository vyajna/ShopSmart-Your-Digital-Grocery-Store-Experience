export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: Category | string;
  image: string;
  images?: string[];
  stock: number;
  unit: string;
  brand?: string;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  isActive: boolean;
  discount: number;
  createdAt: Date;
}

export interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: Date;
}
