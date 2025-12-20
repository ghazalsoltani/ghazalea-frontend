import { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../types";

interface ProductCardProps {
  readonly product: Product;
  readonly onAddToCart: (product: Product) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const priceWithTax = product.price * (1 + product.tva / 100);
  const imageUrl = `http://localhost:8080/uploads/${product.illustration}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Image Container */}
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
        <span className="text-xs text-blue-600 font-medium uppercase tracking-wide">
          {product.category.name}
        </span>

        <Link to={`/product/${product.id}`}>
          <h3 className="mt-1 text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">
            {priceWithTax.toFixed(2).replace(".", ",")} €
          </p>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`p-2 rounded-lg transition-all duration-200 ${
              isAdded
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-900 hover:text-white"
            }`}
            title="Ajouter au panier"
          >
            {isAdded ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Full width Add to Cart button */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isAdded}
          className={`mt-3 w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 ${
            isAdded
              ? "bg-green-500 text-white"
              : "bg-gray-900 text-white hover:bg-gray-800"
          }`}
        >
          {isAdded ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Ajouté !
            </span>
          ) : (
            "Ajouter au panier"
          )}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
