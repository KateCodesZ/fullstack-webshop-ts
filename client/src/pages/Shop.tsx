import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
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
  discount_price?: number;
  effective_price?: number;
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
  const [showFilters, setShowFilters] = useState(false); // State for mobile filter visibility
  const [showSort, setShowSort] = useState(false); // State for mobile sort modal
  const [sortOption, setSortOption] = useState(''); // State for sorting
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const showNew = params.get('new') === '1';

  // Fetch products, categories, and colors
  useEffect(() => {
    axios.get<Product[]>('/api/products').then(res => setProducts(res.data));
    axios.get<Category[]>('/api/products/categories').then(res => setCategories(res.data));
    axios.get<Color[]>('/api/products/colors').then(res => setColors(res.data));
  }, []);

  // Set selectedCategories from URL on mount and when location.search changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryName = params.get('category');
    if (categoryName && categories.length > 0) {
      const found = categories.find(
        c => c.name.toLowerCase() === categoryName.toLowerCase()
      );
      if (found) {
        setSelectedCategories([found.id]);
      }
    } else if (!categoryName) {
      setSelectedCategories([]);
    }
  }, [location.search, categories]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    let result = products.filter(product => {
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category_id);
      const matchesColor =
        selectedColors.length === 0 || (product.color_id !== undefined && selectedColors.includes(product.color_id));
      const price = product.effective_price ?? product.price;
      const matchesPrice =
        (!priceRange.min || price >= Number(priceRange.min)) &&
        (!priceRange.max || price <= Number(priceRange.max));
      return matchesCategory && matchesColor && matchesPrice;
    });

    if (showNew) {
      result = result.filter(product => product.is_new);
    }

    // Apply filter for 'new' and 'sale' sort options
    if (sortOption === 'new') {
      result = result.filter(product => product.is_new);
    } else if (sortOption === 'sale') {
      result = result.filter(product => product.is_sale);
    }

    // Sort
    if (sortOption === 'price-low') {
      result = [...result].sort((a, b) => (a.effective_price ?? a.price) - (b.effective_price ?? a.price));
    } else if (sortOption === 'price-high') {
      result = [...result].sort((a, b) => (b.effective_price ?? b.price) - (a.effective_price ?? a.price));
    }

    return result;
  }, [products, selectedCategories, selectedColors, priceRange, sortOption, showNew]);

  // Clear filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setPriceRange({ min: '', max: '' });
  };

  useEffect(() => {
    if (showFilters || showSort) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [showFilters, showSort]);

  // Find the selected category name for heading and breadcrumbs
  const categoryName = params.get('category');
  const selectedCategoryObj = categoryName && categories.length > 0
    ? categories.find(c => c.name.toLowerCase() === categoryName.toLowerCase())
    : null;

  return (
    <div className="py-4">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-full lg:w-64 flex-shrink-0">
            <div className="flex justify-between items-center mb-6 md:mt-24">
              <h2 className="text-xl font-semibold text-marianblue">Filter</h2>
              <button
                className="text-sm text-gray-700 hover:text-marianblue"
                onClick={clearFilters}
              >
                Rensa filter
              </button>
            </div>

            {/* Categories with radio inputs (single select) */}
            <div className="mb-8">
              <details className="group" open>
                <summary className="text-xl font-semibold text-marianblue mb-4 cursor-pointer flex items-center select-none">
                  Kategori
                  <svg className="ml-2 w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="flex flex-col gap-2 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sidebar-category"
                      value="all"
                      checked={selectedCategories.length === 0}
                      onChange={() => setSelectedCategories([])}
                      className="accent-marianblue"
                    />
                    Alla
                  </label>
                  {categories.map(category => (
                    <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="sidebar-category"
                        value={category.id}
                        checked={selectedCategories.length === 1 && selectedCategories[0] === category.id}
                        onChange={() => setSelectedCategories([category.id])}
                        className="accent-marianblue"
                      />
                      {category.name}
                    </label>
                  ))}
                </div>
              </details>
            </div>

            {/* Price Range with Dropdown */}
            <div className="mb-8">
              <details className="group">
                <summary className="text-xl font-semibold text-marianblue mb-4 cursor-pointer flex items-center select-none">
                  Pris
                  <svg className="ml-2 w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="space-y-4 mt-2">
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
              </details>
            </div>

            {/* Color Filter with Dropdown */}
            <div className="mb-8">
              <details className="group">
                <summary className="text-xl font-semibold text-marianblue mb-4 cursor-pointer flex items-center select-none">
                  Färg
                  <svg className="ml-2 w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="flex flex-col gap-2 mt-2">
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
                        className={`w-5 h-5 border-2 border-gray-600 rounded-sm flex items-center justify-center transition-all duration-200 ${selectedColors.includes(color.id) ? 'ring-2 ring-mahogany border-mahogany' : ''}`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}>
                        {selectedColors.includes(color.id) && (
                          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                            <path d="M5 10.5L9 14.5L15 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </span>
                      <span className="text-gray-700 text-md">{color.name}</span>
                    </label>
                  ))}
                </div>
              </details>
            </div>

            {/* Sortering Dropdown (as radio inputs) */}
            <div className="mb-8">
              <details className="group" open>
                <summary className="text-xl font-semibold text-marianblue mb-4 cursor-pointer flex items-center select-none">
                  Sortering
                  <svg className="ml-2 w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="flex flex-col gap-2 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sidebar-sort"
                      value=""
                      checked={sortOption === ''}
                      onChange={() => setSortOption('')}
                      className="accent-marianblue"
                    />
                    Standard
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sidebar-sort"
                      value="new"
                      checked={sortOption === 'new'}
                      onChange={() => setSortOption('new')}
                      className="accent-marianblue"
                    />
                    Nyinkommet
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sidebar-sort"
                      value="price-high"
                      checked={sortOption === 'price-high'}
                      onChange={() => setSortOption('price-high')}
                      className="accent-marianblue"
                    />
                    Högsta pris
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sidebar-sort"
                      value="price-low"
                      checked={sortOption === 'price-low'}
                      onChange={() => setSortOption('price-low')}
                      className="accent-marianblue"
                    />
                    Lägsta pris
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sidebar-sort"
                      value="sale"
                      checked={sortOption === 'sale'}
                      onChange={() => setSortOption('sale')}
                      className="accent-marianblue"
                    />
                    Sänkt pris
                  </label>
                </div>
              </details>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-6">
              <PageHeading
                title={selectedCategoryObj ? selectedCategoryObj.name : "Alla produkter"}
                breadcrumbs={selectedCategoryObj ? [
                  { name: 'Produkter', path: '/shop' },
                  { name: selectedCategoryObj.name, path: `/shop?category=${encodeURIComponent(selectedCategoryObj.name.toLowerCase())}` }
                ] : [
                  { name: 'Produkter', path: '/shop' }
                ]}
              />
            </div>

            {/* Mobile/Tablet Filter and Sort Bar */}
            <div className="lg:hidden flex flex-col gap-2 mb-2 w-full max-w-full sticky top-[56px] z-30 bg-white bg-opacity-95 backdrop-blur-sm">
              <div className="flex w-full max-w-screen-lg">
                <button
                  className="flex-shrink min-w-0 flex items-center gap-2 text-base font-semibold text-marianblue border border-gray-300 rounded-l px-4 py-2 w-1/2 justify-center"
                  onClick={() => {
                    setShowFilters(true);
                    setShowSort(false);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                  </svg>
                  Filter
                </button>
                <button
                  className="flex-shrink min-w-0 flex items-center gap-2 text-base font-semibold text-marianblue border border-gray-300 rounded-r px-4 py-2 w-1/2 justify-center"
                  onClick={() => {
                    setShowSort(true);
                    setShowFilters(false);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4zm0 7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2zm0 7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2z" />
                  </svg>
                  Sortering
                </button>
              </div>
            </div>

            {/* Product count */}
            <div className="w-full max-w-screen-sm mb-4">
              <span className="block text-sm text-gray-600 text-start">Visar {filteredProducts.length} av {products.length} produkter</span>
            </div>

            {/* Mobile Filters Panel */}
            {showFilters && (
              <div className="fixed left-0 right-0 top-[64px] z-40 bg-white bg-opacity-95 flex justify-center items-start h-[calc(100vh-64px)]">
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white relative flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto p-4 pb-32">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold text-marianblue">Filter</h2>
                      <button
                        className="text-gray-700"
                        onClick={() => setShowFilters(false)}
                        aria-label="Stäng filter"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Pris */}
                    <details className="group mb-4" open>
                      <summary className="text-base font-semibold text-marianblue mb-2 cursor-pointer flex items-center select-none">
                        Pris
                        <svg className="ml-2 w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                      </summary>
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="number"
                          placeholder="Min"
                          min={0}
                          value={priceRange.min}
                          onChange={e => setPriceRange(pr => ({ ...pr, min: (e.target as HTMLInputElement).value }))}
                          className="w-full p-2 border rounded text-sm"
                          />
                        <span className="text-gray-500">-</span>
                        <input
                          type="number"
                          min={0}
                          placeholder="Max"
                          value={priceRange.max}
                          onChange={e => setPriceRange(pr => ({ ...pr, max: (e.target as HTMLInputElement).value }))}
                          className="w-full p-2 border rounded text-sm"
                          />
                      </div>
                    </details>

                    {/* Färg */}
                    <details className="group mb-4" open>
                      <summary className="text-base font-semibold text-marianblue mb-2 cursor-pointer flex items-center select-none">
                        Färg
                        <svg className="ml-2 w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                      </summary>
                      <div className="grid grid-cols-3 gap-2 mt-2">
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
                            <div className="flex flex-col items-start">
                              <span
                                className={`w-5 h-5 border rounded flex items-center justify-center ${selectedColors.includes(color.id) ? 'ring-2 ring-mahogany' : 'border-gray-300'}`}
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                              />
                              <span className="text-xs text-gray-700 mt-1">{color.name}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </details>

                    {/* Kategori */}
                    <details className="group mb-4" open>
                      <summary className="text-base font-semibold text-marianblue mb-2 cursor-pointer flex items-center select-none">
                        Kategori
                        <svg className="ml-2 w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                      </summary>
                      <div className="space-y-2 mt-2">
                        {categories.map(category => (
                          <label key={category.id} className="flex items-center text-sm text-gray-700">
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
                    </details>
                  </div>
                  <div className="fixed left-1/2 -translate-x-1/2 bottom-0 w-full max-w-xs sm:max-w-sm md:max-w-md bg-white pt-2 pb-4 px-4 z-50">
                    <button
                      className="w-full py-2 px-4 bg-mahogany text-white rounded text-md mb-2"
                      onClick={() => setShowFilters(false)}
                    >
                      Visa produkter
                    </button>
                    <button
                      className="w-full py-2 px-4 bg-marianblue text-white rounded text-md"
                      onClick={clearFilters}
                    >
                      Rensa filter
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Sort Panel */}
            {showSort && (
              <div className="fixed left-0 right-0 top-[64px] z-40 bg-white bg-opacity-95 flex justify-center items-start h-[calc(100vh-64px)]">
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white relative flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto p-4 pb-32">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold text-marianblue">Sortering</h2>
                      <button
                        className="text-gray-700"
                        onClick={() => setShowSort(false)}
                        aria-label="Stäng sortering"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <form className="flex flex-col gap-3" onSubmit={e => { e.preventDefault(); setShowSort(false); }}>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="sort"
                          value="new"
                          checked={sortOption === 'new'}
                          onChange={() => setSortOption('new')}
                          className="accent-marianblue"
                        />
                        Nyinkommet
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="sort"
                          value="price-high"
                          checked={sortOption === 'price-high'}
                          onChange={() => setSortOption('price-high')}
                          className="accent-marianblue"
                        />
                        Högsta pris
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="sort"
                          value="price-low"
                          checked={sortOption === 'price-low'}
                          onChange={() => setSortOption('price-low')}
                          className="accent-marianblue"
                        />
                        Lägsta pris
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="sort"
                          value="sale"
                          checked={sortOption === 'sale'}
                          onChange={() => setSortOption('sale')}
                          className="accent-marianblue"
                        />
                        Sänkt pris
                      </label>
                    </form>
                  </div>
                  <div className="fixed left-1/2 -translate-x-1/2 bottom-0 w-full max-w-xs sm:max-w-sm md:max-w-md bg-white pt-2 pb-4 px-4 z-50">
                    <button
                      type="submit"
                      className="w-full py-2 px-4 bg-marianblue text-white rounded text-md mb-2"
                    >
                      Visa produkter
                    </button>
                    <button
                      type="button"
                      className="w-full py-2 px-4 bg-mahogany text-white rounded text-md"
                      onClick={() => setSortOption('')}
                    >
                      Rensa sortering
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 md:gap-8">
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
                    <ProductPrice price={product.price} isSale={product.is_sale} discountPrice={product.discount_price} />
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
