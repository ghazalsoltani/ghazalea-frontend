import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import CartPage from "./pages/CartPage";
import Home from "./pages/Home";
import { CartProvider } from "./context/CartContext";
import { CheckoutProvider } from "./context/CheckoutContext";
import ProtectedRoute from "./components/ProtectedRoute";
import OrdersPage from "./pages/OrdersPage";
import SummaryStep from "./pages/checkout/SummaryStep";
import AddressStep from "./pages/checkout/AddressStep";
import SuccessPage from "./pages/checkout/SuccessPage";
import CancelPage from "./pages/checkout/CancelPage";
import CarrierStep from "./pages/checkout/CarrierStep";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/loginPage";
import ProductDetail from "./pages/ProductDetail";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <CheckoutProvider>
            <Routes>
              {/*Redirect to /home */}
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

              {/* Checkout flow (protected) */}
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
              <Route
                path="/checkout/success"
                element={
                  <ProtectedRoute>
                    <SuccessPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout/cancel"
                element={
                  <ProtectedRoute>
                    <CancelPage />
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
            </Routes>
          </CheckoutProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
