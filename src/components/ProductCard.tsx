import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  readonly product: Product;
  readonly onAddToCart: (product: Product) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const priceWithTax = product.price * (1 + product.tva / 100);
  const imageUrl = `http://localhost:8080/uploads/${product.illustration}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      
      {/* Clickable image - links to product detail page */}
      {/* Symfony: <a href="{{ path('app_product', { slug: product.slug }) }}"> */}
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-4">
        <span className="text-xs text-blue-600 font-medium uppercase tracking-wide">
          {product.category.name}
        </span>

        {/* Clickable product name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="mt-1 text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 text-xl font-bold text-gray-900">
          {priceWithTax.toFixed(2).replace('.', ',')} €
        </p>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();  // Prevent navigation when clicking button
            onAddToCart(product);
          }}
          className="mt-4 w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}

export default ProductCard;