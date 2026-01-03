import { useEffect, useState } from "react";
import { Address, AddressFormData } from "../../types";
import { useCheckout } from "../../context/CheckoutContext";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../services/api";
import CheckoutSteps from "../../components/CheckoutSteps";

function AddressStep() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<AddressFormData>({
    firstname: "",
    lastname: "",
    address: "",
    postal: "",
    city: "",
    country: "France",
    phone: "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { setSelectedAddress } = useCheckout();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const data = await api.getAddresses();
        setAddresses(data);
        if (data.length > 0) {
          setSelectedId(data[0].id);
        }
      } catch (err) {
        setError("Impossible de charger vos adresses");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const required: (keyof AddressFormData)[] = [
      "firstname",
      "lastname",
      "address",
      "postal",
      "city",
      "country",
      "phone",
    ];
    for (const field of required) {
      if (!formData[field]) {
        setFormError(`Le champ ${field} est requis`);
        return;
      }
    }

    setSubmitting(true);

    try {
      const newAddress = await api.createAddress(formData);
      setAddresses((prev) => [...prev, newAddress]);
      setSelectedId(newAddress.id);
      setShowForm(false);
      setFormData({
        firstname: "",
        lastname: "",
        address: "",
        postal: "",
        city: "",
        country: "France",
        phone: "",
      });
    } catch (err) {
      setFormError("Erreur lors de la création de l'adresse");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleContinue = () => {
    const selected = addresses.find((a) => a.id === selectedId);
    if (selected) {
      setSelectedAddress(selected);
      navigate("/checkout/carrier");
    }
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
          <Link
            to="/cart"
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
            Retour au panier
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <CheckoutSteps currentStep="address" />

        <h1
          className="text-2xl md:text-3xl text-gray-800 mb-8 text-center"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Adresse de livraison
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        {/* Addresses list */}
        {addresses.length > 0 && !showForm && (
          <div className="space-y-4 mb-6">
            {addresses.map((address) => (
              <div
                key={address.id}
                onClick={() => setSelectedId(address.id)}
                className={`p-5 bg-white cursor-pointer transition-all ${
                  selectedId === address.id
                    ? "ring-2 ring-[#c5a880]"
                    : "hover:shadow-md"
                }`}
              >
                <div className="flex items-start">
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-4 mt-0.5 flex-shrink-0 flex items-center justify-center transition-colors ${
                      selectedId === address.id
                        ? "border-[#c5a880] bg-[#c5a880]"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedId === address.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>

                  <div className="flex-1">
                    <p
                      className="text-gray-800 mb-1"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                      }}
                    >
                      {address.firstname} {address.lastname}
                    </p>
                    <p className="text-gray-500 text-sm">{address.address}</p>
                    <p className="text-gray-500 text-sm">
                      {address.postal} {address.city}, {address.country}
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      {address.phone}
                    </p>
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
            className="w-full p-4 border border-dashed border-gray-300 text-gray-500 hover:border-[#c5a880] hover:text-[#c5a880] transition-colors mb-8 text-sm"
          >
            + Ajouter une nouvelle adresse
          </button>
        )}

        {/* New address form */}
        {showForm && (
          <div className="bg-white p-6 md:p-8 mb-8">
            <h2
              className="text-lg text-gray-800 mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Nouvelle adresse
            </h2>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmitAddress}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-[#c5a880] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-[#c5a880] focus:outline-none transition-colors"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Adresse
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Rue de la Paix"
                    className="w-full px-4 py-3 border border-gray-200 focus:border-[#c5a880] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Code postal
                  </label>
                  <input
                    type="text"
                    name="postal"
                    value={formData.postal}
                    onChange={handleInputChange}
                    placeholder="75001"
                    className="w-full px-4 py-3 border border-gray-200 focus:border-[#c5a880] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Ville
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Paris"
                    className="w-full px-4 py-3 border border-gray-200 focus:border-[#c5a880] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Pays
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-[#c5a880] focus:outline-none transition-colors bg-white"
                  >
                    <option value="France">France</option>
                    <option value="Belgique">Belgique</option>
                    <option value="Suisse">Suisse</option>
                    <option value="Luxembourg">Luxembourg</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="06 12 34 56 78"
                    className="w-full px-4 py-3 border border-gray-200 focus:border-[#c5a880] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors text-sm"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-3 bg-[#2c3e50] text-white hover:bg-[#34495e] transition-colors disabled:bg-gray-300 text-sm"
                >
                  {submitting ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Continue button */}
        <button
          type="button"
          onClick={handleContinue}
          disabled={!selectedId}
          className={`w-full py-4 text-sm uppercase tracking-[0.15em] transition-colors ${
            selectedId
              ? "bg-[#2c3e50] text-white hover:bg-[#34495e]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Continuer vers la livraison
        </button>
      </div>
    </div>
  );
}

export default AddressStep;
