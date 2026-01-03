import { Link } from "react-router-dom";
import { useCheckout } from "../../context/CheckoutContext";

function ConfirmationStep() {
  const { state, resetCheckout } = useCheckout();

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
          Commande confirmée
        </h1>
        <p className="text-gray-500 mb-2">Merci pour votre commande.</p>
        {state.orderId && (
          <p className="text-gray-500 mb-10">
            Commande{" "}
            <span
              className="text-gray-800"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              #{state.orderId}
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Vous recevrez un email avec le numéro de suivi
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
            onClick={() => resetCheckout()}
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

export default ConfirmationStep;
