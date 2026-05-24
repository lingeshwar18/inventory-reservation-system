# Inventory Reservation System

Live Demo:  
https://inventory-reservation-system-3w8h.vercel.app/

GitHub Repository:  
https://github.com/lingeshwar18/inventory-reservation-system

---

# Project Overview

This project is a full-stack Inventory Reservation System built using Next.js, Prisma ORM, Supabase PostgreSQL, and TypeScript.

The system simulates a real-world inventory reservation workflow used in e-commerce platforms to prevent overselling of products during checkout.

Users can:
- View products and warehouse stock
- Reserve stock temporarily
- Release reserved stock
- Confirm reservations
- Track reservation expiry using a countdown timer

---

# Features

## Inventory Management
- Product inventory tracking
- Warehouse-based stock management
- Available stock calculation
- Reserved stock handling

## Reservation Workflow
- Reserve product stock
- Release reserved stock
- Confirm purchase flow
- Reservation checkout page
- Reservation expiry countdown timer

## Frontend Features
- Responsive UI
- Product dashboard
- Live inventory updates
- Reservation confirmation page
- Timer-based reservation handling

## Backend Features
- REST API routes
- Prisma ORM integration
- PostgreSQL database
- Inventory and reservation management

---

# Tech Stack

## Frontend
- Next.js 15
- React
- TypeScript
- Tailwind CSS

## Backend
- Next.js API Routes
- Prisma ORM

## Database
- Supabase PostgreSQL

## Deployment
- Vercel

---

# API Endpoints

## Get Products

```http
GET /api/products
```

Returns all products with inventory details.

---

## Reserve Stock

```http
POST /api/reserve
```

Temporarily reserves stock for a product.

---

## Release Stock

```http
POST /api/release
```

Releases reserved stock back to inventory.

---

## Confirm Reservation

```http
POST /api/confirm
```

Confirms reservation after checkout.

---

# Reservation Workflow

1. User views products
2. User reserves stock
3. Stock becomes temporarily reserved
4. Reservation checkout page opens
5. Countdown timer starts
6. User can:
   - Confirm Purchase
   - Cancel Reservation
7. Inventory updates automatically

---

# Database Models

## Product
Stores product information.

## Warehouse
Stores warehouse information.

## Inventory
Tracks stock availability and reserved stock.

## Reservation
Tracks reservation details and status.

---

# Reservation Status

- PENDING
- CONFIRMED
- RELEASED

---

# Local Setup

## 1. Clone Repository

```bash
git clone https://github.com/lingeshwar18/inventory-reservation-system.git
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create `.env` file:

```env
DATABASE_URL="your_database_url"
DIRECT_URL="your_direct_database_url"
```

---

## 4. Generate Prisma Client

```bash
npx prisma generate
```

---

## 5. Push Database Schema

```bash
npx prisma db push
```

---

## 6. Seed Sample Data

```bash
npx tsx prisma/seed.ts
```

---

## 7. Run Development Server

```bash
npm run dev
```

---

# Production Notes

The reservation timer currently works on the frontend.

In production environments, reservation expiry cleanup can be improved using:
- Cron jobs
- Background workers
- Scheduled cleanup services

---

# Future Improvements

- Redis-based distributed locking
- Automatic reservation cleanup
- Authentication system
- Payment integration
- Admin dashboard
- Advanced analytics

---

# Challenges Solved

- Inventory reservation handling
- Preventing overselling
- Prisma + Vercel deployment configuration
- Reservation lifecycle management
- Real-time stock updates

---

# Deployment

Frontend deployed on Vercel.

Database hosted on Supabase PostgreSQL.

---

# Author

Lingeshwar G