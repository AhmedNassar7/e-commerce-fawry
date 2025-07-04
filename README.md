# 🛒 E-Commerce System with Digital Wallet

A modern e-commerce system with integrated digital wallet functionality built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- **Product Management** - Support for different product types (perishable/non-perishable, shippable/non-shippable)
- **Shopping Cart** - Add, remove, and manage products with real-time validation
- **Checkout System** - Complete checkout with balance verification and receipt generation
- **Digital Wallet** - Add funds, view balance, and transaction history
- **Responsive Design** - Works on desktop and mobile devices
- **Dark/Light Theme** - Toggle between themes

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open browser**
   ```
   http://localhost:5173
   ```

## 📖 How to Use

### Adding Products to Cart
- Browse products on the main page
- Select quantity and click "Add to Cart"
- View cart by clicking the cart icon in the header

### Checkout Process
- Open cart sidebar
- Review items and total
- Click "Checkout" to process payment
- View receipt and shipment details

### Wallet Management
- Check balance in the top section
- Add funds using the "Add Funds" button
- View transaction history below

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons

## 📁 Project Structure

```
src/
├── components/          # React components
├── services/           # Business logic
├── types/              # TypeScript types
├── hooks/              # Custom React hooks
├── data/               # Sample data
└── App.tsx             # Main app component
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Build for production
npm run build
```

## 📱 Screenshots

### Shopping Cart
![Shopping Cart](./public/img/3.png)

### Checkout Receipt
![Checkout Receipt](./public/img/3-1.png)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions or support, please open an issue on GitHub.