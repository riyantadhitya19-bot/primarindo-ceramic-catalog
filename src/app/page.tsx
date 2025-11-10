'use client'

import { motion, Variants } from 'framer-motion'
import ProductGrid from '@/components/ProductGrid'
import BrandShowcase from '@/components/BrandShowcase'

const fadeInUp: Variants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 1.2,
      ease: [0.165, 0.84, 0.44, 1], // cubicBezier easing
      type: "tween"
    }
  }
}

const stagger: Variants = {
  initial: {},
  animate: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.4
    }
  }
}

export default function Home() {
  return (
    <div className="min-h-screen bg-amber-50">
      <motion.main 
        className="container mx-auto px-4 py-8"
        initial="initial"
        animate="animate"
        variants={stagger}>
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUp}
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4 font-playfair">
            OUR PRODUCTS
          </h1>
          <p className="text-xl text-gray-600 font-inter max-w-2xl mx-auto">
            Temukan berbagai produk keramik berkualitas untuk kebutuhan Anda
          </p>
        </motion.div>

        {/* Brand Showcase */}
        <motion.div 
          className="mb-16"
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 font-playfair text-center">
            Our Brands
          </h2>
          <BrandShowcase />
        </motion.div>

        {/* Products Section */}
        <motion.div 
          className="mt-16"
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 font-playfair text-center">
            Latest Products
          </h2>
          <ProductGrid filters={{}} />
        </motion.div>
      </motion.main>
    </div>
  )
}
