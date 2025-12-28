import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Category } from "../types";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
  readonly categories?: Category[];
  readonly onCategoryClick?: (category: Category | null) => void;
}

export default function Navbar({
  categories = [],
  onCategoryClick,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleCategoryClick = (category: Category | null) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    } else {
      navigate(category ? `/category/${category.slug}` : "/home");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/home"
            className="flex-shrink-0 transition-transform hover:scale-105"
            title="Accueil"
          >
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-12 w-auto lg:h-12 object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => handleCategoryClick(null)}
              className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all transform hover:scale-105"
            >
              Tous les produits
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all transform hover:scale-105"
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Right Section: Auth + Cart + Mobile Button */}
          <div className="flex items-center space-x-2">
            {/* Auth */}
            {isAuthenticated ? (
              <div className="hidden lg:block relative">
                <button
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all"
                >
                  <span>Bonjour, {user?.firstname}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      accountMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {accountMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setAccountMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                      <Link
                        to="/account"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setAccountMenuOpen(false)}
                      >
                        Mon compte
                      </Link>
                      <Link
                        to="/favorites"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setAccountMenuOpen(false)}
                      >
                        Favoris
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setAccountMenuOpen(false)}
                      >
                        Commandes
                      </Link>
                      <hr className="my-2" />
                      <button
                        onClick={() => {
                          logout();
                          setAccountMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Déconnexion
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-lg text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all"
                >
                  Inscription
                </Link>
              </div>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-lg transition-all"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-lg transition-all"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 py-4 border-t border-gray-200 space-y-4">
            <div>
              <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Catégories
              </p>
              <button
                onClick={() => {
                  handleCategoryClick(null);
                  setMobileMenuOpen(false);
                }}
                className="block w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                Tous les produits
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    handleCategoryClick(cat);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4">
              <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Compte
              </p>
              {isAuthenticated ? (
                <>
                  <p className="px-4 py-2 text-gray-600">
                    Bonjour,{" "}
                    <span className="font-medium">{user?.firstname}</span>
                  </p>
                  <Link
                    to="/account"
                    className="block px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mon compte
                  </Link>
                  <Link
                    to="/favorites"
                    className="block px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Favoris
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mes commandes
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-red-600 rounded-lg hover:bg-gray-100"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-3 text-gray-900 font-medium rounded-lg hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Inscription
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
