import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category_id: number;
  is_new: boolean;
  is_sale: boolean;
  discount_price?: number;
}

export default function SaleItems() {
  const [saleItems, setSaleItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        const response = await axios.get<Product[]>('/api/products/sale');
        setSaleItems(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSaleProducts();
  }, []);

  // Display only 4 new products
  const filteredItems = saleItems
  .filter(product => product.is_sale)
  .slice(0, 4);

  if (isLoading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  if (saleItems.length === 0) return <div className="text-center py-12">No new products found</div>;

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center my-8 md:m-6 px-6 lg:px-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-marianblue font-semibold">
          <span className="font-montserrat-alt">Sista chansen</span>
        </h2>
        <a href="#" className="text-gray-600 font-medium underline">VISA ALLA</a>
      </div>      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 px-4 mb-12 my-10">        {filteredItems.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              ...product,
              price: parseFloat(product.price),
              category_id: product.category_id || 0,
              is_new: product.is_new || false,
              discount_price: product.discount_price
            }}
            showBadges={true}
          />
        ))}
      </div>
    </div>
  );
}
