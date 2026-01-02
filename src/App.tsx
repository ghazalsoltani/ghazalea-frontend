import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { CheckoutProvider } from "./context/CheckoutContext";
import { WishlistProvider } from "./context/WishlistContext";

import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";
import OrdersPage from "./pages/OrdersPage";
import ProductDetail from "./pages/ProductDetail";
import FavoritesPage from "./pages/FavoritesPage";

import AddressStep from "./pages/checkout/AddressStep";
import CarrierStep from "./pages/checkout/CarrierStep";
import SummaryStep from "./pages/checkout/SummaryStep";
import SuccessPage from "./pages/checkout/SuccessPage";
import CancelPage from "./pages/checkout/CancelPage";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <CheckoutProvider>
              <Routes>
                {/* Redirect root to home */}
                <Route path="/" element={<Navigate to="/home" replace />} />

                {/* Public routes */}
                <Route path="/home" element={<Home />} />
                <Route path="/category/:slug" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected routes */}
                <Route
                  path="/account"
                  element={
                    <ProtectedRoute>
                      <AccountPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <OrdersPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <ProtectedRoute>
                      <FavoritesPage />
                    </ProtectedRoute>
                  }
                />

                {/* Checkout routes */}
                <Route
                  path="/checkout/address"
                  element={
                    <ProtectedRoute>
                      <AddressStep />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/checkout/carrier"
                  element={
                    <ProtectedRoute>
                      <CarrierStep />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/checkout/summary"
                  element={
                    <ProtectedRoute>
                      <SummaryStep />
                    </ProtectedRoute>
                  }
                />
                <Route path="/checkout/success" element={<SuccessPage />} />
                <Route path="/checkout/cancel" element={<CancelPage />} />
              </Routes>
            </CheckoutProvider>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
