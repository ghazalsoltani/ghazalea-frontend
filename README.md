<img width="108" height="27" alt="logo" src="https://github.com/user-attachments/assets/093e2dc3-1a58-4863-ba72-c3fe81442572" />

## Frontend

<div align="center">

### Modern E-commerce SPA built with React 18 + TypeScript | Deployed on Vercel

  ![Ghazalea Demo](./public/demo/Ghazalea-demo.gif)

🌐 **[Live](https://ghazalea.com)** · 🔧 **[Backend Repo](https://github.com/ghazalsoltani/ghazalea-backend)**


[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat&logo=vercel)](https://vercel.com)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=flat&logo=stripe)](https://stripe.com)

</div>

---

## ⚡ Quick Overview

> A **production-deployed** React SPA for [ghazalea.com](https://ghazalea.com) - a French artisanal accessories e-commerce platform.

| 🎯 What I Built | 🛠️ How I Built It |
|-----------------|-------------------|
| Full E-commerce UI | **React 18** + TypeScript |
| Responsive Design | **Tailwind CSS** (Mobile-first) |
| State Management | **Context API** (4 contexts) |
| Secure Payments | **Stripe Checkout** integration |
| JWT Authentication | Token persistence + protected routes |
| Optimized Wishlist | Single API call + optimistic updates |

---

## 🎬 Live Demo

**🌐 Visit: [ghazalea.com](https://ghazalea.com)**

### Test Credentials
```
Email:    demo@ghazalea.com
Password: demo123
```

### Test Payment (Stripe)
```
Card:   4242 4242 4242 4242
Expiry: Any future date
CVC:    Any 3 digits
```

---

## 🏆 Key Technical Achievements

### 1️⃣ Optimized Wishlist System
```
BEFORE: 20 products = 20 API calls ❌
AFTER:  20 products = 1 API call  ✅

→ Centralized state + optimistic updates = instant UI
```

### 2️⃣ Multi-Step Checkout Flow
```
📍 Address  →  🚚 Carrier  →  📋 Summary  →  💳 Stripe  →  ✅ Success
```

### 3️⃣ Decoupled Architecture
```
React SPA (Vercel)  ──REST API──▶  Symfony Backend (Railway)
     ↓                                      ↓
 Static Hosting                    MySQL + Stripe + Mailjet
```

---

## 🚀 Quick Start

```bash
# Clone & Install
git clone https://github.com/ghazalsoltani/ghazalea-frontend.git
cd ghazalea-frontend
npm install

# Configure API
echo "REACT_APP_API_URL=https://ghazalea-backend-production.up.railway.app/api" > .env

# Start
npm start
# → http://localhost:3000
```

---

## 🛠️ Tech Stack

<table>
<tr>
<td align="center" width="150">

**Core**<br>
React 18<br>
TypeScript 5<br>
React Router 6

</td>
<td align="center" width="150">

**Styling**<br>
Tailwind CSS 3<br>
Mobile-First<br>
Custom Components

</td>
<td align="center" width="150">

**State**<br>
Context API<br>
localStorage<br>
JWT Decode

</td>
<td align="center" width="150">

**Integrations**<br>
Stripe Checkout<br>
REST API<br>
Vercel Deploy

</td>
</tr>
</table>

---

## ✨ Features

<details>
<summary><strong>🛒 Shopping Experience</strong></summary>

- Product catalog with category filtering
- Product detail pages with VAT calculation
- Shopping cart with localStorage persistence
- Real-time cart badge updates

</details>

<details>
<summary><strong>❤️ Wishlist System</strong></summary>

- Add/remove favorites with heart icon
- Optimistic UI updates (instant feedback)
- Single API call for all favorites
- Badge counter in navbar
- Dedicated favorites page

</details>

<details>
<summary><strong>💳 Checkout Flow</strong></summary>

- Multi-step process (Address → Carrier → Summary)
- Address management (create/select)
- Carrier selection with prices
- Stripe Checkout integration
- Order confirmation page

</details>

<details>
<summary><strong>🔐 Authentication</strong></summary>

- JWT-based login/logout
- User registration with validation
- Token persistence in localStorage
- Protected routes for authenticated pages
- Account management page

</details>

<details>
<summary><strong>📱 Responsive Design</strong></summary>

- Mobile-first approach
- Hamburger menu on mobile/tablet
- Grid adapts: 1 → 2 → 4 columns
- Touch-friendly interactions

</details>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      REACT APPLICATION                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                    CONTEXT LAYER                     │   │
│   │  AuthContext │ CartContext │ CheckoutCtx │ WishlistCtx  │
│   └─────────────────────────────────────────────────────┘   │
│                            │                                 │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                    PAGES                             │   │
│   │  Home │ Product │ Cart │ Checkout │ Orders │ Favorites  │
│   └─────────────────────────────────────────────────────┘   │
│                            │                                 │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                  COMPONENTS                          │   │
│   │  Navbar │ ProductCard │ Footer │ Hero │ TrustBadges │   │
│   └─────────────────────────────────────────────────────┘   │
│                            │                                 │
│                            ▼                                 │
│   ┌─────────────────────────────────────────────────────┐   │
│   │               API SERVICE LAYER                      │   │
│   │              src/services/api.ts                     │   │
│   └─────────────────────────────────────────────────────┘   │
│                            │                                 │
└────────────────────────────┼────────────────────────────────┘
                             │ HTTP (REST)
                             ▼
              ┌──────────────────────────────┐
              │     Symfony Backend API       │
              │   (Railway Production)        │
              └──────────────────────────────┘
```



## 📊 API Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Product catalog |
| `GET` | `/api/categories` | Category list |
| `POST` | `/api/login_check` | Authentication |
| `POST` | `/api/register` | User registration |
| `GET` | `/api/wishlist` | User favorites |
| `POST` | `/api/wishlist/add/{id}` | Add to wishlist |
| `DELETE` | `/api/wishlist/remove/{id}` | Remove from wishlist |
| `GET` | `/api/user/addresses` | Delivery addresses |
| `GET` | `/api/carriers` | Shipping options |
| `POST` | `/api/checkout/create-session` | Stripe checkout |
| `GET` | `/api/orders` | Order history |

---

## 📱 Responsive Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| 📱 Mobile | < 768px | 1 column, hamburger menu |
| 📱 Tablet | 768-1023px | 2 columns, hamburger menu |
| 💻 Desktop | ≥ 1024px | 4 columns, full navigation |

---

## 🔗 Links

| Resource | URL |
|----------|-----|
| 🌐 Live Site | [ghazalea.com](https://ghazalea.com) |
| 🔧 Backend Repo | [github.com/ghazalsoltani/ghazalea-backend](https://github.com/ghazalsoltani/ghazalea-backend) |
| 📡 API Endpoint | [ghazalea-backend-production.up.railway.app/api](https://ghazalea-backend-production.up.railway.app/api/products) |

---

## 👤 Author

<div align="center">

**Ghazal Soltani** - Full Stack Developer

[![GitHub](https://img.shields.io/badge/GitHub-ghazalsoltani-181717?style=for-the-badge&logo=github)](https://github.com/ghazalsoltani)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/ghazal-soltani)
[![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=for-the-badge&logo=gmail)](mailto:ghazal.soltaninasab@gmail.com)

</div>

---

<div align="center">

⭐ **Star this repo if you find it helpful!** ⭐

</div>
