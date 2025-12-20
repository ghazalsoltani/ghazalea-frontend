import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo.png"
                alt="Ghazaléa"
                className="h-12 w-12 object-contain"
              />
              <span className="text-2xl font-serif text-white">Ghazaléa</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Accessoires de mode artisanaux. Découvrez notre collection de
              sacs, bijoux et lunettes de soleil.
            </p>
            <div className="flex gap-4">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Boutique Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Boutique</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Tous les produits
                </Link>
              </li>
              <li>
                <Link
                  to="/?category=sacs"
                  className="hover:text-white transition-colors"
                >
                  Sacs
                </Link>
              </li>
              <li>
                <Link
                  to="/?category=bijoux"
                  className="hover:text-white transition-colors"
                >
                  Bijoux
                </Link>
              </li>
              <li>
                <Link
                  to="/?category=lunettes"
                  className="hover:text-white transition-colors"
                >
                  Lunettes
                </Link>
              </li>
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Informations</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/livraison"
                  className="hover:text-white transition-colors"
                >
                  Livraison
                </Link>
              </li>
              <li>
                <Link to="/cgv" className="hover:text-white transition-colors">
                  CGV
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2024 La Boutique Française. Tous droits réservés.
          </p>

          {/* Payment Icons */}
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {/* Visa */}
            <svg className="h-8" viewBox="0 0 50 35" fill="none">
              <rect width="50" height="35" rx="4" fill="#1A1F71" />
              <path
                d="M21.5 23H19L20.5 12H23L21.5 23ZM17.5 12L15 19.5L14.5 17L13.5 12.5C13.5 12.5 13.3 12 12.5 12H8L8 12.2C8 12.2 9 12.4 10 13L12.5 23H15.5L21 12H17.5ZM35 23L37 12H34L32 23H35ZM30 12L27.5 19L27 17L26.5 12.5C26.5 12.5 26.3 12 25.5 12H22L22 12.2C22 12.2 24 12.7 26 14L28 23H31L37 12H30Z"
                fill="white"
              />
            </svg>

            {/* Mastercard */}
            <svg className="h-8" viewBox="0 0 50 35" fill="none">
              <rect width="50" height="35" rx="4" fill="#F5F5F5" />
              <circle cx="20" cy="17.5" r="10" fill="#EB001B" />
              <circle cx="30" cy="17.5" r="10" fill="#F79E1B" />
              <path
                d="M25 10.5C27.5 12.5 29 15 29 17.5C29 20 27.5 22.5 25 24.5C22.5 22.5 21 20 21 17.5C21 15 22.5 12.5 25 10.5Z"
                fill="#FF5F00"
              />
            </svg>

            {/* Stripe */}
            <svg className="h-8" viewBox="0 0 50 35" fill="none">
              <rect width="50" height="35" rx="4" fill="#635BFF" />
              <path
                d="M25 11C21 11 18 12.5 18 15C18 19 25 18.5 25 20.5C25 21.2 24 21.5 23 21.5C21 21.5 19.5 20.5 19.5 20.5L18.5 23C18.5 23 20.5 24 23 24C27 24 30 22.5 30 19.5C30 15.5 23 16 23 14C23 13.5 24 13 25 13C26.5 13 28 13.5 28 13.5L29 11C29 11 27.5 11 25 11Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
