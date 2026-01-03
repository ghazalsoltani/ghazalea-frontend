import { useEffect, useState } from "react";
import { Carrier } from "../../types";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../context/CheckoutContext";
import { api } from "../../services/api";
import CheckoutSteps from "../../components/CheckoutSteps";

function CarrierStep() {
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const navigate = useNavigate();
  const { state, setSelectedCarrier } = useCheckout();

  useEffect(() => {
    if (!state.selectedAddress) {
      navigate("/checkout/address");
    }
  }, [state.selectedAddress, navigate]);

  useEffect(() => {
    const fetchCarriers = async () => {
      try {
        setLoading(true);
        const data = await api.getCarriers();
        setCarriers(data);
        if (data.length > 0) {
          setSelectedId(data[0].id);
        }
      } catch (err) {
        setError("Impossible de charger les modes de livraison");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCarriers();
  }, []);

  const handleContinue = () => {
    const selected = carriers.find((c) => c.id === selectedId);
    if (selected) {
      setSelectedCarrier(selected);
      navigate("/checkout/summary");
    }
  };

  const handleBack = () => {
    navigate("/checkout/address");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
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
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <button
            onClick={handleBack}
            className="text-gray-500 hover:text-[#c5a880] flex items-center text-sm transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Retour à l'adresse
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <CheckoutSteps currentStep="carrier" />

        <h1
          className="text-2xl md:text-3xl text-gray-800 mb-8 text-center"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Mode de livraison
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        {/* Selected address summary */}
        {state.selectedAddress && (
          <div className="bg-white p-5 mb-8">
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">
              Livraison à
            </p>
            <p
              className="text-gray-800"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {state.selectedAddress.firstname} {state.selectedAddress.lastname}
            </p>
            <p className="text-gray-500 text-sm">
              {state.selectedAddress.address}, {state.selectedAddress.postal}{" "}
              {state.selectedAddress.city}
            </p>
          </div>
        )}

        {/* Carriers list */}
        <div className="space-y-4 mb-8">
          {carriers.map((carrier) => (
            <div
              key={carrier.id}
              onClick={() => setSelectedId(carrier.id)}
              className={`p-5 bg-white cursor-pointer transition-all ${
                selectedId === carrier.id
                  ? "ring-2 ring-[#c5a880]"
                  : "hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-4 flex-shrink-0 flex items-center justify-center transition-colors ${
                      selectedId === carrier.id
                        ? "border-[#c5a880] bg-[#c5a880]"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedId === carrier.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>

                  <div>
                    <p
                      className="text-gray-800"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                      }}
                    >
                      {carrier.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {carrier.description}
                    </p>
                  </div>
                </div>

                <p
                  className="text-gray-800"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {carrier.price === 0
                    ? "Gratuit"
                    : `${carrier.price.toFixed(2).replace(".", ",")} €`}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 py-4 border border-gray-300 text-gray-600 hover:bg-white transition-colors text-sm"
          >
            Retour
          </button>
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedId}
            className={`flex-1 py-4 text-sm uppercase tracking-[0.15em] transition-colors ${
              selectedId
                ? "bg-[#2c3e50] text-white hover:bg-[#34495e]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarrierStep;
