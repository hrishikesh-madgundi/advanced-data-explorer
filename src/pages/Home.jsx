import React, { useState, useEffect, useMemo } from 'react'
import Filters from '../components/Filters'
import Pagination from '../components/Pagination'
import PokemonCard from '../components/PokemonCard'
import { listPokemons, getPokemon } from '../services/pokeapi'
import { sortHelpers } from '../utils/helpers'

export default function Home() {
  const [all, setAll] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Controls
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [sortOpt, setSortOpt] = useState('byIdAsc')
  const [types, setTypes] = useState([])
  const [search, setSearch] = useState('')

  // Fetch all Pokémon
  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const { results } = await listPokemons(0, 150)
        const details = await Promise.all(results.map(p => getPokemon(p.name)))
        setAll(details)
      } catch (e) {
        setError('Failed to load Pokémon.')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  // Apply filters, sort, search
  const filtered = useMemo(() => {
    return all
      .filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) &&
        (types.length === 0 || types.every(t => p.types.map(x => x.type.name).includes(t)))
      )
      .sort(sortHelpers[sortOpt])
  }, [all, search, types, sortOpt])

  const pageCount = Math.ceil(filtered.length / perPage)
  const view = useMemo(() => {
    const start = (page - 1) * perPage
    return filtered.slice(start, start + perPage)
  }, [filtered, page, perPage])

  if (loading) return <p className="text-center text-white">Loading Pokémon…</p>
  if (error) return <p className="text-center text-red-600">{error}</p>

  return (
    <div>
      <Filters
        search={search}
        setSearch={setSearch}
        types={types}
        setTypes={setTypes}
        perPage={perPage}
        setPerPage={setPerPage}
        sortOpt={sortOpt}
        setSortOpt={setSortOpt}
      />

      {view.length === 0 ? (
        <p className="text-center mt-6">No Pokémon match.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-6">
            {view.map(p => (
              <PokemonCard key={p.id} pokemon={p} />
            ))}
          </div>
          <Pagination page={page} setPage={setPage} total={pageCount} />
        </>
      )}
    </div>
  )
}
