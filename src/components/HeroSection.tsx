import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function HeroSection() {
  const texts = [
    "Maroquinerie & Bijoux d'Exception",
    "L'Élégance au Quotidien",
    "Des Créations Qui Racontent Une Histoire",
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % texts.length);
        setFade(true);
      }, 700);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Ensure video plays on mobile
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay prevented:", error);
      });
    }
  }, []);

  return (
    <section className="relative h-[100vh] md:h-[90vh] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/hero-leather.jpg"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          {/* Fallback to image if video not supported */}
        </video>

        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6 max-w-5xl mx-auto">
        {/* Animated Title */}
        <div className="h-24 md:h-32 flex items-center justify-center mb-6">
          <h1
            className={`text-3xl md:text-5xl lg:text-6xl font-medium leading-tight drop-shadow-lg transition-all duration-700
            ${fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {texts[index]}
          </h1>
        </div>

        {/* Subtitle */}
        <p
          className="text-base md:text-lg lg:text-xl font-light tracking-wide text-white/90 mb-10 max-w-2xl drop-shadow-md"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Des pièces uniques pensées pour sublimer chaque instant.
        </p>

        {/* CTA Button - Elegant style */}
        {/* <Link
          to="/category/sacs"
          className="group relative inline-flex items-center justify-center px-10 py-4 text-sm md:text-base uppercase tracking-[0.25em]
          bg-white/90 text-gray-900 backdrop-blur-sm
          hover:bg-white hover:scale-105
          transition-all duration-300 shadow-lg"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Découvrir la Collection
        </Link> */}

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
