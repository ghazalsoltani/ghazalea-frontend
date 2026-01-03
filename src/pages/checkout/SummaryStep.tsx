import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useCheckout } from "../../context/CheckoutContext";
import { api } from "../../services/api";
import CheckoutSteps from "../../components/CheckoutSteps";

function SummaryStep() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { items, totalPrice } = useCart();
  const { state } = useCheckout();

  if (!state.selectedAddress || !state.selectedCarrier) {
    navigate("/checkout/address");
    return null;
  }

  const { selectedAddress, selectedCarrier } = state;
  const subtotal = totalPrice;
  const shipping = selectedCarrier.price;
  const total = subtotal + shipping;

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const orderData = {
        addressId: selectedAddress.id,
        carrierId: selectedCarrier.id,
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      };

      const result = await api.createCheckoutSession(orderData);

      if (result.success && result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      } else {
        setError("Erreur lors de la création de la session de paiement");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/checkout/carrier");
  };

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={handleBack}
            className="text-gray-500 hover:text-[#c5a880] flex items-center text-sm transition-colors"
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
            Retour à la livraison
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <CheckoutSteps currentStep="summary" />

        <h1
          className="text-2xl md:text-3xl text-gray-800 mb-8 text-center"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Récapitulatif
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Order details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery address */}
            <div className="bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="text-gray-800"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Adresse de livraison
                </h2>
                <button
                  type="button"
                  onClick={() => navigate("/checkout/address")}
                  className="text-[#c5a880] hover:text-[#b8956d] text-sm transition-colors"
                >
                  Modifier
                </button>
              </div>
              <div className="text-sm">
                <p className="text-gray-800 mb-1">
                  {selectedAddress.firstname} {selectedAddress.lastname}
                </p>
                <p className="text-gray-500">{selectedAddress.address}</p>
                <p className="text-gray-500">
                  {selectedAddress.postal} {selectedAddress.city},{" "}
                  {selectedAddress.country}
                </p>
                <p className="text-gray-400 mt-2">{selectedAddress.phone}</p>
              </div>
            </div>

            {/* Carrier */}
            <div className="bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="text-gray-800"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Mode de livraison
                </h2>
                <button
                  type="button"
                  onClick={() => navigate("/checkout/carrier")}
                  className="text-[#c5a880] hover:text-[#b8956d] text-sm transition-colors"
                >
                  Modifier
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-800">{selectedCarrier.name}</p>
                  <p className="text-gray-500 text-sm">
                    {selectedCarrier.description}
                  </p>
                </div>
                <p className="text-gray-800">
                  {selectedCarrier.price === 0
                    ? "Gratuit"
                    : `${selectedCarrier.price.toFixed(2).replace(".", ",")} €`}
                </p>
              </div>
            </div>

            {/* Products */}
            <div className="bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="text-gray-800"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Articles ({items.length})
                </h2>
                <button
                  type="button"
                  onClick={() => navigate("/cart")}
                  className="text-[#c5a880] hover:text-[#b8956d] text-sm transition-colors"
                >
                  Modifier
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                {items.map((item) => {
                  const itemPrice =
                    item.product.price * (1 + item.product.tva / 100);
                  return (
                    <div
                      key={item.product.id}
                      className="py-4 flex items-center gap-4 first:pt-0 last:pb-0"
                    >
                      <div className="w-16 h-16 bg-gray-50 flex-shrink-0">
                        <img
                          src={`http://localhost:8080/uploads/${item.product.illustration}`}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-800 text-sm truncate">
                          {item.product.name}
                        </p>
                        <p className="text-gray-400 text-xs">
                          Qté: {item.quantity}
                        </p>
                      </div>
                      <p className="text-gray-800 text-sm">
                        {(itemPrice * item.quantity)
                          .toFixed(2)
                          .replace(".", ",")}{" "}
                        €
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right column - Order total */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 sticky top-8">
              <h2
                className="text-gray-800 mb-6 pb-4 border-b border-gray-100"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Total
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Sous-total</span>
                  <span className="text-gray-800">
                    {subtotal.toFixed(2).replace(".", ",")} €
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Livraison</span>
                  <span className="text-gray-800">
                    {shipping === 0
                      ? "Gratuit"
                      : `${shipping.toFixed(2).replace(".", ",")} €`}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between">
                  <span
                    className="text-gray-800"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Total TTC
                  </span>
                  <span
                    className="text-lg text-gray-800"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {total.toFixed(2).replace(".", ",")} €
                  </span>
                </div>
              </div>

              {/* Payment button */}
              <button
                type="button"
                onClick={handlePayment}
                disabled={loading}
                className={`w-full mt-6 py-4 text-sm uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#2c3e50] text-white hover:bg-[#34495e]"
                }`}
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-white rounded-full animate-spin"></div>
                    Redirection...
                  </>
                ) : (
                  <>
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
                    Payer {total.toFixed(2).replace(".", ",")} €
                  </>
                )}
              </button>

              {/* Stripe badge */}
              <div className="mt-6 pt-4 border-t border-gray-100">
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

export default SummaryStep;
