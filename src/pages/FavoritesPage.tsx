import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Category, Product } from "../types";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function FavoritesPage() {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useCart();
  const { removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [wishlistData, categoriesData] = await Promise.all([
          api.getWishlist(),
          api.getCategories(),
        ]);
        setFavorites(wishlistData);
        setCategories(categoriesData);
      } catch (err) {
        setError("Impossible de charger vos favoris");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category: Category | null) => {
    if (category === null) {
      navigate("/home");
    } else {
      navigate(`/category/${category.slug}`);
    }
  };

  const handleRemoveFromWishlist = async (productId: number) => {
    try {
      await removeFromWishlist(productId);
      setFavorites(favorites.filter((p) => p.id !== productId));
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex flex-col">
        <Navbar categories={categories} onCategoryClick={handleCategoryClick} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border border-gray-300 border-t-gray-800 rounded-full animate-spin mx-auto"></div>
            <p
              className="mt-6 text-gray-500 text-sm uppercase tracking-[0.2em]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Chargement
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col">
      <Navbar categories={categories} onCategoryClick={handleCategoryClick} />

      {/* Page Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1
            className="text-4xl md:text-5xl text-gray-800 mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 400,
            }}
          >
            Mes Favoris
          </h1>
          <p className="text-gray-500">
            {favorites.length > 0
              ? `${favorites.length} pièce${
                  favorites.length > 1 ? "s" : ""
                } dans votre sélection`
              : "Votre sélection est vide"}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {error && (
            <div className="mb-8 p-4 bg-red-50 text-red-600 text-center">
              {error}
            </div>
          )}

          {favorites.length === 0 ? (
            <div className="text-center py-16">
              {/* Empty heart icon */}
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                <svg
                  className="w-12 h-12 text-[#c5a880]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>

              <h2
                className="text-2xl text-gray-800 mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Aucun favori pour le moment
              </h2>
              <p className="text-gray-500 mb-10 max-w-md mx-auto">
                Explorez nos collections et ajoutez vos pièces préférées en
                cliquant sur le cœur
              </p>
              <Link
                to="/home"
                className="inline-block px-10 py-4 bg-[#2c3e50] text-white text-sm uppercase tracking-[0.2em] hover:bg-[#34495e] transition-colors"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Découvrir la collection
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {favorites.map((product) => {
                const priceWithTax = product.price * (1 + product.tva / 100);

                return (
                  <div key={product.id} className="group">
                    {/* Product Image */}
                    <div className="relative aspect-[3/4] bg-white overflow-hidden mb-4">
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={`http://127.0.0.1:8080/uploads/${product.illustration}`}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </Link>

                      {/* Remove from wishlist button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveFromWishlist(product.id)}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#c5a880] hover:bg-[#c5a880] hover:text-white transition-all shadow-sm"
                        title="Retirer des favoris"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>

                      {/* Add to cart overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          type="button"
                          onClick={() => handleAddToCart(product)}
                          className="w-full py-3 bg-white text-gray-800 text-sm uppercase tracking-[0.15em] hover:bg-[#2c3e50] hover:text-white transition-colors"
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                          }}
                        >
                          Ajouter au panier
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="text-center">
                      <p className="text-xs uppercase tracking-[0.15em] text-[#c5a880] mb-2">
                        {product.category.name}
                      </p>
                      <Link to={`/product/${product.id}`}>
                        <h3
                          className="text-gray-800 hover:text-[#c5a880] transition-colors mb-2"
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                          }}
                        >
                          {product.name}
                        </h3>
                      </Link>
                      <p
                        className="text-gray-800"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                        }}
                      >
                        {priceWithTax.toFixed(2).replace(".", ",")} €
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default FavoritesPage;
