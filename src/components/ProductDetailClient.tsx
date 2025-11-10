'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { CeramicProduct } from '@/types/product'
import { useFavorites } from '@/hooks/useFavorites'

interface ProductDetailClientProps {
  product: CeramicProduct
  relatedProducts: CeramicProduct[]
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const { favorites, toggleFavorite } = useFavorites()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const allImages = [
    product.image_url,
    ...(product.additional_images || [])
  ].filter(Boolean) as string[]

  const isFavorited = favorites.includes(product.id)
  
  const whatsappMessage = `Halo, saya tertarik dengan produk ${product.nama} (Kode: ${product.kode_produk}). Bisa saya dapatkan informasi lebih lanjut?`
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-blue-600">Beranda</Link>
        <span>/</span>
        <Link href="/" className="hover:text-blue-600">Produk</Link>
        <span>/</span>
        <span className="text-gray-900">{product.nama}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden">
            {allImages.length > 0 ? (
              <>
                <Image
                  src={allImages[currentImageIndex]}
                  alt={`${product.nama} - Gambar ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                
                {/* Image Navigation */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    
                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {allImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <span>Gambar tidak tersedia</span>
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square bg-gray-200 rounded-lg overflow-hidden border-2 ${
                    index === currentImageIndex ? 'border-blue-500' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.nama}
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                  Kode Produk: {product.kode_produk}
                </p>
                {product.logo_url && (
                  <div className="h-12 relative mt-4">
                    <Image
                      src={product.logo_url}
                      alt={`Logo ${product.merk}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                )}
              </div>
              <button
                onClick={() => toggleFavorite(product.id)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Heart
                  className={`h-6 w-6 ${
                    isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'
                  }`}
                />
              </button>
            </div>
            {product.merk && (
              <p className="text-lg text-gray-600">
                Merk: {product.merk}
              </p>
            )}
          </div>

          {product.deskripsi && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Deskripsi</h2>
              <p className="text-gray-700 leading-relaxed">{product.deskripsi}</p>
            </div>
          )}

          {/* Specifications */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Spesifikasi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-600">Ukuran:</span>
                <p className="font-medium">{product.ukuran}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Finish:</span>
                <p className="font-medium">{product.finish}</p>
              </div>
              {product.tipe && (
                <div>
                  <span className="text-sm text-gray-600">Tipe:</span>
                  <p className="font-medium">{product.tipe}</p>
                </div>
              )}
              {product.area_penggunaan && (
                <div>
                  <span className="text-sm text-gray-600">Area Penggunaan:</span>
                  <p className="font-medium">{product.area_penggunaan}</p>
                </div>
              )}
              {product.warna && (
                <div>
                  <span className="text-sm text-gray-600">Warna:</span>
                  <p className="font-medium">{product.warna}</p>
                </div>
              )}
              {product.isi_per_dus && (
                <div>
                  <span className="text-sm text-gray-600">Isi per Dus:</span>
                  <p className="font-medium">{product.isi_per_dus} pcs</p>
                </div>
              )}
              {product.m2_per_dus && (
                <div>
                  <span className="text-sm text-gray-600">m² per Dus:</span>
                  <p className="font-medium">{product.m2_per_dus} m²</p>
                </div>
              )}
              {product.rls_antislip && (
                <div className="sm:col-span-2">
                  <span className="text-sm text-gray-600">Fitur:</span>
                  <p className="font-medium text-green-600">✓ Anti-slip</p>
                </div>
              )}
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <MessageCircle className="h-5 w-5" />
            <span>Tanya Produk via WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Produk Terkait
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/produk/${relatedProduct.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square bg-gray-200 relative">
                  {relatedProduct.image_url ? (
                    <Image
                      src={relatedProduct.image_url}
                      alt={relatedProduct.nama}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <span className="text-xs">No Image</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                    {relatedProduct.nama}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {relatedProduct.kode_produk}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}