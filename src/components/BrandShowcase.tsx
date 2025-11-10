'use client'

import Link from 'next/link'
import Image from 'next/image'

interface Brand {
  name: string
  logo: string
  bgColor: string
}

const brands: Brand[] = [
  {
    name: 'OCTAGON',
    logo: '/brands/LOGO_OCTAGON_pages-to-jpg-0001-removebg-preview.svg',
    bgColor: 'from-white to-gray-400'
  },
  {
    name: 'VALENCIA',
    logo: '/brands/LOGO_VALENCIA_page-0001-removebg-preview.svg',
    bgColor: 'from-white to-gray-400',
    sizes: ['50x50', '40x40', '25x40', '25x25', '20x40']
  },
  {
    name: 'ARLES',
    logo: '/brands/LOGO_ARLES-removebg-preview.svg',
    bgColor: 'from-white to-gray-400',
    sizes: ['50x50', '40x40', '25x40', '25x25', '20x40']
  },
  {
    name: 'MANDALAY',
    logo: '/brands/LOGO_MANDALAY_pages-to-jpg-0001-removebg-preview.svg',
    bgColor: 'from-white to-gray-400',
    sizes: ['50x50', '40x40', '25x40', '25x25', '20x40']
  },
  {
    name: 'PRIMATILES',
    logo: '/brands/LOGO_PRIMATILES-removebg-preview.svg',
    bgColor: 'from-white to-gray-400',
    sizes: ['50x50', '40x40', '25x40', '25x25', '20x40']
  },
  {
    name: 'ARGA INDOTILE',
    logo: '/brands/LOGO_ARGA_INDOTILE_pages-to-jpg-0001-removebg-preview.svg',
    bgColor: 'from-white to-gray-400',
    sizes: ['50x50', '40x40', '25x40', '25x25', '20x40']
  },
  {
    name: 'VANDAN',
    logo: '/brands/LOGO_VANDAN_page-0001-removebg-preview.svg',
    bgColor: 'from-white to-gray-400',
    sizes: ['50x50', '40x40', '25x40', '25x25', '20x40']
  },
  {
    name: 'VENETAS',
    logo: '/brands/LOGO_VENETAS_page-0003-removebg-preview.svg',
    bgColor: 'from-white to-gray-400',
    sizes: ['50x50', '40x40', '25x40', '25x25', '20x40']
  },
  {
    name: 'YUKA',
    logo: '/brands/LOGO_YUKA_page-0001-removebg-preview.svg',
    bgColor: 'from-white to-gray-400',
    sizes: ['50x50', '40x40', '25x40', '25x25', '20x40']
  },
  {
    name: 'MAGNETO',
    logo: '/brands/LOGO_MAGNETO_page-0001-removebg-preview.svg',
    bgColor: 'from-white to-gray-400',
    sizes: ['50x50', '40x40', '25x40', '25x25', '20x40']
  },
  {
    name: 'REDHORSE',
    logo: '/brands/LOGO_REDHORSE_page-0001-removebg-preview.svg',
    bgColor: 'from-white to-gray-400',
    sizes: ['50x50', '40x40', '25x40', '25x25', '20x40']
  },
  {
    name: 'METROPOLIS',
    logo: '/brands/LOGO_METROPOLIS-removebg-preview.svg',
    bgColor: 'from-white to-gray-400',
    sizes: ['50x50', '40x40', '25x40', '25x25', '20x40']
  }
]
 
export default function BrandShowcase() {
  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-2 font-playfair">
          Brand Keramik Kami
        </h2>
        <p className="text-gray-600 text-lg font-inter">
          Kualitas terbaik dari berbagai merek ternama
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group"
          >
            {/* Brand Header */}
            <div className={`bg-gradient-to-r ${brand.bgColor} px-6 py-8`}>
              <div className="h-24 relative mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={200}
                    height={80}
                    className="max-h-full w-auto object-contain"
                    priority
                  />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 text-center tracking-wide font-poppins">
                {brand.name}
              </h3>
            </div>

            {/* Action Button */}
            <div className="p-4">
              <Link
                href={`/brand/${brand.name.toLowerCase().replace(' ', '-')}`}
                className="block w-full bg-gradient-to-r from-yellow-500 to-blue-300 text-black text-sm font-semibold py-3 px-6 rounded-lg hover:from-amber-600 hover:to-blue-700 transition-all duration-300 text-center transform hover:scale-105 hover:shadow-lg"
              >
                Lihat Produk
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-8">
        <p className="text-amber-700 text-base">
          Klik pada ukuran untuk melihat produk atau pilih brand untuk eksplorasi lengkap
        </p>
      </div>
    </div>
  )
}