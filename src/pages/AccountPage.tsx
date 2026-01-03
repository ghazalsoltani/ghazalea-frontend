import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Category } from "../types";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

function AccountPage() {
  const { user, logout } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (category: Category | null) => {
    if (category === null) {
      navigate("/home");
    } else {
      navigate(`/category/${category.slug}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col">
      <Navbar categories={categories} onCategoryClick={handleCategoryClick} />

      {/* Page Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1
            className="text-3xl md:text-4xl text-gray-800"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Mon Compte
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* User info card */}
          <div className="bg-white p-8 mb-8">
            <h2
              className="text-xl text-gray-800 mb-6 pb-4 border-b border-gray-100"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Informations personnelles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                  Prénom
                </label>
                <p className="text-gray-800">{user?.firstname}</p>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                  Nom
                </label>
                <p className="text-gray-800">{user?.lastname}</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                  Email
                </label>
                <p className="text-gray-800">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Orders link */}
            <Link
              to="/orders"
              className="bg-white p-6 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-[#faf8f5] flex items-center justify-center mr-4 group-hover:bg-[#c5a880]/10 transition-colors">
                  <svg
                    className="w-5 h-5 text-[#c5a880]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    className="text-gray-800 group-hover:text-[#c5a880] transition-colors"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Mes commandes
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Historique de vos commandes
                  </p>
                </div>
              </div>
            </Link>

            {/* Favorites link */}
            <Link
              to="/favorites"
              className="bg-white p-6 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-[#faf8f5] flex items-center justify-center mr-4 group-hover:bg-[#c5a880]/10 transition-colors">
                  <svg
                    className="w-5 h-5 text-[#c5a880]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    className="text-gray-800 group-hover:text-[#c5a880] transition-colors"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Mes favoris
                  </h3>
                  <p className="text-gray-400 text-sm">Vos pièces préférées</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Logout */}
          <div className="bg-white p-8">
            <h2
              className="text-xl text-gray-800 mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Déconnexion
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Vous souhaitez vous déconnecter de votre compte ?
            </p>
            <button
              type="button"
              onClick={logout}
              className="px-8 py-3 border border-gray-300 text-gray-600 text-sm uppercase tracking-wider hover:bg-gray-50 transition-colors"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AccountPage;
