// Custom SVG Icons
function DeliveryTruckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="m.5 13.325l.5-2h5.5l-.5 2zM7 20q-1.25 0-2.125-.875T4 17H1.5l.5-2.175h5.175l.9-3.65h2.1l1.25-5H4.5l.15-.6q.15-.7.688-1.137T6.6 4H18l-.925 4H20l3 4l-1 5h-2q0 1.25-.875 2.125T17 20t-2.125-.875T14 17h-4q0 1.25-.875 2.125T7 20M2.5 9.675l.5-2h6.5l-.5 2zM7 18q.425 0 .713-.288T8 17t-.288-.712T7 16t-.712.288T6 17t.288.713T7 18m10 0q.425 0 .713-.288T18 17t-.288-.712T17 16t-.712.288T16 17t.288.713T17 18m-1.075-5h4.825l.1-.525L19 10h-2.375z" />
    </svg>
  );
}

function ReturnIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={className}
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M12.207 2H3.793L1 4.793V14h14V4.793zm-9.5 2.5l1.5-1.5h7.586l1.5 1.5zm4 3.5l.647-.646l-.707-.708L4.293 9H10a.5.5 0 0 1 0 1H6v1h4a1.5 1.5 0 0 0 0-3z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function LockedIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M3.5 6.5V10H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V12a2 2 0 0 0-2-2h-1.5V6.5a6.5 6.5 0 1 0-13 0M6 10V6.5a4 4 0 0 1 8 0V10zm2 5.5a2 2 0 1 1 3.092 1.676l-.008.005s.195 1.18.415 2.57v.001a.75.75 0 0 1-.749.749H9.248a.75.75 0 0 1-.749-.749v-.001l.415-2.57a2 2 0 0 1-.916-1.68z" />
    </svg>
  );
}

function FranceIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
      fill="currentColor"
    >
      <path d="M283.4 19.83c-3.2 0-31.2 5.09-31.2 5.09c-1.3 41.61-30.4 78.48-90.3 84.88l-12.8-23.07l-25.1 2.48l11.3 60.09l-113.79-4.9l12.2 41.5C156.3 225.4 150.7 338.4 124 439.4c47 53 141.8 47.8 186 43.1c3.1-62.2 52.4-64.5 135.9-32.2c11.3-17.6 18.8-36 44.6-50.7l-46.6-139.5l-27.5 6.2c11-21.1 32.2-49.9 50.4-63.4l15.6-86.9c-88.6-6.3-146.4-46.36-199-96.17" />
    </svg>
  );
}

function TrustBadges() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Livraison Gratuite */}
          <div className="text-center">
            <div className="flex justify-center mb-3 text-gray-700">
              <DeliveryTruckIcon className="w-10 h-10" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">
              Livraison Gratuite
            </h4>
            <p className="text-gray-700 text-base">Dès 50€ d'achat</p>
          </div>

          {/* Retours Gratuits */}
          <div className="text-center">
            <div className="flex justify-center mb-3 text-gray-700">
              <ReturnIcon className="w-10 h-10" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">
              Retours Gratuits
            </h4>
            <p className="text-gray-700 text-base">Sous 30 jours</p>
          </div>

          {/* Paiement Sécurisé */}
          <div className="text-center">
            <div className="flex justify-center mb-3 text-gray-700">
              <LockedIcon className="w-10 h-10" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">
              Paiement Sécurisé
            </h4>
            <p className="text-gray-700 text-base">Par Stripe</p>
          </div>

          {/* Made in France */}
          <div className="text-center">
            <div className="flex justify-center mb-3 text-gray-700">
              <FranceIcon className="w-10 h-10" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Made in France</h4>
            <p className="text-gray-700 text-base">Artisanat français</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustBadges;