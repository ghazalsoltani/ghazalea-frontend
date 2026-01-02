import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "../types";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";

interface ProductCardProps {
  readonly product: Product;
  readonly onAddToCart?: (product: Product) => void;
}

function ProductCard({ product }: ProductCardProps) {
  const [isToggling, setIsToggling] = useState(false);
  const { isAuthenticated } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const priceWithTax = product.price * (1 + product.tva / 100);
  const imageUrl = `http://127.0.0.1:8080/uploads/${product.illustration}`;

  // Check wishlist status from context (instant, no API call!)
  const inWishlist = isInWishlist(product.id);

  // Strip HTML tags and get plain text description
  const plainDescription = product.description
    ? product.description.replace(/<[^>]*>/g, "").trim()
    : "";

  // Get short description (first ~80 characters)
  const shortDescription =
    plainDescription.length > 80
      ? plainDescription.substring(0, 80).trim() + "..."
      : plainDescription;

  // Handle wishlist toggle
  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (isToggling) return;

    setIsToggling(true);
    try {
      await toggleWishlist(product.id);
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Image Container - Clickable */}
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Quick View Button - appears on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-medium rounded-lg shadow-lg">
              Voir le produit
            </span>
          </div>

          {/* Badge - if product is featured */}
          {product.isHomepage && (
            <span className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full shadow-md">
              Coup de cœur
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Product Name - Clickable */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Short Description */}
        {shortDescription && (
          <Link to={`/product/${product.id}`}>
            <p className="text-sm text-gray-700 line-clamp-1 hover:text-gray-700 transition-colors">
              {shortDescription}
            </p>
          </Link>
        )}

        {/* Price + Heart */}
        <div className="flex items-center justify-between mt-2">
          <Link to={`/product/${product.id}`}>
            <p className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors">
              {priceWithTax.toFixed(2).replace(".", ",")} €
            </p>
          </Link>

          {/* Heart Button */}
          <button
            type="button"
            onClick={handleWishlistToggle}
            disabled={isToggling}
            className={`p-2 rounded-full transition-all duration-200 ${
              inWishlist
                ? "text-red-500 bg-red-50 hover:bg-red-100"
                : "text-gray-400 bg-gray-50 hover:bg-gray-100 hover:text-red-400"
            } ${isToggling ? "opacity-50 cursor-not-allowed" : ""}`}
            title={inWishlist ? "Retirer des favoris" : "Ajouter aux favoris"}
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
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
