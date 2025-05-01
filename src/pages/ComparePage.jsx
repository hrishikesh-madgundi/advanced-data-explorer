import React, { useState, useEffect } from 'react'
import { listPokemons, getPokemon } from '../services/pokeapi'

export default function ComparePage() {
  const [allNames, setAllNames] = useState([])
  const [sel, setSel] = useState({ a: '', b: '' })
  const [dataA, setDataA] = useState(null)
  const [dataB, setDataB] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    listPokemons(0,150)
      .then(res => setAllNames(res.results.map(p=>p.name)))
      .catch(()=>setError('Failed to load names'))
  }, [])

  useEffect(() => {
    if (sel.a && sel.b) {
      Promise.all([getPokemon(sel.a), getPokemon(sel.b)])
        .then(([pa, pb]) => {
          setDataA(pa)
          setDataB(pb)
          setError('')
        })
        .catch(()=>setError('Failed to fetch Pokémon details'))
    }
  }, [sel])

  const randomize = () => {
    const rand = allNames[Math.floor(Math.random()*allNames.length)]
    setSel(prev => ({ ...prev, a: rand }))
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl text-white font-bold">Compare Pokémon Stats</h2>
      {error && <p className="text-red-600">{error}</p>}

      <div className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">First Pokémon</label>
          <select
            value={sel.a}
            onChange={e=>setSel(prev=>({ ...prev, a: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300"
          >
            <option value="">Select one…</option>
            {allNames.map(n=>(
              <option key={n} value={n}>{n.charAt(0).toUpperCase()+n.slice(1)}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Second Pokémon</label>
          <select
            value={sel.b}
            onChange={e=>setSel(prev=>({ ...prev, b: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300"
          >
            <option value="">Select one…</option>
            {allNames.map(n=>(
              <option key={n} value={n}>{n.charAt(0).toUpperCase()+n.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={randomize}
          className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >Random First</button>
        <button
          onClick={()=>setSel({ a:'', b:'' })}
          className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >Reset</button>
      </div>

      {(dataA && dataB) && (
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="text-center">
              <img src={dataA.sprites.front_default} alt={dataA.name} className="w-24 h-24 mx-auto" />
              <p className="mt-2 font-semibold capitalize">{dataA.name}</p>
            </div>
            <div className="text-gray-500 font-bold">VS</div>
            <div className="text-center">
              <img src={dataB.sprites.front_default} alt={dataB.name} className="w-24 h-24 mx-auto" />
              <p className="mt-2 font-semibold capitalize">{dataB.name}</p>
            </div>
          </div>
          <table className="w-full table-auto text-left">
            <thead>
              <tr>
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2">{dataA.name.toUpperCase()}</th>
                <th className="px-4 py-2">{dataB.name.toUpperCase()}</th>
              </tr>
            </thead>
            <tbody>
              {dataA.stats.map((s,i)=>(
                <tr key={s.stat.name} className="border-t">
                  <td className="px-4 py-2 capitalize">{s.stat.name}</td>
                  <td className="px-4 py-2">{s.base_stat}</td>
                  <td className="px-4 py-2">{dataB.stats[i].base_stat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
