import React from 'react';
import PokemonCard from '../components/PokemonCard';
import { useFavorites } from '../hooks/useFavorites';

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      <h2 className="text-2xl text-white font-bold mb-4">My Favorite Pokémon</h2>
      {favorites.length === 0 ? (
        <div className="text-center">You haven’t added any favorites yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
