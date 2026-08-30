# 🛍️ ShopSphere

A full-stack e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js). Users can browse products, search and filter by category, add items to cart, checkout, and track their orders. Admins get a dedicated dashboard to manage products and update order status.

## ✨ Features

**Customer**
- User registration and login (JWT authentication)
- Browse products with search, category filter, and sorting (price, rating)
- Product detail page with reviews and ratings
- Shopping cart (add, update quantity, remove items)
- Checkout with shipping address and order summary
- Order history and order status tracking (Processing → Shipped → Delivered)
- Leave a product review after logging in

**Admin**
- Add, edit, and delete products
- View all customer orders
- Update order status
- Product stock automatically updates when an order is placed

## 🛠️ Tech Stack

**Frontend:** React, React Router, Axios, Tailwind CSS, Vite
**Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt

## 📁 Project Structure

```
shop-sphere/
├── backend/
│   ├── config/         # MongoDB connection
│   ├── models/         # User, Product, Order schemas
│   ├── routes/         # Auth, Product, Order APIs
│   ├── middleware/      # JWT auth & admin protection
│   └── server.js
└── frontend/
    └── src/
        ├── components/  # Navbar, Footer, ProductCard
        ├── pages/       # Home, ProductDetail, Cart, Checkout, Admin, etc.
        ├── context/     # Auth & Cart global state
        └── utils/       # API instance (Axios)
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- A MongoDB Atlas account (free tier works) — [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

### 1. Clone the repository
```bash
git clone https://github.com/gulshanshakya975655-maker/shop-sphere.git
cd shop-sphere
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

Start the backend server:
```bash
npm run dev
```
Backend runs on `http://localhost:5000`

### 3. Frontend setup
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

### 4. Open in browser
Visit `http://localhost:5173` to use the app.

## 🔑 Making Yourself an Admin

New accounts are created as regular customers by default. To get admin access (add/edit/delete products, manage orders), open your MongoDB Atlas cluster, find your user in the `users` collection, and change the `role` field from `"customer"` to `"admin"`.

## 📸 Screenshots

*(Add screenshots of the home page, product page, cart, and admin dashboard here)*

## 🎯 Possible Future Improvements

- Real payment gateway integration (Razorpay/Stripe)
- Email notifications on order confirmation
- Product image upload instead of URL input
- Wishlist feature
- Unit tests

---
Built as a portfolio project to practice full-stack development.