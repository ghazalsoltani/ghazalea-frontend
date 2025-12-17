import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import LoginPage from './pages/loginPage';
import { AuthProvider } from './context/AuthContext';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import AccountPage from './pages/AccountPage';
import OrdersPage from './pages/OredersPage';
import AddressStep from './pages/checkout/AddressStep';
import CarrierStep from './pages/checkout/CarrierStep';
import SummaryStep from './pages/checkout/SummaryStep';
import ConfirmationStep from './pages/checkout/ConfirmationStep';
import { CheckoutProvider } from './context/CheckoutContext';


function App() {
 return (
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <CheckoutProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Protected routes - require authentication */}
            <Route path="/account" element={
              <ProtectedRoute><AccountPage /></ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute><OrdersPage /></ProtectedRoute>
            } />
            {/* Checkout flow (protected) */}
              <Route path="/checkout/address" element={
                <ProtectedRoute><AddressStep /></ProtectedRoute>
              } />
              <Route path="/checkout/carrier" element={
                <ProtectedRoute><CarrierStep /></ProtectedRoute>
              } />
              <Route path="/checkout/summary" element={
                <ProtectedRoute><SummaryStep /></ProtectedRoute>
              } />
              <Route path="/checkout/confirmation" element={
                <ProtectedRoute><ConfirmationStep /></ProtectedRoute>
              } />
          </Routes>
        </CheckoutProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
  );
}

export default App;