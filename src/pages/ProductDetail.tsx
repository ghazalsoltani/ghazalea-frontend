import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Product, Category } from "../types";
import { api } from "../services/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isToggling, setIsToggling] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const inWishlist = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const [productData, categoriesData] = await Promise.all([
          api.getProduct(parseInt(id)),
          api.getCategories(),
        ]);
        setProduct(productData);
        setCategories(categoriesData);
      } catch (err) {
        setError("Produit non trouvé");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const priceWithTax = product ? product.price * (1 + product.tva / 100) : 0;

  const handleCategoryClick = (category: Category | null) => {
    if (category === null) {
      navigate("/home");
    } else {
      navigate(`/category/${category.slug}`);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!product || isToggling) return;

    setIsToggling(true);
    try {
      await toggleWishlist(product.id);
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    } finally {
      setIsToggling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
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
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <Navbar categories={categories} onCategoryClick={handleCategoryClick} />
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <h1
              className="text-2xl text-gray-800 mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Produit non trouvé
            </h1>
            <Link
              to="/home"
              className="text-[#c5a880] hover:text-[#b8956d] transition-colors"
            >
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const categorySlug =
    product.category.slug || product.category.name.toLowerCase();

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col">
      <Navbar categories={categories} onCategoryClick={handleCategoryClick} />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/home" className="hover:text-[#c5a880] transition-colors">
              Accueil
            </Link>
            <span className="text-gray-300">—</span>
            <Link
              to={`/category/${categorySlug}`}
              className="hover:text-[#c5a880] transition-colors"
            >
              {product.category.name}
            </Link>
            <span className="text-gray-300">—</span>
            <span className="text-gray-800">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product detail */}
      <div className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left column - Product image */}
            <div className="relative group">
              <div className="aspect-[4/5] bg-white overflow-hidden">
                <img
                  src={`http://127.0.0.1:8080/uploads/${product.illustration}`}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Wishlist button on image */}
              <button
                type="button"
                onClick={handleWishlistToggle}
                disabled={isToggling}
                className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg ${
                  inWishlist
                    ? "bg-[#c5a880] text-white"
                    : "bg-white text-gray-400 hover:text-[#c5a880]"
                } ${isToggling ? "opacity-50 cursor-not-allowed" : ""}`}
                title={
                  inWishlist ? "Retirer des favoris" : "Ajouter aux favoris"
                }
              >
                <svg
                  className="w-5 h-5"
                  fill={inWishlist ? "currentColor" : "none"}
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
              </button>
            </div>

            {/* Right column - Product info */}
            <div className="flex flex-col justify-center">
              {/* Category */}
              <Link
                to={`/category/${categorySlug}`}
                className="text-xs uppercase tracking-[0.2em] text-[#c5a880] mb-4 hover:text-[#b8956d] transition-colors"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {product.category.name}
              </Link>

              {/* Product name */}
              <h1
                className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-6"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 400,
                }}
              >
                {product.name}
              </h1>

              {/* Price */}
              <p
                className="text-2xl md:text-3xl text-gray-800 mb-2"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {priceWithTax.toFixed(2).replace(".", ",")} €
              </p>

              {/* Tax info */}
              <p className="text-sm text-gray-400 mb-8">
                TVA incluse ({product.tva}%)
              </p>

              {/* Divider */}
              <div className="w-16 h-[1px] bg-[#c5a880] mb-8" />

              {/* Description */}
              <div
                className="prose prose-gray text-gray-600 mb-10 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />

              {/* Add to cart button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-full py-4 text-sm uppercase tracking-[0.2em] transition-all duration-300 ${
                  addedToCart
                    ? "bg-green-600 text-white"
                    : "bg-[#2c3e50] text-white hover:bg-[#34495e]"
                }`}
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {addedToCart ? "✓ Ajouté au panier" : "Ajouter au panier"}
              </button>

              {/* Trust indicators */}
              <div className="mt-10 pt-8 border-t border-gray-200 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <svg
                    className="w-5 h-5 text-[#c5a880]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Livraison offerte dès 50€</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <svg
                    className="w-5 h-5 text-[#c5a880]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Retours gratuits sous 30 jours</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <svg
                    className="w-5 h-5 text-[#c5a880]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Paiement sécurisé par Stripe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProductDetail;
