import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductPrice from '../components/ProductPrice';
import PageHeading from '../components/PageHeading';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category_id: number;
  is_new: boolean;
  is_sale: boolean;
  color_id?: number;
}

interface Category {
  id: number;
  name: string;
}

interface Color {
  id: number;
  name: string;
  hex: string;
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedColors, setSelectedColors] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  // Fetch products, categories, and colors
  useEffect(() => {
    axios.get<Product[]>('/api/products').then(res => setProducts(res.data));
    axios.get<Category[]>('/api/products/categories').then(res => setCategories(res.data));
    axios.get<Color[]>('/api/products/colors').then(res => setColors(res.data));
  }, []);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category_id);
      const matchesColor =
        selectedColors.length === 0 || (product.color_id !== undefined && selectedColors.includes(product.color_id));
      const matchesPrice =
        (!priceRange.min || product.price >= Number(priceRange.min)) &&
        (!priceRange.max || product.price <= Number(priceRange.max));
      return matchesCategory && matchesColor && matchesPrice;
    });
  }, [products, selectedCategories, selectedColors, priceRange]);

  // Clear filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setPriceRange({ min: '', max: '' });
  };

  return (
    <div className="py-4">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="flex justify-between items-center mb-6 md:mt-24">
              <h2 className="text-xl font-semibold text-marianblue">Filter</h2>
              <button
                className="text-sm text-gray-700 hover:text-marianblue"
                onClick={clearFilters}
              >
                Rensa filter
              </button>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-marianblue mb-4">Kategorier</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category.id} className="flex items-center text-gray-700">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={e => {
                        setSelectedCategories(prev =>
                          e.target.checked
                            ? [...prev, category.id]
                            : prev.filter(id => id !== category.id)
                        );
                      }}
                      className="mr-2 w-4 h-4"
                    />
                    {category.name}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-marianblue mb-4">Pris</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    min={0}
                    value={priceRange.min}
                    onChange={e => setPriceRange(pr => ({ ...pr, min: e.target.value }))}
                    className="w-24 p-2 border rounded"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    min={0}
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={e => setPriceRange(pr => ({ ...pr, max: e.target.value }))}
                    className="w-24 p-2 border rounded"
                  />
                </div>
              </div>
            </div>

            {/* Color Filter */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-marianblue mb-4">Färg</h3>
              <div className="flex flex-col gap-2">
                {colors.map(color => (
                  <label key={color.id} className="flex items-center cursor-pointer gap-2">
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(color.id)}
                      onChange={e => {
                        setSelectedColors(prev =>
                          e.target.checked
                            ? [...prev, color.id]
                            : prev.filter(id => id !== color.id)
                        );
                      }}
                      className="hidden"
                    />
                    <span
                      className={`w-5 h-5 border-1 border-gray-600 rounded-sm flex items-center justify-center transition-all duration-200 ${selectedColors.includes(color.id) ? 'ring-2 ring-mahogany border-mahogany' : ''}`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}>
                    </span>
                    <span className="text-gray-700 text-md">{color.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-6">
              <PageHeading title="Alla produkter" breadcrumbs={[{ name: 'Produkter', path: '/shop' }]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <Link
                  to={`/card/${product.id}`}
                  key={product.id}
                  className="flex flex-col overflow-hidden"
                >
                  {/* Image container with 4:5 ratio */}
                  <div className="relative w-full pb-[125%]">
                    <img
                      className="absolute inset-0 w-full h-full object-cover"
                      src={product.image}
                      alt={product.name}
                    />
                    {product.is_sale && (
                      <div className="absolute top-2 left-2 bg-mahogany text-white text-sm px-2 py-1">
                        SALE
                      </div>
                    )}
                    {product.is_new && (
                      <div className="absolute top-2 left-2 bg-marianblue text-white text-sm px-2 py-1">
                        NEW
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    <p className="text-base font-semibold text-gray-600 truncate">{product.name}</p>
                    <ProductPrice price={product.price} isSale={product.is_sale} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
