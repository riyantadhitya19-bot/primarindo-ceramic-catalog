'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import ProductForm from '@/components/ProductForm'

export default function AddProductPage() {
  const router = useRouter()

  const handleSave = () => {
    router.push('/admin')
  }

  const handleCancel = () => {
    router.push('/admin')
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
            Tambah Produk Baru
          </h1>
          <p className="text-gray-600">
            Tambahkan produk keramik baru ke dalam katalog
          </p>
        </div>

        <ProductForm
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </div>
  )
}