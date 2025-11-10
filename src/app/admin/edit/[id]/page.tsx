'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import ProductForm from '@/components/ProductForm'
import { CeramicProduct } from '@/types/product'

export default function EditProductPage() {
  const [product, setProduct] = useState<CeramicProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string

  useEffect(() => {
    fetchProduct()
  }, [productId])

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('ceramic_products')
        .select('*')
        .eq('id', productId)
        .single()

      if (error) {
        console.error('Error fetching product:', error)
        router.push('/admin')
      } else if (data) {
        setProduct(data)
      }
    } catch (error) {
      console.error('Error:', error)
      router.push('/admin')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = () => {
    router.push('/admin')
  }

  const handleCancel = () => {
    router.push('/admin')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Produk tidak ditemukan</h2>
          <button
            onClick={() => router.push('/admin')}
            className="text-blue-600 hover:text-blue-700"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <button
              onClick={() => router.push('/admin')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Kembali</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Edit Produk
          </h1>
          <p className="text-gray-600">
            Perbarui informasi produk keramik
          </p>
        </div>

        <ProductForm
          product={product}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </div>
  )
}