'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Search } from 'lucide-react'
import { CeramicProduct } from '@/types/product'
import { useFavorites } from '@/hooks/useFavorites'

interface ProductGridProps {
  filters?: Record<string, string[]>
}

export default function ProductGrid({ filters }: ProductGridProps) {
  const [products, setProducts] = useState<CeramicProduct[]>([])
  const [loading, setLoading] = useState(true)
  const { favorites, toggleFavorite } = useFavorites()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [filters]) // Re-fetch when filters change

  const fetchProducts = async () => {
    try {
      setLoading(true)
      // Build query params from filters
      const params = new URLSearchParams()
      
      if (filters) {
        Object.entries(filters).forEach(([key, values]) => {
          if (values && values.length > 0) {
            params.append(key, values[0]) // For now, just use the first value
          }
        })
      }

      const response = await fetch(`/api/products?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products || [])
      } else {
        console.error('Failed to fetch products:', await response.text())
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter(product => {
    // Filter pencarian
      const matchesSearch = searchTerm === '' ||
        product.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.kode_produk?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.merk?.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (!matchesSearch) return false
    
    // Filter kriteria lainnya
    if (filters && Object.keys(filters).length > 0) {
      // Filter ukuran
      if (filters.ukuran?.length > 0 && product.ukuran && !filters.ukuran.includes(product.ukuran)) {
        return false
      }
      
      // Filter finish
      if (filters.finish?.length > 0 && product.finish && !filters.finish.includes(product.finish)) {
        return false
      }
      
      // Filter tipe
      if (filters.tipe?.length > 0 && product.tipe && !filters.tipe.includes(product.tipe)) {
        return false
      }
      
      // Filter area penggunaan
      if (filters.area_penggunaan?.length > 0 && product.area_penggunaan && !filters.area_penggunaan.includes(product.area_penggunaan)) {
        return false
      }
      
      // Filter warna
      if (filters.warna?.length > 0 && product.warna && !filters.warna.includes(product.warna)) {
        return false
      }
      
      // Filter merk
      if (filters.merk?.length > 0 && product.merk && !filters.merk.includes(product.merk)) {
        return false
      }
    }
    
    return true
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <div className="w-full pl-10 pr-4 py-2 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="aspect-square bg-gray-200"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Belum ada produk tersedia
        </h3>
        <p className="text-gray-600">
          Produk akan segera ditambahkan ke katalog.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Filter Info */}
      {filters && Object.values(filters).some(arr => arr.length > 0) && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            Menampilkan {filteredProducts.length} produk dari {products.length} produk
          </p>
        </div>
      )}
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari produk atau kode..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-gradient-to-br from-white to-amber-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-amber-200">
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
              
              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <Heart
                  className={`h-5 w-5 ${
                    favorites.includes(product.id)
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-400 hover:text-red-500'
                  }`}
                />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-4">
              {product.logo_url && (
                <div className="h-8 relative mb-2">
                  <Image
                    src={product.logo_url}
                    alt={`Logo ${product.merk}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 font-poppins">
                {product.nama}
              </h3>
              <p className="text-sm text-gray-600 mb-2 font-inter">
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

      {filteredProducts.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Produk tidak ditemukan
          </h3>
          <p className="text-gray-600">
            Coba ubah kata kunci pencarian Anda.
          </p>
        </div>
      )}
    </div>
  )
}