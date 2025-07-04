import React, { useState } from 'react';
import { CartItem, Customer, Product, CheckoutResult } from './types';
import { sampleProducts } from './data/products';
import { CartService } from './services/CartService';
import { CheckoutService } from './services/CheckoutService';
import { ProductCard } from './components/ProductCard';
import { CartSidebar } from './components/CartSidebar';
import { CheckoutModal } from './components/CheckoutModal';
import { CustomerInfo } from './components/CustomerInfo';
import { ShoppingCart, Store } from 'lucide-react';

function App() {
  const [products] = useState<Product[]>(sampleProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customer, setCustomer] = useState<Customer>({
    id: 'CUST-001',
    name: 'John Doe',
    balance: 1000
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutResult, setCheckoutResult] = useState<CheckoutResult | null>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    const result = CartService.addToCart(cart, product, quantity);
    if (result.success) {
      setCart(result.cart);
      showNotification(`Added ${quantity}x ${product.name} to cart`);
    } else {
      showNotification(result.message || 'Failed to add item to cart');
    }
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    const updatedCart = CartService.updateQuantity(cart, productId, quantity);
    setCart(updatedCart);
  };

  const handleRemoveItem = (productId: string) => {
    const updatedCart = CartService.removeFromCart(cart, productId);
    setCart(updatedCart);
    showNotification('Item removed from cart');
  };

  const handleClearCart = () => {
    setCart(CartService.clearCart());
    showNotification('Cart cleared');
  };

  const handleCheckout = () => {
    const result = CheckoutService.checkout(customer, cart);
    setCheckoutResult(result);
    setIsCheckoutModalOpen(true);
    
    if (result.success) {
      setCart(CartService.clearCart());
      setIsCartOpen(false);
      // Update customer balance
      setCustomer(prev => ({ ...prev, balance: result.receipt?.customerBalance || prev.balance }));
      showNotification('Checkout successful!');
    } else {
      showNotification(result.message || 'Checkout failed');
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Store className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">E-Commerce Store</h1>
            </div>
            
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Customer Info */}
          <CustomerInfo customer={customer} />

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onCheckout={handleCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        result={checkoutResult}
      />

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {notification}
        </div>
      )}
    </div>
  );
}

export default App;