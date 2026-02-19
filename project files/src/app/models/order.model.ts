import { Product } from './product.model';
import { Address } from './user.model';

export interface OrderItem {
  product: Product | string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Completed' | 'Failed';
  totalAmount: number;
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  deliveryDate?: Date;
  createdAt: Date;
}

export interface CreateOrderRequest {
  shippingAddress: Address;
  paymentMethod: string;
}
