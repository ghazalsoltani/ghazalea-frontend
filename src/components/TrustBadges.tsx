function TrustBadges() {
  const badges = [
    { 
      icon: '🚚', 
      title: 'Livraison Gratuite', 
      description: 'Dès 50€ d\'achat' 
    },
    { 
      icon: '↩️', 
      title: 'Retours Gratuits', 
      description: 'Sous 30 jours' 
    },
    { 
      icon: '🔒', 
      title: 'Paiement Sécurisé', 
      description: 'Par Stripe' 
    },
    { 
      icon: '🇫🇷', 
      title: 'Made in France', 
      description: 'Artisanat français' 
    },
  ];

  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {badges.map(badge => (
            <div key={badge.title} className="text-center">
              <span className="text-4xl mb-3 block">{badge.icon}</span>
              <h4 className="font-semibold text-gray-900 mb-1">
                {badge.title}
              </h4>
              <p className="text-gray-500 text-sm">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustBadges;