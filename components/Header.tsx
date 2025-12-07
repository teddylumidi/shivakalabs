'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/lib/store'

const menuItems = [
  { id: 'home', label: 'Home', fullLabel: 'Home' },
  { id: 'about', label: 'About', fullLabel: 'About Us' },
  { id: 'ecitizen', label: 'eCitizen', fullLabel: 'eCitizen' },
  { id: 'web-development', label: 'Web', fullLabel: 'Web Development' },
  { id: 'graphic-design', label: 'Design', fullLabel: 'Graphic Design' },
  { id: 'digital-marketing', label: 'Marketing', fullLabel: 'Digital Marketing' },
  { id: 'cv-writing', label: 'CV', fullLabel: 'CV & Cover Letter' },
  { id: 'documents-gen', label: 'DocumentsGen', fullLabel: 'DocumentsGen' },
  { id: 'how-it-works', label: 'How It Works', fullLabel: 'How It Works' },
]

export default function Header() {
  const { currentView, setView, mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useAppStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <header className="bg-dark-secondary shadow-lg sticky top-0 z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded bg-gold flex items-center justify-center font-bold text-black">S</div>
          <div>
            <h1 className="text-xl font-bold text-white">Shivakalabs</h1>
            <p className="text-xs text-gray-400">Digital Excellence</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex space-x-2 md:space-x-4 lg:space-x-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`nav-tab nav-underline text-xs md:text-sm font-bold transition relative pb-1 group ${
                currentView === item.id ? 'text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.label}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-gold transition-all ${
                  currentView === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>
          ))}
        </nav>

        {/* Mobile Menu Icon */}
        <button
          onClick={toggleMobileMenu}
          className="sm:hidden text-white p-2"
          aria-label="Toggle mobile menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-4 py-3 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id)
                  closeMobileMenu()
                }}
                className={`block w-full text-left px-3 py-2 rounded font-bold transition ${
                  currentView === item.id
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {item.fullLabel}
              </button>
            ))}
            <button
              onClick={() => {
                setView('terms')
                closeMobileMenu()
              }}
              className="block w-full text-left px-3 py-2 rounded text-gray-300 hover:bg-gray-700 font-bold"
            >
              Legal
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
