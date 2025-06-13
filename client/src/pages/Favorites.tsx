import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PageHeading from '../components/PageHeading';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import { useFavorites } from '../hooks/useFavorites';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category_id: number;
  is_new: boolean;
  is_sale: boolean;
  color_id?: number;
  discount_price?: number;
  effective_price?: number;
}

export default function Favorites() {
  const { favorites, clearFavorites } = useFavorites();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch favorite products when favorites array changes
  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      if (favorites.length === 0) {
        setFavoriteProducts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Fetch all products first
        const response = await axios.get<Product[]>('/api/products');
        const allProducts = response.data;

        // Filter products that are in favorites
        const favoriteProductsData = allProducts.filter(product =>
          favorites.includes(product.id)
        );

        setFavoriteProducts(favoriteProductsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching favorite products:', err);
        setError('Failed to load favorite products');
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteProducts();
  }, [favorites]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <PageHeading
            title="Favoriter"
            breadcrumbs={[
              { name: "Hem", path: "/" },
              { name: "Favoriter", path: "/favorites" }
            ]}
          />
          <div className="text-center py-12">
            <div className="animate-pulse">
              <div className="text-lg text-gray-600">Laddar favoriter...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <PageHeading
            title="Favoriter"
            breadcrumbs={[
              { name: "Favoriter", path: "/favorites" }
            ]}
          />
          <div className="text-center py-12">
            <div className="text-red-500 text-lg">{error}</div>
            <Link
              to="/shop"
              className="mt-4 inline-block text-marianblue hover:text-mahogany underline"
            >
              Tillbaka till butiken
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <PageHeading
          title="Favoriter"
          breadcrumbs={[
            { name: "Favoriter", path: "/favorites" }
          ]}
        />

        {favoriteProducts.length === 0 ? (
          // Empty state
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              {/* Heart icon */}
              <div className="mb-6">
                <svg
                  className="mx-auto w-24 h-24 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Inga favoriter än
              </h2>              <p className="text-gray-500 mb-8">
                Klicka på hjärtat på produkter du gillar för att spara dem här.
              </p>

              <Link to="/shop">
                <Button text="Utforska produkter" />
              </Link>
            </div>
          </div>
        ) : (
          // Products grid
          <div>
            {/* Header with count and clear button */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-gray-600">
                  {favoriteProducts.length} {favoriteProducts.length === 1 ? 'produkt' : 'produkter'}
                </p>
              </div>

              {favoriteProducts.length > 0 && (
                <button
                  onClick={clearFavorites}
                  className="text-gray-600 cursor-pointer font-medium underline transition-colors duration-200"
                >
                  RENSA ALLA
                </button>
              )}
            </div>
            {/* Products grid */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 md:gap-8">
              {favoriteProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showBadges={true}
                />
              ))}
            </div>

            {/* Continue shopping */}
            <div className="text-center mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-4">Vill du utforska fler produkter?</p>
              <Link to="/shop">
                <Button text="Fortsätt handla" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
