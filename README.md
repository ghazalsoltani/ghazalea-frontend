# La Boutique Française - React Frontend

A modern, responsive e-commerce frontend built with **React 18** and **TypeScript**, consuming a REST API powered by Symfony. This project demonstrates a decoupled architecture where the frontend and backend operate as independent applications communicating via HTTP.

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 Project Purpose

This frontend application serves as the client-side interface for an e-commerce platform specializing in French leather goods. It showcases:

- **Decoupled Architecture**: Complete separation between frontend (React SPA) and backend (Symfony REST API)
- **Modern React Patterns**: Functional components, hooks, context API for state management
- **Type Safety**: Full TypeScript implementation with strict typing
- **Responsive Design**: Mobile-first approach using Tailwind CSS utility classes
- **JWT Authentication**: Secure user authentication with token persistence

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    React Application                       │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │  │
│  │  │   Pages     │  │ Components  │  │    Context      │   │  │
│  │  │  - Home     │  │  - Navbar   │  │  - AuthContext  │   │  │
│  │  │  - Product  │  │  - Product  │  │  - CartContext  │   │  │
│  │  │  - Cart     │  │    Card     │  │                 │   │  │
│  │  │  - Login    │  │  - Protected│  │                 │   │  │
│  │  │  - Register │  │    Route    │  │                 │   │  │
│  │  │  - Account  │  │             │  │                 │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│                              │ HTTP (REST API)                   │
│                              ▼                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              Symfony Backend (localhost:8080)              │  │
│  │         API Platform • JWT Auth • MySQL Database           │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## ✨ Implemented Features

### Product Catalog
- **Product Listing**: Responsive grid displaying all products with images, prices, and categories
- **Category Filtering**: Filter products by category via navigation menu
- **Product Detail Page**: Full product information with description, price (including VAT), and add-to-cart functionality
- **Dynamic Pricing**: Automatic VAT calculation displayed to customers

### Shopping Cart
- **Add/Remove Products**: Full cart management with quantity controls
- **Persistent Cart**: Cart data stored in localStorage, survives page refresh
- **Real-time Updates**: Cart badge in navigation shows current item count
- **Order Summary**: Subtotal, shipping, and total calculations

### User Authentication
- **JWT-based Login**: Secure authentication using JSON Web Tokens
- **User Registration**: New account creation with form validation
- **Session Persistence**: Token stored in localStorage, automatically decoded on page refresh
- **Protected Routes**: Certain pages require authentication to access
- **User Profile**: Account page displaying user information

### User Interface
- **Responsive Navigation**: Desktop menu with mobile hamburger menu
- **Loading States**: Spinner animations during data fetching
- **Error Handling**: User-friendly error messages
- **Smooth Transitions**: Hover effects and animations on interactive elements

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI library with concurrent features |
| **TypeScript** | Static typing for improved code quality |
| **React Router 6** | Client-side routing and navigation |
| **Tailwind CSS 3** | Utility-first CSS framework |
| **jwt-decode** | Client-side JWT token parsing |
| **Context API** | Global state management (Auth, Cart) |
| **Fetch API** | HTTP requests to backend |

## 📁 Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── Navbar.tsx          # Navigation with auth state & cart badge
│   ├── ProductCard.tsx     # Product display card
│   └── ProtectedRoute.tsx  # Route guard for authenticated pages
│
├── context/                 # React Context providers
│   ├── AuthContext.tsx     # Authentication state & JWT handling
│   └── CartContext.tsx     # Shopping cart state & localStorage
│
├── pages/                   # Page components (routes)
│   ├── Home.tsx            # Product grid with category filter
│   ├── ProductDetail.tsx   # Single product view
│   ├── CartPage.tsx        # Shopping cart management
│   ├── LoginPage.tsx       # User login form
│   ├── RegisterPage.tsx    # User registration form
│   └── AccountPage.tsx     # User profile (protected)
│
├── services/                # API communication layer
│   └── api.ts              # Centralized API calls
│
├── types/                   # TypeScript type definitions
│   └── index.ts            # Product, Category, CartItem interfaces
│
├── App.tsx                  # Route configuration
└── index.tsx               # Application entry point
```

## 🔐 Authentication Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    Authentication Flow                        │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  LOGIN:                                                       │
│  1. User submits email/password                               │
│  2. POST /api/login_check → Symfony validates credentials     │
│  3. Symfony returns JWT token containing user data            │
│  4. Token stored in localStorage                              │
│  5. Token decoded to extract user info (firstname, etc.)      │
│  6. User state updated, UI reflects logged-in status          │
│                                                               │
│  PAGE REFRESH:                                                │
│  1. App loads, checks localStorage for token                  │
│  2. If token exists, validate expiration                      │
│  3. Decode token to restore user state                        │
│  4. User remains authenticated (no server request needed)     │
│                                                               │
│  LOGOUT:                                                      │
│  1. Clear token from localStorage                             │
│  2. Reset user state to null                                  │
│  3. Redirect to public page                                   │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Backend API running on `http://localhost:8080` (see [Backend Repository](https://github.com/ghazalsoltani/Ecommerce-Symfony-App))

### Installation

```bash
# Clone the repository
git clone https://github.com/ghazalsoltani/laboutiquefrancaise-frontend.git
cd laboutiquefrancaise-frontend

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at `http://localhost:3000`

### Environment Configuration

The API base URL is configured in `src/services/api.ts`:
```typescript
const API_URL = 'http://localhost:8080/api';
```

## 🧩 Key Implementation Details

### State Management with Context API

The application uses React Context for global state, avoiding prop drilling:

**AuthContext** manages:
- User authentication state
- JWT token storage and decoding
- Login/logout functions
- Token expiration validation

**CartContext** manages:
- Cart items array
- Add/remove/update quantity functions
- Total calculations
- localStorage persistence

### Type-Safe API Communication

All API responses are typed with TypeScript interfaces:

```typescript
interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  illustration: string;
  price: number;
  tva: number;
  category: Category;
  isHomepage: boolean;
}
```

### Protected Routes Pattern

Routes requiring authentication are wrapped with `ProtectedRoute`:

```tsx
<Route path="/account" element={
  <ProtectedRoute>
    <AccountPage />
  </ProtectedRoute>
} />
```

## 🔗 Related Repository

This frontend consumes the API from the Symfony backend:
- **Backend Repository**: [Ecommerce-Symfony-App](https://github.com/ghazalsoltani/Ecommerce-Symfony-App)

## 📝 Development Approach

This project was developed following these principles:

1. **Component-Based Architecture**: Each UI element is a reusable, self-contained component
2. **Separation of Concerns**: Clear separation between UI (components), state (context), and data fetching (services)
3. **Type Safety First**: TypeScript interfaces defined before implementation
4. **Mobile-First Design**: Responsive design starting from mobile breakpoints
5. **Progressive Enhancement**: Core functionality works, enhanced features layer on top

## 👤 Author

**Ghazal Soltani**
- GitHub: [@ghazalsoltani](https://github.com/ghazalsoltani)
- LinkedIn: [ghazal-soltani](https://linkedin.com/in/ghazal-soltani)

## 📄 License

This project is licensed under the MIT License.