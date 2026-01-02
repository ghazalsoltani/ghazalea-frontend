import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Category, Product } from "../types";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { api } from "../services/api";
import Navbar from "../components/Navbar";

function FavoritesPage() {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useCart();
  const { removeFromWishlist, refreshWishlist } = useWishlist();
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
      // Update context (optimistic + API call)
      await removeFromWishlist(productId);
      // Update local state
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
      <div className="min-h-screen bg-gray-50">
        <Navbar categories={categories} onCategoryClick={handleCategoryClick} />
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar categories={categories} onCategoryClick={handleCategoryClick} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Mes favoris</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {favorites.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg
              className="w-16 h-16 text-gray-300 mx-auto mb-4"
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
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun favori
            </h2>
            <p className="text-gray-500 mb-6">
              Vous n'avez pas encore ajouté de produits à vos favoris.
            </p>
            <Link
              to="/home"
              className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800"
            >
              Découvrir nos produits
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((product) => {
              const priceWithTax = product.price * (1 + product.tva / 100);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  {/* Product Image */}
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={`http://127.0.0.1:8080/uploads/${product.illustration}`}
                      alt={product.name}
                      className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-semibold text-gray-900 hover:text-blue-600 line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-lg font-bold text-gray-900 mt-2">
                      {priceWithTax.toFixed(2).replace(".", ",")} €
                    </p>

                    {/* Action Buttons */}
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm"
                      >
                        Ajouter au panier
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRemoveFromWishlist(product.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;