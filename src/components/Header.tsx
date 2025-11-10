'use client'

import Link from 'next/link'
import { Search, Heart, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-amber-400/90 to-blue-200/90 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-amber-400/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-amber-900 hover:text-amber-700 transition-all duration-500 transform hover:scale-105">
            <div className="flex flex-col items-start group">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-900 to-blue-600 bg-clip-text text-transparent tracking-wide font-playfair group-hover:tracking-wider transition-all duration-500">
                PT. PRIMARINDO ARGATILE
              </h1>
              <p className="text-sm text-black font-medium font-inter opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 transition-all duration-500">
                PRIMATILES High Quality Ceramic Tiles
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <Link href="/" className="relative text-black hover:text-amber-300 font-medium transition-all duration-300 hover:scale-105 group">
                Produk
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-amber-300 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              </Link>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-amber-100">
                <div className="py-2">
                  <Link href="/roman" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">Roman</Link>
                  <Link href="/mulia" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">Mulia</Link>
                  <Link href="/arwana" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">Arwana</Link>
                </div>
              </div>
            </div>
            <Link href="/inspirasi" className="relative text-black hover:text-amber-300 font-medium transition-all duration-300 hover:scale-105 group">
              Inspirasi
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-amber-300 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
            <Link href="/tentang" className="relative text-black hover:text-amber-300 font-medium transition-all duration-300 hover:scale-105 group">
              Tentang
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-amber-300 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-3 text-white hover:text-amber-300 transition-all duration-300 transform hover:scale-110 hover:rotate-12">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/favorit" className="p-3 text-white hover:text-amber-300 transition-all duration-300 group">
              <Heart className="h-5 w-5 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
            </Link>
            <Link 
              href="/admin" 
              className="hidden md:inline-block px-6 py-2 text-sm font-bold text-stone-800 bg-gradient-to-r from-stone-200 to-amber-200 rounded-full hover:from-stone-300 hover:to-amber-300 transition-all duration-300 shadow-md hover:shadow-lg border border-stone-300"
            >
              Admin
            </Link>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 text-amber-800 hover:text-amber-600 transition-all duration-300 hover:bg-white hover:rounded-full hover:shadow-md"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gradient-to-r from-amber-100 to-orange-100 py-4 border-t-2 border-amber-200">
            <nav className="flex flex-col space-y-3 px-4">
              <div className="space-y-2">
                <Link 
                  href="/" 
                  className="text-amber-800 hover:text-amber-600 font-medium transition-all duration-300 hover:bg-white hover:rounded-lg hover:px-3 hover:py-2 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Produk
                </Link>
                <div className="pl-4 space-y-2">
                  <Link 
                    href="/roman" 
                    className="text-amber-700 hover:text-amber-600 font-medium transition-all duration-300 hover:bg-white hover:rounded-lg hover:px-3 hover:py-2 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Roman
                  </Link>
                  <Link 
                    href="/mulia" 
                    className="text-amber-700 hover:text-amber-600 font-medium transition-all duration-300 hover:bg-white hover:rounded-lg hover:px-3 hover:py-2 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mulia
                  </Link>
                  <Link 
                    href="/arwana" 
                    className="text-amber-700 hover:text-amber-600 font-medium transition-all duration-300 hover:bg-white hover:rounded-lg hover:px-3 hover:py-2 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Arwana
                  </Link>
                </div>
              </div>
              <Link 
                href="/inspirasi" 
                className="text-amber-800 hover:text-amber-600 font-medium transition-all duration-300 hover:bg-white hover:rounded-lg hover:px-3 hover:py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Inspirasi
              </Link>
              <Link 
                href="/tentang" 
                className="text-amber-800 hover:text-amber-600 font-medium transition-all duration-300 hover:bg-white hover:rounded-lg hover:px-3 hover:py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Tentang
              </Link>
              <Link 
                href="/admin" 
                className="px-6 py-3 text-sm font-bold text-amber-900 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full hover:from-amber-300 hover:to-orange-300 transition-all duration-300 shadow-md hover:shadow-lg border border-amber-300 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}