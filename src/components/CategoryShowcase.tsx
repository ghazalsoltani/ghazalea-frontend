import { useState } from "react";
import { Link } from "react-router-dom";
import { Category, Product } from "../types";
import { useCart } from "../context/CartContext";

interface CategoryShowcaseProps {
  categories: Category[];
  products: Product[];
  onCategoryClick: (category: Category) => void;
}

function CategoryShowcase({
  categories,
  products,
  onCategoryClick,
}: CategoryShowcaseProps) {
  const { addToCart } = useCart();

  // Get first product of each category
  const getFirstProduct = (categoryId: number): Product | undefined => {
    return products.find((p) => p.category.id === categoryId);
  };

  // Category images mapping
  const categoryImages: Record<string, string> = {
    sacs: "/images/categories/Sacs.jpg",
    bijoux: "/images/categories/Bijoux.jpg",
    lunettes: "/images/categories/Lunettes.jpg",
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Category Titles - Polène Style */}
        <div className="text-center mb-16">
          <div className="flex flex-col items-center gap-3">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => onCategoryClick(category)}
                className="group relative"
              >
                <span
                  className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-800 tracking-[0.2em] uppercase transition-all duration-300 hover:text-gray-500"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    animationDelay: `${index * 150}ms`,
                  }}
                >
                  {category.name}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gray-800 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category) => {
            const firstProduct = getFirstProduct(category.id);
            const categorySlug = category.slug.toLowerCase();
            const categoryImage = categoryImages[categorySlug];

            return (
              <CategoryCard
                key={category.id}
                category={category}
                categoryImage={categoryImage}
                firstProduct={firstProduct}
                onCategoryClick={onCategoryClick}
                onAddToCart={addToCart}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Individual Category Card with Hover Effect
interface CategoryCardProps {
  category: Category;
  categoryImage: string;
  firstProduct?: Product;
  onCategoryClick: (category: Category) => void;
  onAddToCart: (product: Product) => void;
}

function CategoryCard({
  category,
  categoryImage,
  firstProduct,
  onCategoryClick,
  onAddToCart,
}: CategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const priceWithTax = firstProduct
    ? firstProduct.price * (1 + firstProduct.tva / 100)
    : 0;

  const productImage = firstProduct
    ? `http://127.0.0.1:8080/uploads/${firstProduct.illustration}`
    : categoryImage;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (firstProduct) {
      onAddToCart(firstProduct);
    }
  };

  return (
    <div
      className="group relative cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onCategoryClick(category)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        {/* Category Image (Default) */}
        <img
          src={categoryImage}
          alt={category.name}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
          }`}
        />

        {/* Product Image (On Hover) */}
        {firstProduct && (
          <img
            src={productImage}
            alt={firstProduct.name}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          />
        )}

        {/* Overlay with Product Info (On Hover) */}
        <div
          className={`absolute inset-0 bg-black/20 flex flex-col items-center justify-end pb-8 transition-all duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {firstProduct && (
            <div className="text-center text-white px-4">
              {/* Product Name */}
              <h3
                className="text-lg md:text-xl font-serif mb-2 transform transition-transform duration-500"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  transform: isHovered ? "translateY(0)" : "translateY(20px)",
                }}
              >
                {firstProduct.name}
              </h3>

              {/* Price */}
              <p
                className="text-base md:text-lg mb-4 font-light tracking-wider transition-all duration-500 delay-75"
                style={{
                  transform: isHovered ? "translateY(0)" : "translateY(20px)",
                  opacity: isHovered ? 1 : 0,
                }}
              >
                {priceWithTax.toFixed(2).replace(".", ",")} €
              </p>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="px-6 py-2 border border-white text-white text-sm uppercase tracking-[0.15em] hover:bg-white hover:text-gray-900 transition-all duration-300"
                style={{
                  transform: isHovered ? "translateY(0)" : "translateY(20px)",
                  opacity: isHovered ? 1 : 0,
                  transitionDelay: "150ms",
                }}
              >
                Ajouter au panier
              </button>
            </div>
          )}
        </div>

        {/* Category Label (Bottom) */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm py-3 text-center transition-all duration-500 ${
            isHovered
              ? "opacity-0 translate-y-full"
              : "opacity-100 translate-y-0"
          }`}
        >
          <span
            className="text-sm uppercase tracking-[0.2em] text-gray-700"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {category.name}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CategoryShowcase;
