import React from 'react';
import { Link } from 'react-router-dom';
import ProductPrice from './ProductPrice';
import FavoriteButton from './FavoriteButton';

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

interface ProductCardProps {
  product: Product;
  showBadges?: boolean;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showBadges = true,
  className = ""
}) => {
  return (
    <Link
      to={`/card/${product.id}`}
      className={`flex flex-col overflow-hidden group ${className}`}
    >
      {/* Image container with 4:5 ratio */}
      <div className="relative w-full pb-[125%]">
        <img
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
        {/* Badges */}
        {showBadges && (
          <>
            {product.is_sale && (
              <div className="absolute top-2 left-2 bg-mahogany text-white text-sm px-2 py-1 rounded">
                SALE
              </div>
            )}
            {product.is_new && !product.is_sale && (
              <div className="absolute top-2 left-2 bg-marianblue text-white text-sm px-2 py-1 rounded">
                NEW
              </div>
            )}
            {product.is_new && product.is_sale && (
              <div className="absolute top-2 right-2 bg-marianblue text-white text-sm px-2 py-1 rounded">
                NEW
              </div>
            )}
          </>
        )}

        {/* Favorite button */}
        <FavoriteButton productId={product.id} />
      </div>

      {/* Product details */}
      <div className="mt-4 flex flex-col gap-2">
        <p className="text-base font-semibold text-gray-600 truncate group-hover:text-marianblue transition-colors duration-200">
          {product.name}
        </p>        <ProductPrice
          price={product.price}
          isSale={product.is_sale}
          discountPrice={product.discount_price ?? undefined}
        />
      </div>
    </Link>
  );
};

export default ProductCard;
