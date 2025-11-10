'use client'

import { useState, useEffect } from 'react'

const FAVORITES_KEY = 'ceramic-catalog-favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(FAVORITES_KEY)
      if (stored) {
        setFavorites(JSON.parse(stored))
      }
    }
  }, [])

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
      
      if (typeof window !== 'undefined') {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites))
      }
      
      return newFavorites
    })
  }

  const isFavorite = (productId: string) => favorites.includes(productId)

  const clearFavorites = () => {
    setFavorites([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem(FAVORITES_KEY)
    }
  }

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoritesCount: favorites.length
  }
}