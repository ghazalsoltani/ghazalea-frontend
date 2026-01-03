import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../../services/api";
import { useCart } from "../../context/CartContext";
import { useCheckout } from "../../context/CheckoutContext";

function SuccessPage() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { clearCart } = useCart();
  const { resetCheckout } = useCheckout();

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get("session_id");

      if (!sessionId) {
        setError("Session de paiement non trouvée");
        setLoading(false);
        return;
      }

      try {
        const result = await api.verifyPayment(sessionId);

        if (result.success && result.paid) {
          setVerified(true);
          setOrderId(result.orderId || null);
          clearCart();
          resetCheckout();
        } else {
          setError("Le paiement n'a pas été confirmé");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setError("Erreur lors de la vérification du paiement");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams, clearCart, resetCheckout]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border border-gray-300 border-t-[#c5a880] rounded-full animate-spin mx-auto"></div>
          <p
            className="mt-6 text-gray-500 text-sm uppercase tracking-[0.2em]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Vérification du paiement
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#faf8f5] py-20">
        <div className="max-w-lg mx-auto px-4 text-center">
          {/* Error icon */}
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h1
            className="text-2xl md:text-3xl text-gray-800 mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Erreur de paiement
          </h1>
          <p className="text-gray-500 mb-10">{error}</p>

          <Link
            to="/cart"
            className="inline-block px-10 py-4 bg-[#2c3e50] text-white text-sm uppercase tracking-[0.15em] hover:bg-[#34495e] transition-colors"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Retour au panier
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] py-20">
      <div className="max-w-lg mx-auto px-4 text-center">
        {/* Success icon */}
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg
            className="w-10 h-10 text-green-500"
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
        </div>

        {/* Success message */}
        <h1
          className="text-2xl md:text-3xl text-gray-800 mb-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Paiement réussi
        </h1>
        <p className="text-gray-500 mb-2">Merci pour votre commande.</p>
        {orderId && (
          <p className="text-gray-500 mb-10">
            Commande{" "}
            <span
              className="text-gray-800"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              #{orderId}
            </span>
          </p>
        )}

        {/* Info box */}
        <div className="bg-white p-6 mb-10 text-left">
          <h2
            className="text-gray-800 mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Et maintenant ?
          </h2>
          <ul className="text-gray-500 text-sm space-y-3">
            <li className="flex items-start gap-3">
              <svg
                className="w-4 h-4 text-[#c5a880] mt-0.5 flex-shrink-0"
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
              Votre paiement a été confirmé
            </li>
            <li className="flex items-start gap-3">
              <svg
                className="w-4 h-4 text-[#c5a880] mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Vous allez recevoir un email de confirmation
            </li>
            <li className="flex items-start gap-3">
              <svg
                className="w-4 h-4 text-[#c5a880] mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              Nous préparons votre commande avec soin
            </li>
          </ul>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/orders"
            className="flex-1 py-4 bg-[#2c3e50] text-white text-sm uppercase tracking-[0.15em] hover:bg-[#34495e] transition-colors text-center"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Voir mes commandes
          </Link>
          <Link
            to="/home"
            className="flex-1 py-4 border border-gray-300 text-gray-600 text-sm uppercase tracking-[0.15em] hover:bg-white transition-colors text-center"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Continuer mes achats
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
