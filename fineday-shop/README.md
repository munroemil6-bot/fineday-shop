# FineDay Shop

FineDay Shop is a React + Vite shopping application that allows users to browse products, add items to cart, and purchase products while an admin manages inventory through a protected dashboard.

---

# Features

## Customer Features

- View products from db.json
- Search products
- Add items to cart
- View cart totals automatically
- Buy products
- Real-time quantity updates
- Purchase popup summary

---

## Admin Features

- Firebase Admin Login
- Protected Admin Dashboard
- Edit product prices
- Edit product quantities
- Add new products
- Delete products
- Logout functionality

---

# Technologies Used

- React
- Vite
- Tailwind CSS
- Axios
- Firebase Authentication
- JSON Server
- React Router DOM

---

# Project Structure

```bash
src/
│
├── components/
│   ├── Cart.jsx
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   ├── ProtectedRoute.jsx
│   └── SearchBar.jsx
│
├── pages/
│   ├── AddProduct.jsx
│   ├── AdminDashboard.jsx
│   ├── AdminLogin.jsx
│   ├── Home.jsx
│   └── Products.jsx
│
├── services/
│   └── firebase.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/fineday-shop.git
```

---

## 2. Open Project

```bash
cd fineday-shop
```

---

## 3. Install Dependencies

```bash
npm install
```

---

# Required Packages

```bash
npm install axios react-router-dom firebase
```

---

# Start React App

```bash
npm run dev
```

---

# Start JSON Server

Open another terminal and run:

```bash
npx json-server --watch db.json --port 3001
```

---

# Firebase Setup

Create a Firebase project and enable:

- Authentication
- Email/Password Login

Then add your Firebase configuration inside:

```bash
src/services/firebase.js
```

Example:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};
```

---

# Admin Login

Current Admin Credentials:

```bash
Email:
fineday@gmail.com

Password:
finedayshopping
```

---

# Example db.json

```json
{
  "products": [
    {
      "id": 1,
      "name": "Bread",
      "price": 80,
      "quantity": 10,
      "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff"
    }
  ]
}
```

---

# Future Upgrades

## Planned Features

- Mpesa payment integration
- Stripe payment gateway
- Card payment support
- Automatic change calculator
- Receipt generation
- Order history
- User authentication
- Product categories
- Product ratings and reviews
- Wishlist feature
- Dark mode
- Mobile responsiveness improvements
- Database migration from JSON Server to Firebase Firestore
- Real-time stock synchronization
- Sales analytics dashboard
- Email purchase confirmations

---

# Example Future Change Calculator

```js
const total = 350;
const paid = 500;

const change = paid - total;

console.log(`Change: Ksh ${change}`);
```

---

# Learning Objectives

This project demonstrates:

- React component structure
- State management
- API requests using Axios
- Firebase authentication
- CRUD operations
- Protected routes
- JSON Server integration
- Real-time UI updates

---

# Author

Developed by Myles Munroe

---

# License

This project is for educational purposes.