import { Link } from "react-router-dom";

function CancelPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] py-20">
      <div className="max-w-lg mx-auto px-4 text-center">
        {/* Warning icon */}
        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg
            className="w-10 h-10 text-amber-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Cancel message */}
        <h1
          className="text-2xl md:text-3xl text-gray-800 mb-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Paiement annulé
        </h1>
        <p className="text-gray-500 mb-10">
          Votre paiement a été annulé. Aucun montant n'a été débité de votre
          compte.
        </p>

        {/* Info box */}
        <div className="bg-white p-6 mb-10 text-left">
          <h2
            className="text-gray-800 mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Que s'est-il passé ?
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Vous avez annulé le paiement ou la session a expiré. Votre panier a
            été conservé et vous pouvez réessayer à tout moment.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/cart"
            className="flex-1 py-4 bg-[#2c3e50] text-white text-sm uppercase tracking-[0.15em] hover:bg-[#34495e] transition-colors text-center"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Retour au panier
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

export default CancelPage;
