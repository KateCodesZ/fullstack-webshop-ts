import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SearchIcon from '../assets/icons/Search.svg?react';
import { useDebounce } from '../hooks/useDebounce';

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  salePrice?: string | null;
  is_sale: boolean;
}

interface SearchBarProps {
  fullWidth?: boolean;
  onResultClick?: () => void;
}

// DRY: Extract shared class names for UI elements
const getInputClass = (fullWidth?: boolean) =>
  `pl-10 pr-4 py-2 ${fullWidth ? 'w-full' : 'w-40 sm:w-48 lg:w-64'} text-sm focus:outline-none focus:ring-2 focus:ring-mahogany/50 focus:border-mahogany bg-transparent`;
const iconClass =
  'absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 pointer-events-none';
const clearBtnClass =
  'absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600';
const dropdownClass =
  'absolute z-50 top-full left-0 w-full bg-white mt-2 overflow-hidden';
const listClass =
  'divide-y divide-gray-100 max-h-80 overflow-y-auto';
const listItemClass =
  'hover:bg-gray-50 transition';
const linkClass =
  'flex items-center px-4 py-3 space-x-4';
const imgClass =
  'w-10 h-14 object-cover';
const nameClass =
  'text-sm font-medium';
const priceClass =
  'text-xs text-gray-700';
const salePriceClass =
  'text-mahogany font-semibold';
const lineThroughClass =
  'line-through mr-1';

export default function SearchBar({ fullWidth = false, onResultClick }: SearchBarProps = {}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  // Auto-focus when fullWidth (mobile) is enabled
  useEffect(() => {
    if (fullWidth && inputRef.current) {
      inputRef.current.focus();
    }
  }, [fullWidth]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.trim().length < 2) {
        setResults([]);
        return;
      }
      try {
        const res = await axios.get(`/api/products/search?q=${encodeURIComponent(debouncedQuery)}`);
        setResults(res.data); // Always use res.data, backend returns an array
      } catch {
        setResults([]);
      }
    };
    fetchResults();
  }, [debouncedQuery]);

  const handleClear = () => {
    setQuery('');
    setResults([]);
    inputRef.current?.focus();
  };  return (
    <div className="relative" ref={containerRef}>
      <input
        ref={inputRef}
        type="text"
        className={getInputClass(fullWidth)}
        placeholder="Sök..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        aria-label="Search input"
      />
      <span className={iconClass}>
        <SearchIcon />
      </span>{query && (
        <button
          onClick={handleClear}
          className={clearBtnClass}
          tabIndex={-1}
          type="button"
          aria-label="Rensa sök"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      {isOpen && results.length > 0 && (
        <div className={dropdownClass}>
          <ul className={listClass}>
            {results.map((product) => (
              <li key={product.id} className={listItemClass}>
                <a
                  href={`/card/${product.id}`}
                  className={linkClass}
                  onClick={onResultClick}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className={imgClass}
                  />
                  <div className="flex-1">
                    <p className={nameClass}>{product.name}</p>                    <div className={priceClass}>
                      {product.salePrice ? (
                        <>
                          <span className={lineThroughClass}>{parseFloat(product.price).toFixed(0)} kr</span>
                          <span className={salePriceClass}>{parseFloat(product.salePrice).toFixed(0)} kr</span>
                        </>
                      ) : (
                        <span>{parseFloat(product.price).toFixed(0)} kr</span>
                      )}
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
