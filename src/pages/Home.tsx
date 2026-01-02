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
  // Get category slug from URL
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Categories state
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  // Get addToCart from context
  const { addToCart } = useCart();

  // Loading and error states
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products and categories on mount
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

  // Filter products when slug or products change
  useEffect(() => {
    if (slug && categories.length > 0) {
      // Find category by slug
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
        // Invalid slug, show all products
        setSelectedCategory(null);
        setFilteredProducts(products);
      }
    } else {
      // No slug, show all products
      setSelectedCategory(null);
      setFilteredProducts(products);
    }
  }, [slug, products, categories]);

  // Handle category click, navigate to category URL
  const handleCategoryClick = (category: Category | null) => {
    if (category === null) {
      navigate("/home");
    } else {
      navigate(`/category/${category.slug}`);
    }
  };

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  // Loading state
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

  // Error state
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

  // Check if we're on the main page (no category selected)
  const isMainPage = selectedCategory === null;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation Bar */}
      <Navbar categories={categories} onCategoryClick={handleCategoryClick} />

      {/* ===== MAIN PAGE (Homepage) ===== */}
      {isMainPage ? (
        <>
          {/* 1. Hero Section - L'Inspiration */}
          <HeroSection />

          {/* 2. Trust Badges - La Réassurance */}
          <TrustBadges />

          {/* 3. Category Showcase - L'Orientation */}
          <CategoryShowcase
            categories={categories}
            products={products}
            onCategoryClick={handleCategoryClick}
          />

          {/* 4. Storytelling Section - La Conviction */}
          <StorytellingSection />

          {/* 5. Boutique Section - L'Ancrage / La Preuve */}
          <BoutiqueSection />

          {/* 6. Newsletter */}
          <Newsletter />
        </>
      ) : (
        <>
          {/* ===== CATEGORY PAGE ===== */}

          {/* Category Header */}
          <div className="bg-white py-16 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-4 tracking-[0.1em] uppercase"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 400,
                }}
              >
                {selectedCategory.name}
              </h1>
              <p className="text-gray-500">
                Découvrez notre collection de{" "}
                {selectedCategory.name.toLowerCase()}
              </p>
            </div>
          </div>

          {/* Trust Badges */}
          <TrustBadges />

          {/* Products Grid */}
          <section className="flex-1 py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              {/* Product Count */}
              <div className="text-center mb-12">
                <p className="text-sm text-gray-500">
                  {filteredProducts.length} produit
                  {filteredProducts.length > 1 ? "s" : ""}
                </p>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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

          {/* Newsletter */}
          <Newsletter />
        </>
      )}

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}

export default Home;
