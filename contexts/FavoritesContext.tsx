import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

const FAVORITES_KEY = "palettegen_favorites";

export interface Favorite {
  hex: string;
  timestamp: number;
}

interface FavoritesContextValue {
  favorites: Favorite[];
  addFavorite: (hex: string) => void;
  removeFavorite: (hex: string) => void;
  isFavorited: (hex: string) => boolean;
  clearAll: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorited: () => false,
  clearAll: () => {},
});

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch {}
  }, []);

  const persist = (next: Favorite[]) => {
    setFavorites(next);
    try { localStorage.setItem(FAVORITES_KEY, JSON.stringify(next)); } catch {}
  };

  const addFavorite = useCallback((hex: string) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.hex === hex)) return prev;
      const next = [{ hex, timestamp: Date.now() }, ...prev];
      try { localStorage.setItem(FAVORITES_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const removeFavorite = useCallback((hex: string) => {
    setFavorites((prev) => {
      const next = prev.filter((f) => f.hex !== hex);
      try { localStorage.setItem(FAVORITES_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const isFavorited = useCallback((hex: string) => {
    return favorites.some((f) => f.hex === hex);
  }, [favorites]);

  const clearAll = useCallback(() => {
    persist([]);
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorited, clearAll }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
