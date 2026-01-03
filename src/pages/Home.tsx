import { useEffect, useState } from "react";
import { Product, Category } from "../types";
import { api } from "../services/api";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CategoryShowcase from "../components/CategoryShowcase";
import TrustBadges from "../components/TrustBadges";
import StorytellingSection from "../components/StorytellingSection";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import BoutiqueSection from "../components/Boutiquesection";

function Home() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const { addToCart } = useCart();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          api.getProducts(),
          api.getCategories(),
        ]);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError("Impossible de charger les données");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (slug && categories.length > 0) {
      const category = categories.find(
        (c) => c.slug.toLowerCase() === slug.toLowerCase()
      );
      if (category) {
        setSelectedCategory(category);
        const filtered = products.filter(
          (product) => product.category.id === category.id
        );
        setFilteredProducts(filtered);
      } else {
        setSelectedCategory(null);
        setFilteredProducts(products);
      }
    } else {
      setSelectedCategory(null);
      setFilteredProducts(products);
    }
  }, [slug, products, categories]);

  const handleCategoryClick = (category: Category | null) => {
    if (category === null) {
      navigate("/home");
    } else {
      navigate(`/category/${category.slug}`);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border border-gray-300 border-t-gray-800 rounded-full animate-spin mx-auto"></div>
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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-2 border border-gray-800 text-gray-800 text-sm uppercase tracking-[0.1em] hover:bg-gray-800 hover:text-white transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  const isMainPage = selectedCategory === null;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar categories={categories} onCategoryClick={handleCategoryClick} />

      {/* ===== MAIN PAGE (Homepage) ===== */}
      {isMainPage ? (
        <>
          <HeroSection />
          <TrustBadges />
          <CategoryShowcase
            categories={categories}
            products={products}
            onCategoryClick={handleCategoryClick}
          />
          <StorytellingSection />
          <BoutiqueSection />
          <Newsletter />
        </>
      ) : (
        <>
          {/* ===== CATEGORY PAGE - Optimized spacing ===== */}

          {/* Category Header - Reduced padding */}
          <div className="bg-white py-10 md:py-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h1
                className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-2 tracking-[0.15em] uppercase"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 400,
                }}
              >
                {selectedCategory.name}
              </h1>
            </div>
          </div>

          {/* Trust Badges - Compact */}
          <TrustBadges />

          {/* Products Grid - Reduced top padding */}
          <section className="flex-1 py-8 md:py-10 bg-[#faf8f5]">
            <div className="max-w-7xl mx-auto px-4">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-500 mb-6">
                    Aucun produit dans cette catégorie pour le moment.
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(null)}
                    className="px-8 py-3 border border-gray-800 text-gray-800 text-sm uppercase tracking-[0.1em] hover:bg-gray-800 hover:text-white transition-colors"
                  >
                    Retour à l'accueil
                  </button>
                </div>
              )}
            </div>
          </section>

          <Newsletter />
        </>
      )}

      <Footer />
    </div>
  );
}

export default Home;
