import { Product } from '../types';

export class ProductService {
  static isProductExpired(product: Product): boolean {
    if (!product.isExpirable || !product.expirationDate) return false;
    return new Date() > product.expirationDate;
  }

  static isProductInStock(product: Product, requestedQuantity: number): boolean {
    return product.quantity >= requestedQuantity;
  }

  static validateProduct(product: Product, requestedQuantity: number): { valid: boolean; message?: string } {
    if (this.isProductExpired(product)) {
      return { valid: false, message: `${product.name} has expired` };
    }
    
    if (!this.isProductInStock(product, requestedQuantity)) {
      return { valid: false, message: `Insufficient stock for ${product.name}. Available: ${product.quantity}` };
    }
    
    return { valid: true };
  }
}