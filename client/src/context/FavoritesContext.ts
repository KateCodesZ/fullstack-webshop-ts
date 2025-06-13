import { createContext } from 'react';

export interface FavoritesContextType {
  favorites: number[];
  addToFavorites: (productId: number) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  clearFavorites: () => void;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);
