import { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../types";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  readonly product: Product;
  readonly onAddToCart: (product: Product) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { items } = useCart();
  const priceWithTax = product.price * (1 + product.tva / 100);
  const imageUrl = `http://localhost:8080/uploads/${product.illustration}`;

  // Check if product is in cart and get quantity
  const cartItem = items.find((item) => item.product.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
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
        {/* Category */}
        <Link
          to={`/category/${
            product.category.slug || product.category.name.toLowerCase()
          }`}
          className="text-xs text-blue-600 font-medium uppercase tracking-wide hover:text-blue-800"
        >
          {product.category.name}
        </Link>

        {/* Product Name - Clickable */}
        <Link to={`/product/${product.id}`}>
          <h3 className="mt-1 text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <Link to={`/product/${product.id}`}>
          <p className="mt-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            {priceWithTax.toFixed(2).replace(".", ",")} €
          </p>
        </Link>

        {/* Add to Cart Button with Cart Icon */}
        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-all duration-200 ${
              quantityInCart > 0
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            {/* Cart Icon */}
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>

            {quantityInCart > 0 ? (
              <span>Dans le panier ({quantityInCart})</span>
            ) : (
              <span>Ajouter au panier</span>
            )}
          </button>

          {/* Quantity badge button - if in cart */}
          {quantityInCart > 0 && (
            <Link
              to="/cart"
              className="p-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              title="Voir le panier"
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
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;