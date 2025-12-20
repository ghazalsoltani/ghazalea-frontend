import { useState } from 'react';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-16 bg-amber-50">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-serif mb-4">
          Restez informé
        </h2>
        <p className="text-gray-600 mb-8">
          Inscrivez-vous pour recevoir nos offres exclusives et nouveautés
        </p>
        
        {subscribed ? (
          <div className="bg-green-100 text-green-800 px-6 py-4 rounded-lg">
            ✓ Merci pour votre inscription !
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email"
              required
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              S'inscrire
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default Newsletter;