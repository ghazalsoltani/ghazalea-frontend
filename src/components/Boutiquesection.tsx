import { Link } from "react-router-dom";

function BoutiqueSection() {
  const handleDirections = () => {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=Paris+France",
      "_blank"
    );
  };

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
        {/* Left - Text & Stylized Map */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 lg:py-0 bg-[#faf8f5] order-2 lg:order-1">
          <div className="max-w-md">
            {/* Decorative Line */}
            <div className="w-12 h-[1px] bg-[#c5a880] mb-8" />

            {/* Small Label */}
            <span
              className="text-xs uppercase tracking-[0.3em] text-[#c5a880] mb-6 block"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Notre adresse
            </span>

            {/* Main Title */}
            <h2
              className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-8 leading-tight"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
              }}
            >
              L'Écrin
              <br />
              <span className="text-[#c5a880]">Ghazaléa</span>
            </h2>

            {/* Address */}
            <div className="mb-8">
              <p
                className="text-gray-700 text-sm uppercase tracking-[0.15em] mb-2"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                12 Rue de la Mode, 75008 Paris
              </p>
              <p className="text-gray-500 text-sm">
                Ouvert tous les jours, de 10h00 à 19h00
              </p>
            </div>

            {/* Stylized Map Preview */}
            <div
              className="relative mb-8 cursor-pointer group"
              onClick={handleDirections}
            >
              <div className="bg-[#f0ebe4] p-6 rounded-sm overflow-hidden">
                <svg
                  viewBox="0 0 300 180"
                  className="w-full h-auto"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Street Grid */}
                  <line
                    x1="0"
                    y1="90"
                    x2="300"
                    y2="90"
                    stroke="#c9c2b8"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="150"
                    y1="0"
                    x2="150"
                    y2="180"
                    stroke="#c9c2b8"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="0"
                    y1="45"
                    x2="220"
                    y2="45"
                    stroke="#c9c2b8"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="80"
                    y1="135"
                    x2="300"
                    y2="135"
                    stroke="#c9c2b8"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="75"
                    y1="0"
                    x2="75"
                    y2="180"
                    stroke="#c9c2b8"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="225"
                    y1="0"
                    x2="225"
                    y2="180"
                    stroke="#c9c2b8"
                    strokeWidth="0.5"
                  />
                  {/* Diagonal */}
                  <line
                    x1="0"
                    y1="180"
                    x2="120"
                    y2="60"
                    stroke="#c9c2b8"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="180"
                    y1="0"
                    x2="300"
                    y2="120"
                    stroke="#c9c2b8"
                    strokeWidth="0.5"
                  />

                  {/* Street Names */}
                  <text
                    x="10"
                    y="85"
                    fill="#a09080"
                    fontSize="7"
                    fontFamily="serif"
                    letterSpacing="0.1em"
                  >
                    RUE DE LA MODE
                  </text>
                  <text
                    x="160"
                    y="70"
                    fill="#a09080"
                    fontSize="6"
                    fontFamily="serif"
                    transform="rotate(90, 160, 70)"
                  >
                    AVENUE DES ARTS
                  </text>

                  {/* Location Marker */}
                  <circle
                    cx="150"
                    cy="90"
                    r="14"
                    fill="#c5a880"
                    className="group-hover:fill-[#b8956d] transition-colors"
                  />
                  <text
                    x="150"
                    y="95"
                    fill="white"
                    fontSize="12"
                    fontWeight="500"
                    textAnchor="middle"
                    fontFamily="serif"
                  >
                    G
                  </text>

                  {/* Metro */}
                  <circle
                    cx="200"
                    cy="60"
                    r="8"
                    fill="none"
                    stroke="#a09080"
                    strokeWidth="1"
                  />
                  <text
                    x="200"
                    y="64"
                    fill="#a09080"
                    fontSize="9"
                    textAnchor="middle"
                  >
                    M
                  </text>
                </svg>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center rounded-sm">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-700 text-xs uppercase tracking-[0.2em] bg-white/95 px-4 py-2 shadow-sm">
                  Voir l'itinéraire
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleDirections}
              className="group inline-flex items-center gap-3 text-gray-800 hover:text-[#c5a880] transition-colors"
            >
              <span
                className="text-sm uppercase tracking-[0.2em] border-b border-gray-800 pb-1 group-hover:border-[#c5a880] transition-colors"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Itinéraire
              </span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right - Boutique Image with Effects */}
        <div className="relative overflow-hidden order-1 lg:order-2 group">
          {/* Main Image */}
          <img
            src="/images/boutique/facade.jpg"
            alt="Boutique Ghazaléa - Paris"
            className="w-full h-full object-cover min-h-[400px] lg:min-h-full transition-transform duration-[2000ms] ease-out group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />

          {/* Warm Golden Hour Overlay */}
          <div
            className="absolute inset-0 mix-blend-soft-light opacity-30"
            style={{
              background:
                "linear-gradient(180deg, #f5deb3 0%, #daa520 50%, #b8860b 100%)",
            }}
          />

          {/* Soft Blue Sky Enhancement */}
          <div
            className="absolute inset-0 mix-blend-overlay opacity-10"
            style={{
              background:
                "linear-gradient(180deg, #87ceeb 0%, transparent 40%)",
            }}
          />

          {/* Vignette Effect */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.2) 100%)",
            }}
          />

          {/* Gradient Fade to Left (towards text) */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#faf8f5]/20" />

          {/* Bottom Shadow for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          {/* Elegant Corner Accents */}
          <div className="absolute top-8 right-8 w-20 h-20 border-r border-t border-white/40" />
          <div className="absolute bottom-8 left-8 w-20 h-20 border-l border-b border-white/40" />

          {/* Brand Badge */}
          <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm px-4 py-2 shadow-sm">
            <span
              className="text-xs uppercase tracking-[0.3em] text-gray-700"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Paris
            </span>
          </div>

          {/* Floating Text - Building info */}
          <div className="absolute bottom-8 right-8 text-right hidden lg:block">
          </div>
        </div>
      </div>
    </section>
  );
}

export default BoutiqueSection;
