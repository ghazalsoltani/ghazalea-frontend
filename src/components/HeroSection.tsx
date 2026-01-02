import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function HeroSection() {
  const texts = [
    "Maroquinerie & Bijoux d’Exception",
    "L’Élégance au Quotidien",
    "Des Créations Qui Racontent Une Histoire",
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % texts.length);
        setFade(true);
      }, 700); // fade out doux
    }, 4000); // tempo luxe

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[550px] md:h-[700px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-105"
        style={{ backgroundImage: "url('/images/hero-leather.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/25" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6 max-w-5xl mx-auto">
        <div className="h-24 md:h-32 flex items-center justify-center mb-6">
          <h1
            className={`font-serif text-3xl md:text-5xl lg:text-6xl font-medium leading-tight drop-shadow-md transition-all duration-700
            ${fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
          >
            {texts[index]}
          </h1>
        </div>

        <p className="text-lg md:text-xl font-light tracking-wide text-white/90 mb-10 max-w-2xl drop-shadow-sm">
          Des pièces uniques pensées pour sublimer chaque instant.
        </p>

        <Link
          to="/about"
          className="group relative inline-flex items-center justify-center px-10 py-4 text-sm md:text-base font-semibold uppercase tracking-[0.2em]
          bg-white/60 text-gray-900 rounded-md shadow-xl
          hover:bg-transparent hover:text-white hover:border-white border border-transparent
          transition-all duration-400"
        >
          Découvrir la Collection
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
