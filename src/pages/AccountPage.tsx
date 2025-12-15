import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Category } from "../types";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

function AccountPage() {
    // get user data from auth context
    const { user, logout } = useAuth();

// Categories for navbar
    const [ categories, setCategories ] = useState<Category[]>([]);

    const navigate = useNavigate();

useEffect(() => {
    const fetchCategories = async () => {
        try {
            const data = await api.getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories', error);
        }
    };
    fetchCategories();
}, []);

const handleCategoryClick = ( category: Category | null ) => {

    navigate('/ ');
};

return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar categories={categories} onCategoryClick={handleCategoryClick} />

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mon Compte</h1>

        {/* User info card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Informations personnelles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Prénom
              </label>
              <p className="mt-1 text-lg text-gray-900">{user?.firstname}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Nom
              </label>
              <p className="mt-1 text-lg text-gray-900">{user?.lastname}</p>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-500">
                Email
              </label>
              <p className="mt-1 text-lg text-gray-900">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Orders link */}
          <Link 
            to="/orders"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Mes commandes</h3>
                <p className="text-sm text-gray-500">Voir l'historique de vos commandes</p>
              </div>
            </div>
          </Link>

          {/* Addresses link */}
          <Link 
            to="/addresses"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Mes adresses</h3>
                <p className="text-sm text-gray-500">Gérer vos adresses de livraison</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Logout button */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Déconnexion
          </h2>
          <p className="text-gray-600 mb-4">
            Vous souhaitez vous déconnecter de votre compte ?
          </p>
          <button
            type="button"
            onClick={logout}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
