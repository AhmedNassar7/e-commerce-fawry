// Core interfaces and types for the e-commerce system
export interface Shippable {
  getName(): string;
  getWeight(): number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isExpirable: boolean;
  expirationDate?: Date;
  isShippable: boolean;
  weight?: number;
  category: 'perishable-shippable' | 'non-perishable-shippable' | 'non-perishable-non-shippable';
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Customer {
  id: string;
  name: string;
  balance: number;
}

export interface CheckoutResult {
  success: boolean;
  message?: string;
  receipt?: Receipt;
  shipmentNotice?: ShipmentNotice;
}

export interface Receipt {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customerBalance: number;
}

export interface ShipmentNotice {
  items: Array<{
    quantity: number;
    name: string;
    weight: number;
  }>;
  totalWeight: number;
}