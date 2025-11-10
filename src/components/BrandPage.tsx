'use client'

import { useState } from 'react'
import ProductGrid from '@/components/ProductGrid'
import ProductSizeFilter from '@/components/ProductSizeFilter'

interface BrandPageProps {
  brand: string
}

export default function BrandPage({ brand }: BrandPageProps) {
  const [selectedSize, setSelectedSize] = useState('')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{brand}</h1>
        <ProductSizeFilter
          selectedSize={selectedSize}
          onSizeSelect={(size) => setSelectedSize(size)}
        />
      </div>
      <ProductGrid
        filters={{
          merk: [brand],
          ...(selectedSize ? { ukuran: [selectedSize] } : {})
        }}
      />
    </div>
  )
}