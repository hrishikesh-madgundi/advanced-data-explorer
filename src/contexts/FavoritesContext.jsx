import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // 1. Load initial favorites from localStorage (or empty array)
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  // 2. Whenever favorites update, write them back to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (poke) => {
    setFavorites((current) => {
      const exists = current.find((p) => p.id === poke.id);
      if (exists) {
        // remove
        return current.filter((p) => p.id !== poke.id);
      } else {
        // add
        return [...current, poke];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
