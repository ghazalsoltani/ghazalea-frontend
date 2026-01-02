import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Category } from "../types";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";

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
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCategoryNavigation = (category: Category) => {
    setMobileMenuOpen(false);
    if (onCategoryClick) {
      onCategoryClick(category);
    }
    navigate(`/category/${category.slug}`);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-[#faf8f5]"
      }`}
    >
      {/* Top Bar */}
      <div className="bg-[#2c3e50] text-white text-center py-2 text-xs tracking-[0.15em] uppercase">
        <span style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          Livraison offerte dès 50€ d'achat
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/home"
            className="flex-shrink-0 transition-opacity hover:opacity-80"
          >
            <img
              src="/images/logo.png"
              alt="Ghazaléa"
              className="h-10 lg:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Menu - Only Categories */}
          <div className="hidden lg:flex items-center justify-center flex-1 px-8">
            <div className="flex items-center space-x-12">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => handleCategoryNavigation(cat)}
                  className="relative py-2 text-gray-700 text-sm uppercase tracking-[0.2em] transition-colors hover:text-[#c5a880] group cursor-pointer"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {cat.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a880] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-1 lg:space-x-3">
            {/* Auth - Desktop */}
            {isAuthenticated ? (
              <div className="hidden lg:block relative">
                <button
                  type="button"
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 text-sm hover:text-[#c5a880] transition-colors"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  <span>Bonjour, {user?.firstname}</span>
                  <svg
                    className={`w-3 h-3 transition-transform ${
                      accountMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
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
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-sm shadow-lg border border-gray-100 py-2 z-20">
                      <Link
                        to="/account"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#faf8f5] hover:text-[#c5a880] transition-colors"
                        onClick={() => setAccountMenuOpen(false)}
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                        }}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Mon compte
                      </Link>
                      <Link
                        to="/favorites"
                        className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-[#faf8f5] hover:text-[#c5a880] transition-colors"
                        onClick={() => setAccountMenuOpen(false)}
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                          Favoris
                        </div>
                        {wishlistCount > 0 && (
                          <span className="text-xs bg-[#c5a880] text-white px-2 py-0.5 rounded-full">
                            {wishlistCount}
                          </span>
                        )}
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#faf8f5] hover:text-[#c5a880] transition-colors"
                        onClick={() => setAccountMenuOpen(false)}
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                        }}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        </svg>
                        Commandes
                      </Link>
                      <div className="border-t border-gray-100 my-2" />
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setAccountMenuOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                        }}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Déconnexion
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 text-sm hover:text-[#c5a880] transition-colors"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-[#2c3e50] text-white text-sm hover:bg-[#34495e] transition-colors"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Inscription
                </Link>
              </div>
            )}

            {/* Favorites */}
            <Link
              to="/favorites"
              className="relative p-2 text-gray-700 hover:text-[#c5a880] transition-colors"
              title="Mes favoris"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#c5a880] text-white text-[10px] font-medium rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-[#c5a880] transition-colors"
              title="Mon panier"
            >
              <svg
                className="w-5 h-5"
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
                <span className="absolute -top-0.5 -right-0.5 bg-[#2c3e50] text-white text-[10px] font-medium rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-[#c5a880] transition-colors"
            >
              <svg
                className="w-5 h-5"
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
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 border-t border-gray-100 space-y-1">
            {/* Categories Only */}
            {categories.map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => handleCategoryNavigation(cat)}
                className="block w-full text-left px-4 py-3 text-gray-700 text-sm uppercase tracking-[0.15em] hover:bg-[#faf8f5] hover:text-[#c5a880] transition-colors"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {cat.name}
              </button>
            ))}

            <div className="border-t border-gray-100 my-3" />

            {/* Account Section */}
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2">
                  <p className="text-xs text-gray-500 uppercase tracking-[0.1em]">
                    Bonjour, {user?.firstname}
                  </p>
                </div>
                <Link
                  to="/account"
                  className="block px-4 py-3 text-gray-700 hover:bg-[#faf8f5] hover:text-[#c5a880]"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Mon compte
                </Link>
                <Link
                  to="/favorites"
                  className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-[#faf8f5] hover:text-[#c5a880]"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  <span>Favoris</span>
                  {wishlistCount > 0 && (
                    <span className="bg-[#c5a880] text-white text-xs px-2 py-0.5 rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-3 text-gray-700 hover:bg-[#faf8f5] hover:text-[#c5a880]"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Commandes
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <div className="px-4 py-3 space-y-2">
                <Link
                  to="/login"
                  className="block w-full py-3 text-center text-gray-700 border border-gray-300 hover:border-[#c5a880] hover:text-[#c5a880] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="block w-full py-3 text-center bg-[#2c3e50] text-white hover:bg-[#34495e] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
