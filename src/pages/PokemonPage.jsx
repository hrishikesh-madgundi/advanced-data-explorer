import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPokemon, getEvolutionChain } from '../services/pokeapi'

export default function PokemonPage() {
  const { name } = useParams()
  const [poke, setPoke] = useState()
  const [evo, setEvo] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const data = await getPokemon(name)
        setPoke(data)

        // evolution
        const species = await fetch(data.species.url).then(r=>r.json())
        const chain = await getEvolutionChain(species.evolution_chain.url)
        // flatten
        const flat = []
        let node = chain.chain
        while (node) {
          flat.push(node.species.name)
          node = node.evolves_to[0]
        }
        setEvo(flat)
      } catch (e) {
        setError('Could not load details.')
      } finally {
        setLoading(false)
      }
    })()
  }, [name])

  if (loading) return <p className="text-center">Loading…</p>
  if (error ) return <p className="text-center text-red-600">{error}</p>
  if (!poke ) return <p className="text-center">Not found.</p>

  return (
    <div className="space-y-6">
      <Link to="/" className="text-blue-600 hover:underline">&larr; Back</Link>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <img src={poke.sprites.front_default} alt={poke.name} className="w-32 h-32"/>
        <h2 className="text-4xl font-bold capitalize">{poke.name} #{poke.id}</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Stats</h3>
          <ul className="list-disc list-inside">
            {poke.stats.map(s=>(
              <li key={s.stat.name}>{s.stat.name}: {s.base_stat}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Abilities</h3>
          <ul className="list-disc list-inside">
            {poke.abilities.map(a=>(
              <li key={a.ability.name}>{a.ability.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Moves</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-auto">
          {poke.moves.map(m=>(
            <span
              key={m.move.name}
              className="px-2 py-1 bg-gray-200 rounded-full text-sm capitalize"
            >{m.move.name}</span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Evolution Chain</h3>
        <div className="flex gap-2">
          {evo.map(n=>(
            <span
              key={n}
              className="px-2 py-1 bg-red-200 text-red-800 rounded-full capitalize"
            >{n}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
