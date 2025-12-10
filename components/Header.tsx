'use client'

import { useAppStore } from '@/lib/store'

export default function Header() {
  const { currentView, setView, mobileMenuOpen, setMobileMenuOpen } = useAppStore()

  const navItems = [
    { id: 'home', label: 'Services' },
    { id: 'ecitizen', label: 'eCitizen' },
    { id: 'web-development', label: 'Web Dev' },
    { id: 'graphic-design', label: 'Design' },
    { id: 'about', label: 'About' },
    { id: 'how-it-works', label: 'Contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-teal-900/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => setView('home')}>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-white">ShivakaLabs</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`nav-link relative ${
                  currentView === item.id
                    ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white after:rounded-full'
                    : 'text-white/80'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="text-white font-medium px-6 py-2 rounded-lg border border-white/30 hover:bg-white/10 transition-all">
              Log in
            </button>
            <button className="bg-white text-teal-900 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition-all">
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 space-y-2 border-t border-white/10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-all ${
                  currentView === item.id
                    ? 'bg-white/20 text-white font-semibold'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 space-y-2">
              <button className="block w-full text-center text-white font-medium px-6 py-3 rounded-lg border border-white/30 hover:bg-white/10 transition-all">
                Log in
              </button>
              <button className="block w-full text-center bg-white text-teal-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-all">
                Sign Up
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
