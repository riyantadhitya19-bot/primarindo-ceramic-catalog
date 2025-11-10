'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, Filter, X } from 'lucide-react'

interface SearchFilterProps {
  onFilterChange: (filters: Record<string, string[]>) => void
}

export default function SearchFilter({ onFilterChange }: SearchFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({
    ukuran: [] as string[],
    finish: [] as string[],
    tipe: [] as string[],
    area_penggunaan: [] as string[],
    warna: [] as string[],
    merk: [] as string[]
  })

  const [filterOptions, setFilterOptions] = useState({
    ukuran: [] as string[],
    finish: [] as string[],
    tipe: [] as string[],
    area_penggunaan: [] as string[],
    warna: [] as string[],
    merk: [] as string[]
  })

  const fetchFilterOptions = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setFilterOptions(data.filters || {
          ukuran: ['30x30', '40x40', '60x60', '80x80', '30x60', '20x25', '25x40'],
          finish: ['Matte', 'Glossy', 'Polished', 'Textured'],
          tipe: ['Lantai', 'Dinding'],
          area_penggunaan: ['Indoor', 'Outdoor', 'Both'],
          warna: ['Putih', 'Hitam', 'Abu-abu', 'Cokelat', 'Beige', 'Marmer'],
          merk: ['Roman', 'Monalisa', 'KIA', 'Lucky', 'Milan', 'Granito']
        })
      }
    } catch (error) {
      console.error('Error fetching filter options:', error)
    }
  }

  useEffect(() => {
    fetchFilterOptions()
  }, [])

  const toggleFilter = (category: string, value: string) => {
    setSelectedFilters(prev => {
      const categoryKey = category as keyof typeof selectedFilters
      const currentValues = prev[categoryKey] || []
      const newFilters = {
        ...prev,
        [categoryKey]: currentValues.includes(value)
          ? currentValues.filter(item => item !== value)
          : [...currentValues, value]
      }
      console.log('Filter changed:', categoryKey, value, newFilters)
      onFilterChange(newFilters)
      return newFilters
    })
  }

  const clearAllFilters = () => {
    const emptyFilters = {
      ukuran: [],
      finish: [],
      tipe: [],
      area_penggunaan: [],
      warna: [],
      merk: []
    }
    setSelectedFilters(emptyFilters)
    onFilterChange(emptyFilters)
  }

  const hasActiveFilters = Object.values(selectedFilters).some(arr => arr.length > 0)

  return (
    <div className="bg-gradient-to-br from-white to-amber-50 rounded-lg shadow-sm p-4 border border-amber-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 font-poppins">
          Filter Produk
        </h2>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Filter className="h-4 w-4" />
          <span>Filter</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Filter Aktif:</span>
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Hapus Semua
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(selectedFilters).map(([category, values]) =>
              values.map(value => (
                <span
                  key={`${category}-${value}`}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  <span>{value}</span>
                  <button
                    onClick={() => toggleFilter(category as keyof typeof filterOptions, value)}
                    className="hover:text-blue-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))
            )}
          </div>
        </div>
      )}

      {/* Filter Options */}
      {isFilterOpen && (
        <div className="space-y-6">
          {Object.entries(filterOptions).map(([category, options]) => (
            <div key={category}>
              <h3 className="text-sm font-medium text-gray-900 mb-2 capitalize font-poppins">
                {category.replace('_', ' ')}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {options.map(option => (
                  <label key={option} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters[category as keyof typeof filterOptions].includes(option)}
                      onChange={() => toggleFilter(category as keyof typeof filterOptions, option)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}