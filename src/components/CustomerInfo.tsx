import React from 'react';
import { Customer } from '../types';
import { User, Wallet } from 'lucide-react';

interface CustomerInfoProps {
  customer: Customer;
}

export const CustomerInfo: React.FC<CustomerInfoProps> = ({ customer }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">{customer.name}</h3>
            <p className="text-sm text-gray-600">Customer ID: {customer.id}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
          <Wallet className="w-4 h-4 text-green-600" />
          <span className="font-medium text-green-800">
            ${customer.balance.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};