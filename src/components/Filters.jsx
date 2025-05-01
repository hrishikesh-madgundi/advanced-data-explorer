import React, { useState, useRef, useEffect } from 'react'

const ALL_TYPES = [
  'normal','fire','water','grass','electric','ice',
  'fighting','poison','ground','flying','psychic','bug',
  'rock','ghost','dragon','dark','steel','fairy'
]

export default function Filters({
  search, setSearch,
  types, setTypes,
  perPage, setPerPage,
  sortOpt, setSortOpt
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef()

  // Close dropdown on click outside
  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  const toggleType = (type) => {
    setTypes(prev => prev.includes(type)
      ? prev.filter(t => t !== type)
      : [...prev, type]
    )
  }

  return (
    <div className="bg-white border-gray-600 border-2 border-dashed p-4 rounded-lg shadow flex flex-wrap gap-4 items-end">
      {/* Search */}
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
        <input
          type="text"
          placeholder="e.g. Pikachu"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:black focus:ring-black focus:outline-none"
        />
      </div>

      {/* Type Dropdown */}
      <div className="relative flex-1 min-w-[200px]" ref={ref}>
        <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Type</label>
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full p-2 border border-gray-300 rounded-lg flex justify-between items-center focus:ring-2 focus:ring-red-300"
        >
          <span>{types.length ? types.map(t => t.charAt(0).toUpperCase()+t.slice(1)).join(', ') : 'Select types'}</span>
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
            {ALL_TYPES.map(type => (
              <label key={type} className="flex items-center px-3 py-2 hover:bg-gray-100">
                <input
                  type="checkbox"
                  checked={types.includes(type)}
                  onChange={() => toggleType(type)}
                  className="mr-2"
                />
                <span className="capitalize">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Sort */}
      <div className="w-40">
        <label className="block text-sm font-medium text-gray-700 mb-1">Sort</label>
        <select
          value={sortOpt}
          onChange={e => setSortOpt(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300"
        >
          <option value="byIdAsc">ID ↑</option>
          <option value="byIdDesc">ID ↓</option>
          <option value="byNameAsc">Name A–Z</option>
          <option value="byNameDesc">Name Z–A</option>
        </select>
      </div>

      {/* Page Size */}
      <div className="w-32">
        <label className="block text-sm font-medium text-gray-700 mb-1">Per Page</label>
        <select
          value={perPage}
          onChange={e => setPerPage(+e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300"
        >
          {[10,20,50].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
