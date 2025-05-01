import React from 'react'

export default function Pagination({ page, setPage, total }) {
  return (
    <div className="flex justify-center items-center gap-3 mt-6">
      <button
        onClick={()=>setPage(p => Math.max(p-1,1))}
        disabled={page===1}
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white disabled:opacity-50"
      >Prev</button>

      <span className='text-white'>Page {page} of {total}</span>

      <button
        onClick={()=>setPage(p => Math.min(p+1,total))}
        disabled={page===total}
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white disabled:opacity-50"
      >Next</button>
    </div>
  )
}
