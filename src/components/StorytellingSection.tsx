import { Link } from "react-router-dom";

function StorytellingSection() {
  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
        {/* Left - Image with Effects */}
        <div className="relative overflow-hidden group">
          {/* Main Image */}
          <img
            src="/images/storytelling/atelier.jpg"
            alt="Savoir-faire artisanal Ghazaléa"
            className="w-full h-full object-cover min-h-[400px] lg:min-h-full transition-transform duration-[2000ms] ease-out group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.background =
                "linear-gradient(135deg, #f5f0eb 0%, #e8e0d8 100%)";
              target.style.minHeight = "400px";
            }}
          />

          {/* Warm Sepia/Gold Overlay - Luxurious feel */}
          <div
            className="absolute inset-0 mix-blend-multiply opacity-20"
            style={{
              background:
                "linear-gradient(135deg, #d4a574 0%, #c9a87c 50%, #b8956d 100%)",
            }}
          />

          {/* Soft Vignette Effect */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.15) 100%)",
            }}
          />

          {/* Gradient Fade to Right (towards text) */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#faf8f5]/30" />

          {/* Bottom Gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

          {/* Elegant Corner Accent */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-white/30" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-white/30" />

          {/* Optional: Floating Quote */}
          <div className="absolute bottom-8 left-8 max-w-xs hidden lg:block">
            <p
              className="text-white/80 text-sm italic leading-relaxed"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              "Le détail fait la perfection, et la perfection n'est pas un
              détail."
            </p>
            <span className="text-white/50 text-xs mt-2 block">
              — Léonard de Vinci
            </span>
          </div>
        </div>

        {/* Right - Text Content */}
        <div className="flex items-center justify-center px-8 md:px-16 lg:px-20 py-16 lg:py-0 bg-[#faf8f5]">
          <div className="max-w-md">
            {/* Decorative Line */}
            <div className="w-12 h-[1px] bg-[#c5a880] mb-8" />

            {/* Small Label */}
            <span
              className="text-xs uppercase tracking-[0.3em] text-[#c5a880] mb-6 block"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Notre savoir-faire
            </span>

            {/* Main Title */}
            <h2
              className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-8 leading-tight"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
              }}
            >
              L'art de
              <br />
              <span className="text-[#c5a880]">l'élégance</span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-8 text-base md:text-lg">
              Chaque création Ghazaléa naît d'un savoir-faire artisanal unique.
              L'élégance, la précision et la durabilité guident chacune de nos
              pièces. Nous sélectionnons les plus beaux matériaux pour créer des
              accessoires intemporels.
            </p>

            {/* Features List */}
            <div className="flex gap-8 mb-10 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                <span>Artisanat français</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                <span>Matériaux nobles</span>
              </div>
            </div>

            {/* CTA Button - Minimal Style */}
            <Link
              to="/about"
              className="group inline-flex items-center gap-3 text-gray-800 hover:text-[#c5a880] transition-colors"
            >
              <span
                className="text-sm uppercase tracking-[0.2em] border-b border-gray-800 pb-1 group-hover:border-[#c5a880] transition-colors"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Découvrir notre histoire
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
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StorytellingSection;
