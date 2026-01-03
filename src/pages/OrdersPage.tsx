import { useEffect, useState } from "react";
import { Category, Order } from "../types";
import { api } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Order state labels with Ghazaléa colors
const stateLabels: { [key: number]: { label: string; color: string } } = {
  1: { label: "En attente", color: "bg-amber-50 text-amber-700" },
  2: { label: "Paiement validé", color: "bg-blue-50 text-blue-700" },
  3: { label: "En préparation", color: "bg-purple-50 text-purple-700" },
  4: { label: "Expédiée", color: "bg-green-50 text-green-700" },
  5: { label: "Annulée", color: "bg-red-50 text-red-700" },
};

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [ordersData, categoriesData] = await Promise.all([
          api.getOrders(),
          api.getCategories(),
        ]);
        setOrders(ordersData);
        setCategories(categoriesData);
      } catch (err) {
        setError("Impossible de charger vos commandes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategoryClick = (category: Category | null) => {
    if (category === null) {
      navigate("/home");
    } else {
      navigate(`/category/${category.slug}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex flex-col">
        <Navbar categories={categories} onCategoryClick={handleCategoryClick} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border border-gray-300 border-t-[#2c3e50] rounded-full animate-spin mx-auto"></div>
            <p
              className="mt-6 text-gray-500 text-sm uppercase tracking-[0.2em]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Chargement
            </p>
          </div>
        </div>
      </div>
    );
  }

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
            Mes Commandes
          </h1>
        </div>
      </div>

      <div className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          {orders.length === 0 ? (
            <div className="bg-white p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-[#faf8f5] flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-[#c5a880]"
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
              </div>
              <h2
                className="text-xl text-gray-800 mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Aucune commande
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                Vous n'avez pas encore passé de commande.
              </p>
              <Link
                to="/home"
                className="inline-block px-10 py-4 bg-[#2c3e50] text-white text-sm uppercase tracking-[0.15em] hover:bg-[#34495e] transition-colors"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Découvrir la collection
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const stateInfo = stateLabels[order.state] || {
                  label: "Inconnu",
                  color: "bg-gray-100 text-gray-600",
                };

                return (
                  <div key={order.id} className="bg-white overflow-hidden">
                    {/* Order header */}
                    <div className="px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p
                          className="text-gray-800"
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                          }}
                        >
                          Commande #{order.id}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {new Date(order.createdAt).toLocaleDateString(
                            "fr-FR",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 text-xs uppercase tracking-wider ${stateInfo.color}`}
                      >
                        {stateInfo.label}
                      </span>
                    </div>

                    {/* Order items */}
                    <div className="p-6">
                      <div className="divide-y divide-gray-100">
                        {order.orderDetails.map((detail, index) => (
                          <div
                            key={index}
                            className="py-4 flex items-center gap-4 first:pt-0 last:pb-0"
                          >
                            <div className="w-16 h-16 bg-gray-50 flex-shrink-0">
                              <img
                                src={`http://127.0.0.1:8080/uploads/${detail.productIllustration}`}
                                alt={detail.productName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-gray-800 text-sm truncate">
                                {detail.productName}
                              </p>
                              <p className="text-gray-400 text-xs">
                                Qté: {detail.productQuantity}
                              </p>
                            </div>
                            <p className="text-gray-800 text-sm">
                              {(detail.productPrice * detail.productQuantity)
                                .toFixed(2)
                                .replace(".", ",")}{" "}
                              €
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Order footer */}
                      <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
                        <div className="text-gray-400 text-sm">
                          {order.carrierName} •{" "}
                          {order.carrierPrice === 0
                            ? "Livraison offerte"
                            : `${order.carrierPrice
                                .toFixed(2)
                                .replace(".", ",")} €`}
                        </div>
                        <div
                          className="text-gray-800"
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                          }}
                        >
                          Total: {order.total.toFixed(2).replace(".", ",")} €
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

      <Footer />
    </div>
  );
}

export default OrdersPage;
