import { Link } from 'react-router-dom';

function CancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* Warning icon */}
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Cancel message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Paiement annulé
        </h1>
        <p className="text-gray-600 mb-8">
          Votre paiement a été annulé. Aucun montant n'a été débité de votre compte.
        </p>

        {/* Info box */}
        <div className="bg-gray-100 rounded-lg p-6 mb-8 text-left">
          <h2 className="font-semibold text-gray-900 mb-2">
            Que s'est-il passé ?
          </h2>
          <p className="text-gray-600 text-sm">
            Vous avez annulé le paiement ou la session a expiré. Votre panier a été conservé 
            et vous pouvez réessayer à tout moment.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/cart"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Retour au panier
          </Link>
          <Link
            to="/"
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Continuer mes achats
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CancelPage;