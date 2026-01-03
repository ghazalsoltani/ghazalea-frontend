import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate("/");
      } else {
        setError("Email ou mot de passe incorrect");
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col">
      {/* Header */}
      <div className="py-8 text-center">
        <Link to="/home">
          <h1
            className="text-2xl text-gray-800 tracking-[0.15em]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            GHAZALÉA
          </h1>
        </Link>
      </div>

      {/* Form container */}
      <div className="flex-1 flex items-center justify-center px-4 pb-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2
              className="text-3xl text-gray-800 mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Connexion
            </h2>
            <p className="text-gray-500 text-sm">
              Pas encore de compte ?{" "}
              <Link
                to="/register"
                className="text-[#c5a880] hover:text-[#b8956d] transition-colors"
              >
                Créer un compte
              </Link>
            </p>
          </div>

          <div className="bg-white p-8 md:p-10">
            {/* Error message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email field */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Adresse email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-[#c5a880] focus:outline-none transition-colors"
                  placeholder="vous@exemple.com"
                />
              </div>

              {/* Password field */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-[#c5a880] focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 text-sm uppercase tracking-[0.15em] transition-colors ${
                  isSubmitting
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#2c3e50] text-white hover:bg-[#34495e]"
                }`}
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {isSubmitting ? "Connexion en cours..." : "Se connecter"}
              </button>
            </form>
          </div>

          {/* Back to home */}
          <div className="text-center mt-8">
            <Link
              to="/home"
              className="text-gray-400 text-sm hover:text-[#c5a880] transition-colors"
            >
              ← Retour à la boutique
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
