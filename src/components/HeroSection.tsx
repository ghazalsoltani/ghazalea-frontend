import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function HeroSection() {
  const texts = [
    "L'Art du Détail et de la Matière",
    "L'Élégance Intemporelle",
    "Une Signature Unique",
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // fade out

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % texts.length);
        setFade(true); // fade in
      }, 500); // durée du fade out
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-leather.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-2xl md:text-2xl lg:text-6xl font-serif font-bold mb-6 leading-snug">
          <span className="block text-4xl md:text-5xl lg:text-7xl">
            Ghazaléa
          </span>

          <span
            className={`block mt-2 lg:mt-4 text-lg md:text-2xl lg:text-3xl transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            {texts[index]}
          </span>
        </h1>

        <Link
          to="/about"
          className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
        >
          Découvrir l’univers Ghazaléa
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
