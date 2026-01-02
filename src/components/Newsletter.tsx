import { useState } from "react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 500);
  };

  return (
    <section className="py-20 bg-[#f5f0eb]">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* Title */}
        <h2
          className="text-3xl md:text-4xl text-gray-800 mb-4"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 400,
          }}
        >
          Rejoignez le cercle Ghazaléa
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 mb-10 text-base">
          Inscrivez-vous pour recevoir nos offres exclusives et nouveautés
        </p>

        {/* Form */}
        {status === "success" ? (
          <div className="text-gray-700">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-green-600"
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
            <p
              className="text-lg"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Merci pour votre inscription
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Vous recevrez bientôt nos dernières actualités
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <div className="flex-1 relative">
              <input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                className={`w-full px-4 py-3 bg-white border ${
                  status === "error" ? "border-red-400" : "border-gray-300"
                } focus:outline-none focus:border-gray-500 transition-colors text-gray-700 placeholder-gray-400`}
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              />
              {status === "error" && (
                <p className="absolute -bottom-5 left-0 text-xs text-red-500">
                  Veuillez entrer un email valide
                </p>
              )}
            </div>

            <button
              type="submit"
              className="px-8 py-3 bg-gray-900 text-white text-sm uppercase tracking-[0.15em] hover:bg-gray-800 transition-colors"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              S'inscrire
            </button>
          </form>
        )}

        {/* Privacy Note */}
        <p className="text-xs text-gray-400 mt-8">
          En vous inscrivant, vous acceptez de recevoir nos communications.
          <br />
          Vous pouvez vous désinscrire à tout moment.
        </p>
      </div>
    </section>
  );
}

export default Newsletter;
