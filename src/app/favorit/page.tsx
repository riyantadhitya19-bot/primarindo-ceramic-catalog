'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Trash2 } from 'lucide-react'
import { CeramicProduct } from '@/types/product'
import { useFavorites } from '@/hooks/useFavorites'

export default function FavoritesPage() {
  const { favorites, toggleFavorite, clearFavorites } = useFavorites()
  const [favoriteProducts, setFavoriteProducts] = useState<CeramicProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      if (favorites.length === 0) {
        setFavoriteProducts([])
        setLoading(false)
        return
      }

      try {
        const response = await fetch('/api/products/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productIds: favorites }),
        })

        if (response.ok) {
          const data = await response.json()
          setFavoriteProducts(data.products)
        }
      } catch (error) {
        console.error('Error fetching favorite products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFavoriteProducts()
  }, [favorites])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Favorit Saya
            </h1>
            <p className="text-gray-600">
              {favoriteProducts.length} produk dalam daftar favorit
            </p>
          </div>
          
          {favoriteProducts.length > 0 && (
            <button
              onClick={clearFavorites}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Hapus Semua</span>
            </button>
          )}
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Belum ada produk favorit
            </h3>
            <p className="text-gray-600 mb-6">
              Tambahkan produk ke favorit untuk melihatnya di sini
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Jelajahi Produk
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-200">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.nama}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <span className="text-sm">Gambar tidak tersedia</span>
                    </div>
                  )}
                  
                  {/* Remove from Favorites Button */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                  >
                    <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                    {product.nama}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Kode: {product.kode_produk}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                      {product.ukuran}
                    </span>
                    <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                      {product.finish}
                    </span>
                    {product.tipe && (
                      <span className="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">
                        {product.tipe}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/produk/${product.id}`}
                    className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}