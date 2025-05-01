import { useState, useEffect, useCallback } from 'react';
import { listPokemons, getPokemon } from '../services/pokeapi';

export default function usePokemonList(page, perPage, filters, sortFn) {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      const offset = (page - 1) * perPage;
      const listRes = await listPokemons(offset, perPage);
      setCount(listRes.count);

      const details = await Promise.all(
        listRes.results.map((p) => getPokemon(p.name))
      );

      let items = details;
      if (filters.length) {
        items = items.filter((p) =>
          filters.every((t) => p.types.map(x => x.type.name).includes(t))
        );
      }
      if (sortFn) items.sort(sortFn);

      setData(items);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [page, perPage, filters, sortFn]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return { data, count, loading, error };
}
