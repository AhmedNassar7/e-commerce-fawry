import { Product } from '../types';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Cheese',
    price: 100,
    quantity: 10,
    isExpirable: true,
    expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    isShippable: true,
    weight: 0.2,
    category: 'perishable-shippable',
    image: 'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '2',
    name: 'Biscuits',
    price: 150,
    quantity: 15,
    isExpirable: true,
    expirationDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    isShippable: true,
    weight: 0.7,
    category: 'perishable-shippable',
    image: 'https://images.pexels.com/photos/890577/pexels-photo-890577.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '3',
    name: 'Smart TV',
    price: 500,
    quantity: 5,
    isExpirable: false,
    isShippable: true,
    weight: 15.5,
    category: 'non-perishable-shippable',
    image: 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '4',
    name: 'Mobile Scratch Card',
    price: 25,
    quantity: 100,
    isExpirable: false,
    isShippable: false,
    category: 'non-perishable-non-shippable',
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '5',
    name: 'Laptop',
    price: 800,
    quantity: 3,
    isExpirable: false,
    isShippable: true,
    weight: 2.5,
    category: 'non-perishable-shippable',
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '6',
    name: 'Expired Milk',
    price: 40,
    quantity: 8,
    isExpirable: true,
    expirationDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago (expired)
    isShippable: true,
    weight: 1.0,
    category: 'perishable-shippable',
    image: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];