import React from 'react';
import { Product } from '../types';
import { ProductService } from '../services/ProductService';
import { ShoppingCart, Clock, Truck, Package } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = React.useState(1);
  const isExpired = ProductService.isProductExpired(product);
  const isOutOfStock = product.quantity === 0;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  const getCategoryColor = () => {
    switch (product.category) {
      case 'perishable-shippable':
        return 'bg-orange-100 text-orange-800';
      case 'non-perishable-shippable':
        return 'bg-blue-100 text-blue-800';
      case 'non-perishable-non-shippable':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatExpirationDate = () => {
    if (!product.isExpirable || !product.expirationDate) return null;
    return product.expirationDate.toLocaleDateString();
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
      isExpired || isOutOfStock ? 'opacity-75' : ''
    }`}>
      <div className="relative">
        <img 
          src={product.image || 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=300'} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          {product.isShippable && (
            <div className="bg-white bg-opacity-90 rounded-full p-1">
              <Truck className="w-4 h-4 text-blue-600" />
            </div>
          )}
          {product.isExpirable && (
            <div className="bg-white bg-opacity-90 rounded-full p-1">
              <Clock className="w-4 h-4 text-orange-600" />
            </div>
          )}
        </div>
        {(isExpired || isOutOfStock) && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {isExpired ? 'EXPIRED' : 'OUT OF STOCK'}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor()}`}>
            {product.category.replace(/-/g, ' ')}
          </span>
        </div>
        
        <div className="text-2xl font-bold text-gray-900 mb-2">
          ${product.price.toFixed(2)}
        </div>
        
        <div className="space-y-1 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            <span>In Stock: {product.quantity}</span>
          </div>
          
          {product.isShippable && product.weight && (
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              <span>Weight: {product.weight}kg</span>
            </div>
          )}
          
          {product.isExpirable && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className={isExpired ? 'text-red-600 font-medium' : ''}>
                Expires: {formatExpirationDate()}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 hover:bg-gray-100 transition-colors"
              disabled={isExpired || isOutOfStock}
            >
              -
            </button>
            <span className="px-4 py-1 border-x">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
              className="px-3 py-1 hover:bg-gray-100 transition-colors"
              disabled={isExpired || isOutOfStock}
            >
              +
            </button>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={isExpired || isOutOfStock}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
              isExpired || isOutOfStock
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};