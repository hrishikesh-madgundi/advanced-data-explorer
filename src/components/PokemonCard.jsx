// src/components/PokemonCard.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites'
import { Heart, HeartFill } from 'react-bootstrap-icons'

export default React.memo(function PokemonCard({ pokemon }) {
  const navigate = useNavigate()
  const { favorites, toggleFavorite } = useFavorites()
  const isFav = favorites.some(p => p.id === pokemon.id)

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-all">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-36 h-36 mb-4"
      />

      <h3 className="capitalize text-2xl font-semibold text-gray-700">
        {pokemon.name}
      </h3>
      <p className="text-gray-900 font-medium mb-2">#{pokemon.id}</p>

      {/* Types / Categories */}
      <div className="flex gap-2 mb-4">
        {pokemon.types.map(t => (
          <span
            key={t.type.name}
            className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm capitalize"
          >
            {t.type.name}
          </span>
        ))}
      </div>

      {/* Favorite Heart */}
      <button
        onClick={() => toggleFavorite(pokemon)}
        className="mb-4 focus:outline-none"
      >
        {isFav ? (
          <HeartFill className="text-red-600 w-6 h-6" />
        ) : (
          <Heart className="text-gray-400 w-6 h-6 hover:text-red-600" />
        )}
      </button>

      {/* Details Button */}
      <button
        onClick={() => navigate(`/pokemon/${pokemon.name}`)}
        className="mt-auto px-6 py-2 bg-black text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Details
      </button>
    </div>
  )
})
