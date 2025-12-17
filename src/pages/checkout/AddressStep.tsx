import { useEffect, useState } from "react";
import { Address, AddressFormData } from "../../types";
import { useCheckout } from "../../context/CheckoutContext";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import CheckoutSteps from "../../components/CheckoutSteps";

function AddressStep() {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State for selected address
    const [selectedId, setSelectedId] = useState<number | null>(null);

    // state for new address form
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<AddressFormData>({
        firstname: '',
        lastname: '',
        address: '',
        postal: '',
        city: '',
        country: 'France',
        phone: '',
    });
    const [formError, setFormError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    // hooks
    const navigate = useNavigate();
    const { setSelectedAddress } = useCheckout();

    // fetch addresses
    useEffect(() => {
        const fetchAddresses = async() => {
           try { 
            setLoading(true);
            const data = await api.getAddresses();
            setAddresses(data);

            // Auto select first address if exist
            if (data.length > 0) {
                setSelectedId(data[0].id);
            }
        } catch (err) {
            setError('Impossible de charger vos addresses');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    fetchAddresses();
}, []);

// Handle from input changes
const hanleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
};
// Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle new address form submission
  const handleSubmitAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Basic validation
    const required: (keyof AddressFormData)[] = ['firstname', 'lastname', 'address', 'postal', 'city', 'country', 'phone'];
    for (const field of required) {
      if (!formData[field]) {
        setFormError(`Le champ ${field} est requis`);
        return;
      }
    }

    setSubmitting(true);

    try {
      const newAddress = await api.createAddress(formData); // Call server (sending from !)

      setAddresses(prev => [...prev, newAddress]);
      setSelectedId(newAddress.id);
      setShowForm(false);

      // Reset form
      setFormData({
        firstname: '',
        lastname: '',
        address: '',
        postal: '',
        city: '',
        country: 'France',
        phone: '',
      });
    } catch (err) {
      setFormError('Erreur lors de la création de l\'adresse');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle continue to next step
  const handleContinue = () => {
    const selected = addresses.find(a => a.id === selectedId);
    if (selected) {
      setSelectedAddress(selected);
      navigate('/checkout/carrier');
    }
  };

  // Loading state
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
        <CheckoutSteps currentStep="address" />

        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Adresse de livraison
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Addresses list */}
        {addresses.length > 0 && !showForm && (
          <div className="space-y-4 mb-6">
            {addresses.map(address => (
              <div
                key={address.id}
                onClick={() => setSelectedId(address.id)}
                className={`
                  p-4 bg-white rounded-lg border-2 cursor-pointer transition-colors
                  ${selectedId === address.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                  }
                `}
              >
                <div className="flex items-start">
                  {/* Radio indicator */}
                  <div
                    className={`
                      w-5 h-5 rounded-full border-2 mr-4 mt-1 flex-shrink-0
                      flex items-center justify-center
                      ${selectedId === address.id
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                      }
                    `}
                  >
                    {selectedId === address.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>

                  {/* Address details */}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {address.firstname} {address.lastname}
                    </p>
                    <p className="text-gray-600">{address.address}</p>
                    <p className="text-gray-600">
                      {address.postal} {address.city}
                    </p>
                    <p className="text-gray-600">{address.country}</p>
                    <p className="text-gray-500 text-sm mt-1">{address.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add new address button */}
        {!showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors mb-6"
          >
            + Ajouter une nouvelle adresse
          </button>
        )}

        {/* New address form */}
        {showForm && (
          <form onSubmit={handleSubmitAddress} className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Nouvelle adresse
            </h2>

            {formError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {formError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Firstname */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Lastname */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="123 Rue de la Paix"
                />
              </div>

              {/* Postal code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Code postal
                </label>
                <input
                  type="text"
                  name="postal"
                  value={formData.postal}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="75001"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ville
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Paris"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pays
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="France">France</option>
                  <option value="Belgique">Belgique</option>
                  <option value="Suisse">Suisse</option>
                  <option value="Luxembourg">Luxembourg</option>
                </select>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="06 12 34 56 78"
                />
              </div>
            </div>

            {/* Form buttons */}
            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
              >
                {submitting ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        )}

        {/* Continue button */}
        <button
          type="button"
          onClick={handleContinue}
          disabled={!selectedId}
          className={`
            w-full py-4 rounded-lg font-semibold text-white transition-colors
            ${selectedId
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-300 cursor-not-allowed'
            }
          `}
        >
          Continuer vers la livraison
        </button>
      </div>
    </div>
  );
}

export default AddressStep;
