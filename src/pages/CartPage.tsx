import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function CartPage() {
  const {
    items,
    removeFromCart,
    decreaseQuantity,
    addToCart,
    clearCart,
    totalPrice,
  } = useCart();

  const { isAuthenticated } = useAuth();

  // If cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        {/* Navigation */}
        <nav className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Link
              to="/home"
              className="text-gray-600 hover:text-[#c5a880] flex items-center transition-colors"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Continuer mes achats
            </Link>
          </div>
        </nav>

        {/* Empty cart message */}
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-white flex items-center justify-center">
            <svg
              className="w-10 h-10 text-[#c5a880]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h1
            className="text-3xl md:text-4xl text-gray-800 mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Votre panier est vide
          </h1>
          <p className="text-gray-500 mb-10 max-w-md mx-auto">
            Découvrez nos collections et ajoutez vos pièces favorites à votre
            panier
          </p>
          <Link
            to="/home"
            className="inline-block px-10 py-4 bg-[#2c3e50] text-white text-sm uppercase tracking-[0.2em] hover:bg-[#34495e] transition-colors"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Découvrir la collection
          </Link>
        </div>
      </div>
    );
  }

  // Cart has items
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            to="/home"
            className="text-gray-600 hover:text-[#c5a880] flex items-center transition-colors"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Continuer mes achats
          </Link>

          <button
            type="button"
            onClick={clearCart}
            className="text-gray-400 hover:text-red-500 text-sm transition-colors"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Vider le panier
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Page Title */}
        <h1
          className="text-3xl md:text-4xl text-gray-800 mb-12 text-center"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Mon Panier
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart items list */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => {
              const priceWithTax =
                item.product.price * (1 + item.product.tva / 100);

              return (
                <div
                  key={item.product.id}
                  className="bg-white p-6 flex gap-6 group"
                >
                  {/* Product image - Enhanced */}
                  <Link
                    to={`/product/${item.product.id}`}
                    className="relative w-28 h-28 md:w-36 md:h-36 flex-shrink-0 overflow-hidden bg-gray-50"
                  >
                    <img
                      src={`http://localhost:8080/uploads/${item.product.illustration}`}
                      alt={item.product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  </Link>

                  {/* Product info */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <Link
                        to={`/product/${item.product.id}`}
                        className="text-gray-800 hover:text-[#c5a880] transition-colors block mb-1"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                        }}
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-400 mb-3">
                        {item.product.category.name}
                      </p>
                      <p
                        className="text-lg text-gray-800"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                        }}
                      >
                        {priceWithTax.toFixed(2).replace(".", ",")} €
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-200">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.product.id)}
                          className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                        >
                          −
                        </button>
                        <span className="w-12 text-center text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => addToCart(item.product)}
                          className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Supprimer"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right hidden md:block">
                    <p
                      className="text-lg text-gray-800"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                      }}
                    >
                      {(priceWithTax * item.quantity)
                        .toFixed(2)
                        .replace(".", ",")}{" "}
                      €
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 sticky top-8">
              <h2
                className="text-xl text-gray-800 mb-8 pb-4 border-b border-gray-100"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Récapitulatif
              </h2>

              {/* Subtotal */}
              <div className="flex justify-between py-3">
                <span className="text-gray-500">Sous-total</span>
                <span className="text-gray-800">
                  {totalPrice.toFixed(2).replace(".", ",")} €
                </span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500">Livraison</span>
                <span className="text-[#c5a880]">
                  {totalPrice >= 50 ? "Offerte" : "5,00 €"}
                </span>
              </div>

              {/* Free shipping message */}
              {totalPrice < 50 && (
                <p className="text-xs text-gray-400 py-3">
                  Plus que {(50 - totalPrice).toFixed(2).replace(".", ",")} €
                  pour bénéficier de la livraison offerte
                </p>
              )}

              {/* Total */}
              <div className="flex justify-between py-6">
                <span
                  className="text-lg text-gray-800"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Total TTC
                </span>
                <span
                  className="text-lg text-gray-800"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {(totalPrice >= 50 ? totalPrice : totalPrice + 5)
                    .toFixed(2)
                    .replace(".", ",")}{" "}
                  €
                </span>
              </div>

              {/* Checkout button */}
              {isAuthenticated ? (
                <Link
                  to="/checkout/address"
                  className="w-full block text-center bg-[#2c3e50] text-white py-4 text-sm uppercase tracking-[0.2em] hover:bg-[#34495e] transition-colors"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Passer la commande
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="w-full block text-center bg-[#2c3e50] text-white py-4 text-sm uppercase tracking-[0.2em] hover:bg-[#34495e] transition-colors"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Se connecter pour commander
                </Link>
              )}

              {/* Trust badges */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span>Paiement sécurisé par Stripe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
