'use client'

import { useState } from 'react'

const SIZES = ['50x50', '40x40', '25x40', '25x25', '20x40']

interface ProductSizeFilterProps {
  onSizeSelect: (size: string) => void
  selectedSize: string
}

export default function ProductSizeFilter({ onSizeSelect, selectedSize }: ProductSizeFilterProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Ukuran</h3>
      <div className="flex flex-wrap gap-2">
        {SIZES.map((size) => (
          <button
            key={size}
            onClick={() => onSizeSelect(size)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedSize === size
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {size}cm
          </button>
        ))}
      </div>
    </div>
  )
}