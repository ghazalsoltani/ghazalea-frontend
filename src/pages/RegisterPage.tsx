import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RegisterPage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = (): string | null => {
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      return "Veuillez remplir tous les champs";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Veuillez entrer une adresse email valide";
    }

    if (password.length < 6) {
      return "Le mot de passe doit contenir au moins 6 caractères";
    }

    if (password !== confirmPassword) {
      return "Les mots de passe ne correspondent pas";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstname,
          lastname,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const loginSuccess = await login(email, password);
        if (loginSuccess) {
          navigate("/");
        } else {
          navigate("/login");
        }
      } else {
        setError(data.error || "Une erreur est survenue lors de l'inscription");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Impossible de contacter le serveur. Veuillez réessayer.");
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
              Créer un compte
            </h2>
            <p className="text-gray-500 text-sm">
              Déjà inscrit ?{" "}
              <Link
                to="/login"
                className="text-[#c5a880] hover:text-[#b8956d] transition-colors"
              >
                Se connecter
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

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-[#c5a880] focus:outline-none transition-colors"
                    placeholder="Marie"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-[#c5a880] focus:outline-none transition-colors"
                    placeholder="Dupont"
                  />
                </div>
              </div>

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
                <p className="mt-2 text-xs text-gray-400">
                  Minimum 6 caractères
                </p>
              </div>

              {/* Confirm password field */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-[#c5a880] focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 text-sm uppercase tracking-[0.15em] transition-colors mt-2 ${
                  isSubmitting
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#2c3e50] text-white hover:bg-[#34495e]"
                }`}
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
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

export default RegisterPage;
