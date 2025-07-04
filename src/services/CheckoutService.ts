import { CartItem, Customer, CheckoutResult, Receipt, ShipmentNotice } from '../types';
import { CartService } from './CartService';
import { ShippingService } from './ShippingService';
import { ProductService } from './ProductService';

export class CheckoutService {
  static checkout(customer: Customer, cart: CartItem[]): CheckoutResult {
    // Validate cart is not empty
    if (cart.length === 0) {
      return { success: false, message: 'Cart is empty' };
    }

    // Validate all products
    for (const item of cart) {
      const validation = ProductService.validateProduct(item.product, item.quantity);
      if (!validation.valid) {
        return { success: false, message: validation.message };
      }
    }

    // Calculate totals
    const subtotal = CartService.calculateSubtotal(cart);
    const shippableItems = CartService.getShippableItems(cart);
    const shipping = ShippingService.calculateShippingFee(shippableItems);
    const total = subtotal + shipping;

    // Validate customer balance
    if (customer.balance < total) {
      return { 
        success: false, 
        message: `Insufficient balance. Required: $${total.toFixed(2)}, Available: $${customer.balance.toFixed(2)}` 
      };
    }

    // Process payment
    const updatedBalance = customer.balance - total;

    // Generate receipt
    const receipt: Receipt = {
      items: cart,
      subtotal,
      shipping,
      total,
      customerBalance: updatedBalance
    };

    // Generate shipment notice if there are shippable items
    let shipmentNotice: ShipmentNotice | undefined;
    if (shippableItems.length > 0) {
      shipmentNotice = {
        items: shippableItems.map(item => ({
          quantity: item.quantity,
          name: item.getName(),
          weight: item.getWeight()
        })),
        totalWeight: shippableItems.reduce((sum, item) => sum + (item.getWeight() * item.quantity), 0)
      };
    }

    // Update customer balance
    customer.balance = updatedBalance;

    // Process shipment
    if (shippableItems.length > 0) {
      ShippingService.processShipment(shippableItems);
    }

    return {
      success: true,
      receipt,
      shipmentNotice
    };
  }
}