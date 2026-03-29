# Amazon Inspired E-Commerce Platform

This project is a full stack Amazon-inspired e-commerce application built for a fullstack internship assignment.

## Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB Atlas with Mongoose

## Features

### Core Features

- Product listing page with Amazon-style layout
- Search products by name
- Filter products by category
- Product detail page
- Multiple product images with thumbnail gallery
- Product specifications section
- Stock availability and pricing
- Add to Cart
- Buy Now
- Shopping cart
- Update quantity
- Remove items
- Cart subtotal and summary
- Checkout page with shipping form
- Place order flow
- Order confirmation page with order ID

### Bonus Features

- Responsive layout
- Order history page

## Project Structure

```text
ecommerce-project/
  backend/
    controllers/
    models/
    routes/
    server.js
    seed.js
  frontend/
    src/
      components/
      pages/
      api.js
      App.jsx
      main.jsx
```

## Database Schema

### Product

- `name`
- `price`
- `description`
- `category`
- `brand`
- `image`
- `images`
- `specifications`
- `rating`
- `numReviews`
- `stock`

### Cart

- `userId`
- `items`

### Order

- `userId`
- `items`
- `shippingAddress`
- `itemsPrice`
- `shippingPrice`
- `taxPrice`
- `totalPrice`
- `status`

## API Routes

### Products

- `GET /api/products`
- `GET /api/products/categories`
- `GET /api/products/:id`

### Cart

- `GET /api/cart`
- `POST /api/cart`
- `PUT /api/cart/:productId`
- `DELETE /api/cart/:productId`
- `DELETE /api/cart`

### Orders

- `GET /api/orders`
- `POST /api/orders`
- `GET /api/orders/:id`

## Setup Instructions

### 1. Backend

Create `backend/.env`

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

Install and run:

```bash
cd backend
npm install
npm run seed
npm run dev
```

### 2. Frontend

Create `frontend/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Install and run:

```bash
cd frontend
npm install
npm run dev -- --host localhost
```

Open:

```text
http://localhost:5173
```

## Assumptions

- No authentication is required
- A default user is assumed to be logged in
- MongoDB Atlas is used instead of PostgreSQL/MySQL for this version
- Product data is seeded using the provided seed script

## Verification

- Frontend lint passes
- Frontend production build passes
- Backend syntax checks pass

## Notes

This project is intentionally kept beginner-friendly with simple React pages, simple Express controllers, and easy-to-follow MongoDB models.
