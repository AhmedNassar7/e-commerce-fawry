import React from 'react';
import { CheckoutResult } from '../types';
import { X, CheckCircle, AlertCircle, Package, Truck } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: CheckoutResult | null;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, result }) => {
  if (!isOpen || !result) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            {result.success ? (
              <>
                <CheckCircle className="w-6 h-6 text-green-600" />
                Checkout Successful
              </>
            ) : (
              <>
                <AlertCircle className="w-6 h-6 text-red-600" />
                Checkout Failed
              </>
            )}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {result.success ? (
            <div className="space-y-6">
              {/* Receipt */}
              {result.receipt && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Checkout Receipt
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    {result.receipt.items.map(item => (
                      <div key={item.product.id} className="flex justify-between">
                        <span>{item.quantity}x {item.product.name}</span>
                        <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${result.receipt.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>${result.receipt.shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>${result.receipt.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-4">
                      <span>Remaining Balance:</span>
                      <span>${result.receipt.customerBalance.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Shipment Notice */}
              {result.shipmentNotice && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-blue-600" />
                    Shipment Notice
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    {result.shipmentNotice.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{item.quantity}x {item.name}</span>
                        <span>{(item.weight * 1000).toFixed(0)}g</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total Package Weight:</span>
                      <span>{result.shipmentNotice.totalWeight.toFixed(2)}kg</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-800">
                  <strong>Order placed successfully!</strong> Your items will be processed and shipped according to our standard delivery times.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-red-800">
                <strong>Checkout failed:</strong> {result.message}
              </p>
            </div>
          )}
        </div>

        <div className="p-6 border-t">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};