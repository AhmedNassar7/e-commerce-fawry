import { CartItem, Product } from '../types';
import { ProductService } from './ProductService';

export class CartService {
  static addToCart(
    cart: CartItem[],
    product: Product,
    quantity: number
  ): { success: boolean; message?: string; cart: CartItem[] } {
    const validation = ProductService.validateProduct(product, quantity);
    
    if (!validation.valid) {
      return { success: false, message: validation.message, cart };
    }

    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
      const totalQuantity = existingItem.quantity + quantity;
      const totalValidation = ProductService.validateProduct(product, totalQuantity);
      
      if (!totalValidation.valid) {
        return { success: false, message: totalValidation.message, cart };
      }
      
      return {
        success: true,
        cart: cart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: totalQuantity }
            : item
        )
      };
    }

    return {
      success: true,
      cart: [...cart, { product, quantity }]
    };
  }

  static removeFromCart(cart: CartItem[], productId: string): CartItem[] {
    return cart.filter(item => item.product.id !== productId);
  }

  static updateQuantity(cart: CartItem[], productId: string, quantity: number): CartItem[] {
    if (quantity <= 0) {
      return this.removeFromCart(cart, productId);
    }

    return cart.map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    );
  }

  static clearCart(): CartItem[] {
    return [];
  }

  static calculateSubtotal(cart: CartItem[]): number {
    return cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  static calculateTotalWeight(cart: CartItem[]): number {
    return cart.reduce((sum, item) => {
      if (item.product.isShippable && item.product.weight) {
        return sum + (item.product.weight * item.quantity);
      }
      return sum;
    }, 0);
  }

  static getShippableItems(cart: CartItem[]): Array<{ getName(): string; getWeight(): number; quantity: number }> {
    return cart
      .filter(item => item.product.isShippable)
      .map(item => ({
        getName: () => item.product.name,
        getWeight: () => item.product.weight || 0,
        quantity: item.quantity
      }));
  }
}