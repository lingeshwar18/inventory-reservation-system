# Inventory Reservation System

A full-stack inventory reservation system built using Next.js, Prisma, Supabase PostgreSQL, and TypeScript.

This project simulates a real-world e-commerce inventory reservation workflow where stock is temporarily reserved during checkout to avoid overselling.

---

# Features

## Inventory Management
- Products and warehouses management
- Inventory tracking per warehouse
- Available stock calculation
- Reserved stock tracking

## Reservation System
- Reserve stock during checkout
- Release reserved stock
- Confirm reservation purchase
- Reservation expiry countdown timer

## Frontend
- Product listing dashboard
- Live stock updates
- Reservation checkout page
- Countdown timer UI
- Real-time reservation flow

## Backend
- REST API endpoints using Next.js App Router
- Prisma ORM integration
- PostgreSQL database using Supabase
- Reservation and inventory database models

---

# Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Prisma ORM
- Supabase PostgreSQL
- Tailwind CSS

---

# API Endpoints

## Products

```http
GET /api/products
```

Returns all products with warehouse inventory details.

---

## Reserve Stock

```http
POST /api/reserve
```

Temporarily reserves stock for checkout.

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

Confirms reservation after successful payment.

---

# Reservation Workflow

1. User views available products
2. User clicks "Reserve Stock"
3. Stock is temporarily reserved
4. User is redirected to checkout page
5. Countdown timer starts
6. User can:
   - Confirm Purchase
   - Cancel Reservation
7. Inventory updates automatically

---

# Database Models

- Product
- Warehouse
- Inventory
- Reservation

Reservation statuses:
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
DIRECT_URL="your_direct_url"
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

## 6. Seed Database

```bash
npx tsx prisma/seed.ts
```

---

## 7. Start Development Server

```bash
npm run dev
```

---

# Production Expiry Strategy

The frontend currently displays a live countdown timer for reservation expiry.

In production, reservation cleanup can be implemented using:
- Vercel Cron Jobs
- Background workers
- Scheduled database cleanup jobs

---

# Trade-offs

- Reservation concurrency handling can be improved further using database transactions or Redis locking.
- Automatic reservation cleanup is not fully implemented yet.
- Idempotency support is not implemented.

---

# Future Improvements

- Redis distributed locking
- Automatic reservation cleanup
- Payment gateway integration
- Authentication system
- Admin dashboard
- Better UI/UX improvements

---

# Deployment

- Frontend: Vercel
- Database: Supabase PostgreSQL

---

# Author

Lingeshwar G