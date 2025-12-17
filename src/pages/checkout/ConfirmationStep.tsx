import { Link } from "react-router-dom";
import { useCheckout } from "../../context/CheckoutContext";

function ConfirmationStep() {
  const { state, resetCheckout } = useCheckout();

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* Success icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-green-600"
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
        </div>

        {/* Success message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Commande confirmée !
        </h1>
        <p className="text-gray-600 mb-2">
          Merci pour votre commande.
        </p>
        {state.orderId && (
          <p className="text-gray-600 mb-8">
            Numéro de commande : <span className="font-semibold">#{state.orderId}</span>
          </p>
        )}

        {/* Info box */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
          <h2 className="font-semibold text-blue-900 mb-2">
            Et maintenant ?
          </h2>
          <ul className="text-blue-800 text-sm space-y-2">
            <li>• Vous allez recevoir un email de confirmation</li>
            <li>• Nous préparons votre commande avec soin</li>
            <li>• Vous recevrez un email avec le numéro de suivi</li>
          </ul>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/orders"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Voir mes commandes
          </Link>
          <Link
            to="/"
            onClick={() => resetCheckout()}
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Continuer mes achats
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationStep;