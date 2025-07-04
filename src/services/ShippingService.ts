import { Shippable } from '../types';

export class ShippingService {
  private static readonly SHIPPING_RATE_PER_KG = 30;
  private static readonly MIN_SHIPPING_FEE = 10;

  static calculateShippingFee(items: Shippable[]): number {
    if (items.length === 0) return 0;
    
    const totalWeight = items.reduce((sum, item) => sum + item.getWeight(), 0);
    const shippingFee = totalWeight * this.SHIPPING_RATE_PER_KG;
    
    return Math.max(shippingFee, this.MIN_SHIPPING_FEE);
  }

  static processShipment(items: Shippable[]): void {
    if (items.length === 0) return;
    
    console.log('** Shipment notice **');
    items.forEach(item => {
      console.log(`1x ${item.getName()} ${item.getWeight() * 1000}g`);
    });
    
    const totalWeight = items.reduce((sum, item) => sum + item.getWeight(), 0);
    console.log(`Total package weight ${totalWeight}kg`);
  }
}