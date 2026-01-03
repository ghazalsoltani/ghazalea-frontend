import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2c3e50] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand */}
          <div>
            <Link to="/home" className="inline-block mb-6">
              <h2
                className="text-2xl text-white tracking-[0.15em]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                GHAZALÉA
              </h2>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Maison française d'accessoires de mode. Sacs, bijoux et lunettes
              conçus avec passion et savoir-faire artisanal.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:border-[#c5a880] hover:text-[#c5a880] transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:border-[#c5a880] hover:text-[#c5a880] transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:border-[#c5a880] hover:text-[#c5a880] transition-colors"
                aria-label="Pinterest"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Boutique Links */}
          <div>
            <h4
              className="text-sm uppercase tracking-[0.2em] text-[#c5a880] mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Boutique
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/category/sacs"
                  className="text-gray-400 text-sm hover:text-white transition-colors"
                >
                  Sacs
                </Link>
              </li>
              <li>
                <Link
                  to="/category/bijoux"
                  className="text-gray-400 text-sm hover:text-white transition-colors"
                >
                  Bijoux
                </Link>
              </li>
              <li>
                <Link
                  to="/category/lunettes"
                  className="text-gray-400 text-sm hover:text-white transition-colors"
                >
                  Lunettes
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="text-gray-400 text-sm hover:text-white transition-colors"
                >
                  Mes favoris
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Contact - YOUR INFO */}
          <div>
            <h4
              className="text-sm uppercase tracking-[0.2em] text-[#c5a880] mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Développeur
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {/* Your Name */}
              <li className="text-white font-medium">Ghazal Soltani</li>

              {/* Email */}
              <li className="flex items-center gap-3">
                <svg
                  className="w-4 h-4 text-[#c5a880] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:votre.email@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  ghazal.soltaninasab@gmail.com
                </a>
              </li>

              {/* LinkedIn */}
              <li className="flex items-center gap-3">
                <svg
                  className="w-4 h-4 text-[#c5a880] flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <a
                  href="https://linkedin.com/in/ghazal-soltani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>

              {/* GitHub */}
              <li className="flex items-center gap-3">
                <svg
                  className="w-4 h-4 text-[#c5a880] flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <a
                  href="https://github.com/ghazalsoltani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright + Portfolio mention */}
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-xs">
                © {currentYear} Ghazaléa — Projet fictif réalisé pour
                démonstration
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Développé avec React, TypeScript, Symfony & Tailwind CSS
              </p>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-xs mr-2">
                Paiement sécurisé
              </span>

              {/* Visa */}
              <div className="bg-white rounded px-2 py-1">
                <svg className="h-4 w-7" viewBox="0 0 50 35" fill="none">
                  <rect width="50" height="35" rx="4" fill="white" />
                  <path d="M21.5 23H19L20.5 12H23L21.5 23Z" fill="#1A1F71" />
                  <path
                    d="M17.5 12L15 19.5L14.5 17L13.5 12.5C13.5 12.5 13.3 12 12.5 12H8V12.2C8 12.2 9 12.4 10 13L12.5 23H15.5L21 12H17.5Z"
                    fill="#1A1F71"
                  />
                  <path d="M35 23L37 12H34L32 23H35Z" fill="#1A1F71" />
                  <path
                    d="M30 12L27.5 19L27 17L26.5 12.5C26.5 12.5 26.3 12 25.5 12H22V12.2C22 12.2 24 12.7 26 14L28 23H31L37 12H30Z"
                    fill="#1A1F71"
                  />
                </svg>
              </div>

              {/* Mastercard */}
              <div className="bg-white rounded px-2 py-1">
                <svg className="h-4 w-7" viewBox="0 0 50 35" fill="none">
                  <rect width="50" height="35" rx="4" fill="white" />
                  <circle cx="20" cy="17.5" r="8" fill="#EB001B" />
                  <circle cx="30" cy="17.5" r="8" fill="#F79E1B" />
                  <path
                    d="M25 11.5C26.8 13 28 15.1 28 17.5C28 19.9 26.8 22 25 23.5C23.2 22 22 19.9 22 17.5C22 15.1 23.2 13 25 11.5Z"
                    fill="#FF5F00"
                  />
                </svg>
              </div>

              {/* Stripe */}
              <div className="bg-[#635BFF] rounded px-2 py-1">
                <svg className="h-4 w-7" viewBox="0 0 50 35" fill="none">
                  <path
                    d="M25 11C21.5 11 19 12.3 19 14.5C19 18 25 17.5 25 19.5C25 20.1 24.2 20.5 23 20.5C21.2 20.5 19.8 19.7 19.8 19.7L19 22.3C19 22.3 20.7 23 23 23C26.5 23 29 21.7 29 19C29 15.5 23 16 23 14C23 13.5 23.8 13 25 13C26.5 13 27.8 13.5 27.8 13.5L28.5 11C28.5 11 27 11 25 11Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
