import { useState, useEffect } from 'react';
import axios from 'axios';
import { getPokemon, getEvolutionChain } from '../services/pokeapi';

export default function usePokemonDetail(id) {
  const [detail, setDetail] = useState(null);
  const [evolution, setEvolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const p = await getPokemon(id);
        setDetail(p);

        const species = await axios.get(p.species.url);
        const evo = await getEvolutionChain(
          species.data.evolution_chain.url
        );
        setEvolution(evo.chain);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return { detail, evolution, loading, error };
}
