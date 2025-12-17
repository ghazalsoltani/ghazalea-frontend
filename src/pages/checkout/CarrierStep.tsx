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
  const { state, setSelectedCarrier} = useCheckout();

  // Redirect if no address selected
  useEffect(() => {
    if (!state.selectedAddress) {
        navigate('/checkout/address')
    }
  }, [state.selectedAddress, navigate]);

// fetch carriers
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
        setError('Impossible de charger les modes de livraison');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarriers();
  }, []);

  // handle continue to next step
  const handleContinue = () => {
    const selected = carriers.find(c => c.id === selectedId);
    if (selected) {
        setSelectedCarrier(selected);
        navigate('/checkout/summary');
    }
  };

  // Handle go back
  const handleBack = () => {
    navigate('/checkout/address');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Steps indicator */}
        <CheckoutSteps currentStep="carrier" />

        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Mode de livraison
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Selected address summary */}
        {state.selectedAddress && (
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Livraison à :</p>
            <p className="font-semibold">
              {state.selectedAddress.firstname} {state.selectedAddress.lastname}
            </p>
            <p className="text-gray-600">
              {state.selectedAddress.address}, {state.selectedAddress.postal} {state.selectedAddress.city}
            </p>
          </div>
        )}

        {/* Carriers list */}
        <div className="space-y-4 mb-6">
          {carriers.map(carrier => (
            <div
              key={carrier.id}
              onClick={() => setSelectedId(carrier.id)}
              className={`
                p-4 bg-white rounded-lg border-2 cursor-pointer transition-colors
                ${selectedId === carrier.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* Radio indicator */}
                  <div
                    className={`
                      w-5 h-5 rounded-full border-2 mr-4 flex-shrink-0
                      flex items-center justify-center
                      ${selectedId === carrier.id
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                      }
                    `}
                  >
                    {selectedId === carrier.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">{carrier.name}</p>
                    <p className="text-gray-600 text-sm">{carrier.description}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    {carrier.price === 0 
                      ? 'Gratuit' 
                      : `${carrier.price.toFixed(2).replace('.', ',')} €`
                    }
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 py-4 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50"
          >
            Retour
          </button>
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedId}
            className={`
              flex-1 py-4 rounded-lg font-semibold text-white transition-colors
              ${selectedId
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-300 cursor-not-allowed'
              }
            `}
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarrierStep;