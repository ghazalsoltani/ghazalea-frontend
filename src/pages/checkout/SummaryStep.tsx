import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useCheckout } from "../../context/CheckoutContext";
import { api } from "../../services/api";
import CheckoutSteps from "../../components/CheckoutSteps";

function SummaryStep() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { state, setOrderId } = useCheckout();

  // Redirect if previous steps not completed
  if (!state.selectedAddress || !state.selectedCarrier) {
    navigate('/checkout/address');
    return null;
  }

  const { selectedAddress, selectedCarrier } = state;

  // Calculate totals
  const subtotal = totalPrice;
  const shipping = selectedCarrier.price;
  const total = subtotal + shipping;

  // Handle place order
  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);

    try {
      const orderData = {
        addressId: selectedAddress.id,
        carrierId: selectedCarrier.id,
        items: items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      };

      const result = await api.createOrder(orderData);

      if (result.success) {
        setOrderId(result.orderId);
        clearCart();
        navigate('/checkout/confirmation');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la création de la commande');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle go back
  const handleBack = () => {
    navigate('/checkout/carrier');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Steps indicator */}
        <CheckoutSteps currentStep="summary" />

        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Récapitulatif de commande
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Order details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Adresse de livraison
                </h2>
                <button
                  type="button"
                  onClick={() => navigate('/checkout/address')}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Modifier
                </button>
              </div>
              <div className="text-gray-600">
                <p className="font-semibold text-gray-900">
                  {selectedAddress.firstname} {selectedAddress.lastname}
                </p>
                <p>{selectedAddress.address}</p>
                <p>{selectedAddress.postal} {selectedAddress.city}</p>
                <p>{selectedAddress.country}</p>
                <p className="mt-2 text-sm">{selectedAddress.phone}</p>
              </div>
            </div>

            {/* Carrier */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Mode de livraison
                </h2>
                <button
                  type="button"
                  onClick={() => navigate('/checkout/carrier')}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Modifier
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{selectedCarrier.name}</p>
                  <p className="text-gray-600 text-sm">{selectedCarrier.description}</p>
                </div>
                <p className="font-bold">
                  {selectedCarrier.price === 0
                    ? 'Gratuit'
                    : `${selectedCarrier.price.toFixed(2).replace('.', ',')} €`
                  }
                </p>
              </div>
            </div>

            {/* Products */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Articles ({items.length})
                </h2>
                <button
                  type="button"
                  onClick={() => navigate('/cart')}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Modifier
                </button>
              </div>

              <div className="divide-y">
                {items.map(item => {
                  const itemPrice = item.product.price * (1 + item.product.tva / 100);
                  return (
                    <div key={item.product.id} className="py-4 flex items-center gap-4">
                      <img
                        src={`http://localhost:8080/uploads/${item.product.illustration}`}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{item.product.name}</p>
                        <p className="text-gray-500 text-sm">Quantité: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-gray-900">
                        {(itemPrice * item.quantity).toFixed(2).replace('.', ',')} €
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right column - Order total */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Total
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total</span>
                  <span>{subtotal.toFixed(2).replace('.', ',')} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Livraison</span>
                  <span>
                    {shipping === 0 ? 'Gratuit' : `${shipping.toFixed(2).replace('.', ',')} €`}
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Total TTC</span>
                  <span>{total.toFixed(2).replace('.', ',')} €</span>
                </div>
              </div>

              {/* Place order button */}
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={loading}
                className={`
                  w-full mt-6 py-4 rounded-lg font-semibold text-white transition-colors
                  ${loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                  }
                `}
              >
                {loading ? 'Traitement...' : 'Confirmer la commande'}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                En passant commande, vous acceptez nos conditions générales de vente
              </p>
            </div>
          </div>
        </div>

        {/* Back button */}
        <button
          type="button"
          onClick={handleBack}
          className="mt-6 text-gray-600 hover:text-gray-900"
        >
          ← Retour au choix de livraison
        </button>
      </div>
    </div>
  );
}

export default SummaryStep;