import { useEffect, useState } from "react";
import { Category, Order } from "../types";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

// Order state labels
const stateLabels: { [key: number]: { label: string; color: string } } = {
  1: { label: 'En attente de paiement', color: 'bg-yellow-100 text-yellow-800' },
  2: { label: 'Paiement validé', color: 'bg-blue-100 text-blue-800' },
  3: { label: 'En préparation', color: 'bg-purple-100 text-purple-800' },
  4: { label: 'Expédiée', color: 'bg-green-100 text-green-800' },
  5: { label: 'Annulée', color: 'bg-red-100 text-red-800' },
};

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);
            const [ordersData, categoriesData] = await Promise.all ([
                api.getOrders(),
                api.getCategories(),
            ]);
            setOrders(ordersData);
        setCategories(categoriesData);
      } catch (err) {
        setError('Impossible de charger vos commandes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar categories={categories} onCategoryClick={() => {}} />
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar categories={categories} onCategoryClick={() => {}} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Mes commandes
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg
              className="w-16 h-16 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Aucune commande
            </h2>
            <p className="text-gray-500 mb-6">
              Vous n'avez pas encore passé de commande.
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Découvrir nos produits
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => {
              const stateInfo = stateLabels[order.state] || { label: 'Inconnu', color: 'bg-gray-100 text-gray-800' };

              return (
                <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Order header */}
                  <div className="bg-gray-50 px-6 py-4 border-b flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        Commande #{order.id}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${stateInfo.color}`}>
                      {stateInfo.label}
                    </span>
                  </div>

                  {/* Order items */}
                  <div className="p-6">
                    <div className="divide-y">
                      {order.orderDetails.map((detail, index) => (
                        <div key={index} className="py-4 flex items-center gap-4 first:pt-0 last:pb-0">
                          <img
                            src={`http://localhost:8080/uploads/${detail.productIllustration}`}
                            alt={detail.productName}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">
                              {detail.productName}
                            </p>
                            <p className="text-gray-500 text-sm">
                              Quantité: {detail.productQuantity}
                            </p>
                          </div>
                          <p className="font-semibold text-gray-900">
                            {(detail.productPrice * detail.productQuantity).toFixed(2).replace('.', ',')} €
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Order footer */}
                    <div className="mt-4 pt-4 border-t flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Livraison: {order.carrierName} ({order.carrierPrice.toFixed(2).replace('.', ',')} €)
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        Total: {order.total.toFixed(2).replace('.', ',')} €
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;