'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CeramicProduct } from '@/types/product'
import { supabase } from '@/lib/supabase'
import ProductGrid from '@/components/ProductGrid'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const getPatternForBrand = (brandName: string): { pattern: string; color: string } => {
  const patterns = [
    { pattern: 'diagonal-lines', color: '#FDF2F8' }, // Pink soft
    { pattern: 'dots', color: '#F0FDF4' },          // Green soft
    { pattern: 'hexagons', color: '#F0F9FF' },      // Blue soft
    { pattern: 'waves', color: '#FDF4FF' },         // Purple soft
    { pattern: 'squares', color: '#FFF7ED' },       // Orange soft
    { pattern: 'circles', color: '#FEFCE8' }        // Yellow soft
  ]
  
  const hash = brandName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const index = hash % patterns.length
  
  return patterns[index]
}

export default function BrandPage() {
  const params = useParams()
  const brandName = (params.name as string).replace(/-/g, ' ').toUpperCase()
  const { pattern, color } = getPatternForBrand(brandName)
  
  const [loading, setLoading] = useState(true)
  const [brandLogo, setBrandLogo] = useState<string | null>(null)
  const [activeFilters] = useState<Record<string, string[]>>({
    merk: [brandName] // Pre-set brand filter
  })

  useEffect(() => {
    fetchBrandLogo()
  }, [brandName])

  const fetchBrandLogo = async () => {
    try {
      setLoading(true)
      const { data: products, error } = await supabase
        .from('ceramic_products')
        .select('logo_url')
        .eq('merk', brandName)
        .eq('is_published', true)
        .limit(1)

      if (error) throw error

      if (products && products.length > 0 && products[0].logo_url) {
        setBrandLogo(products[0].logo_url)
      }
    } catch (error) {
      console.error('Error fetching brand logo:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div 
      className="min-h-screen"
      initial="initial"
      animate="animate"
      variants={stagger}
      style={{
        backgroundColor: color,
        backgroundImage: `url('/patterns/${pattern}.svg')`,
        backgroundRepeat: 'repeat',
        backgroundSize: '40px',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-transparent pointer-events-none"
        variants={fadeInUp}
      />
      
      <motion.div 
        className="container mx-auto px-4 py-8 relative"
        variants={stagger}
      >
        {/* Brand Header */}
        <motion.div 
          className="text-center mb-12"
          variants={fadeInUp}
        >
          <div className="inline-block px-12 py-6 backdrop-blur-sm rounded-xl">
            <h1 className="text-5xl font-bold text-gray-900 mb-4 font-playfair drop-shadow-lg">
              {brandName}
            </h1>
            <p className="text-gray-800 text-xl font-inter drop-shadow">
              Jelajahi koleksi lengkap keramik {brandName}
            </p>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div 
          className="grid grid-cols-1 gap-8"
          variants={fadeInUp}
        >
          {/* Brand Logo */}
          {brandLogo && (
            <motion.div 
              className="mx-auto mb-8"
              variants={fadeInUp}
            >
              <Image
                src={brandLogo}
                alt={`${brandName} Logo`}
                width={200}
                height={100}
                className="object-contain"
              />
            </motion.div>
          )}

          {/* Products Grid */}
          <motion.div 
            className="w-full"
            variants={fadeInUp}
          >
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto" />
                <p className="mt-4 text-gray-600">Memuat produk...</p>
              </div>
            ) : (
              <ProductGrid filters={activeFilters} />
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}