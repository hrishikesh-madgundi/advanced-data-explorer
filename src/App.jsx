import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import PokemonPage from './pages/PokemonPage'
import FavoritesPage from './pages/FavoritesPage'
import ComparePage from './pages/ComparePage'
import { FavoritesProvider } from './contexts/FavoritesContext'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <FavoritesProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-800">
          <header className="bg-black border-gray-600 border-4 border-dashed rounded-2xl m-2">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/361/361998.png"
                  className="w-12 h-12 animate-bounce"
                  alt="Logo"
                />
                <Link to="/" className="text-2xl font-bold text-white">
                  Pokémon Data Explorer
                </Link>
              </div>

              {/* Hamburger button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden text-white focus:outline-none"
              >
                {menuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>

              {/* Navigation links */}
              <nav className={`flex-col md:flex md:flex-row md:space-x-4 ${menuOpen ? 'flex' : 'hidden'} md:items-center`}>
                <Link to="/favorites" className="text-xl text-white hover:underline py-1 md:py-0">
                  Favorites
                </Link>
                <Link to="/compare" className="text-xl text-white hover:underline py-1 md:py-0">
                  Compare
                </Link>
              </nav>
            </div>
          </header>

          <main className="flex-1 container mx-auto px-6 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pokemon/:name" element={<PokemonPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/compare" element={<ComparePage />} />
            </Routes>
          </main>

          <footer className="bg-black text-center py-4 text-sm text-white">
            &copy; {new Date().getFullYear()} Advanced Pokémon Explorer
          </footer>
        </div>
      </Router>
    </FavoritesProvider>
  )
}
