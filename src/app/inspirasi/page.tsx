'use client'

import { useState, useEffect } from 'react'
import { ImageIcon } from 'lucide-react'

interface InspirationItem {
  id: string
  title: string
  description: string
  image_url: string | null
  products_used: string | null
  created_at: string
}

export default function InspirationPage() {
  const [inspirations, setInspirations] = useState<InspirationItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInspirations()
  }, [])

  const fetchInspirations = async () => {
    try {
      const response = await fetch('/api/inspirations')
      if (response.ok) {
        const data = await response.json()
        setInspirations(data.inspirations || [])
      }
    } catch (error) {
      console.error('Error fetching inspirations:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="aspect-video bg-gray-200"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Galeri Inspirasi
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan inspirasi desain interior dan eksterior menggunakan koleksi keramik kami
          </p>
        </div>

        {inspirations && inspirations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {inspirations.map((inspiration) => (
              <div key={inspiration.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-video bg-gray-200">
                  {inspiration.image_url ? (
                    <img
                      src={inspiration.image_url}
                      alt={inspiration.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <span className="text-sm">Gambar tidak tersedia</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {inspiration.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {inspiration.description}
                  </p>
                  {inspiration.products_used && (
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Produk digunakan:</span> {inspiration.products_used}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <ImageIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Belum ada inspirasi
              </h3>
              <p className="text-gray-600">
                Inspirasi desain akan segera ditambahkan
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}