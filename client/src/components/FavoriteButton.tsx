import HeartIcon from '../assets/icons/Heart.svg?react';
import { useFavorites } from '../hooks/useFavorites';

interface FavoriteButtonProps {
  productId: number;
  className?: string;
}

export default function FavoriteButton({ productId, className = '' }: FavoriteButtonProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const isProductFavorite = isFavorite(productId);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the heart
    e.stopPropagation(); // Stop event bubbling

    if (isProductFavorite) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productId);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`
        absolute top-2 right-2 z-10
        w-8 h-8
        bg-white
        rounded-full
        flex items-center justify-center
        transition-all duration-200
        shadow-sm hover:shadow-md
        group
        ${className}
      `}
      aria-label={isProductFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <HeartIcon
        className={`
          w-5 h-5
          transition-colors duration-200
          ${isProductFavorite
            ? 'text-mahogany fill-mahogany'
            : 'text-marianblue group-hover:text-mahogany'
          }
        `}
      />
    </button>
  );
}
