import { supabase } from '@/lib/supabase'
import { CeramicProduct } from '@/types/product'
import { notFound } from 'next/navigation'
import ProductDetailClient from '@/components/ProductDetailClient'
import Header from '@/components/Header'

interface PageProps {
  params: {
    id: string
  }
}

async function getProduct(id: string): Promise<CeramicProduct | null> {
  // Get product by ID first
  const { data, error } = await supabase
    .from('ceramic_products')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return null
  }

  // Check if product is published
  if (!data.is_published) {
    return null
  }

  return data
}

async function getRelatedProducts(currentProduct: CeramicProduct): Promise<CeramicProduct[]> {
  // Simplified query for mock data - get all published products except current one
  const { data, error } = await supabase
    .from('ceramic_products')
    .select('*')
    .eq('is_published', true)
    .neq('id', currentProduct.id)
    .limit(4)

  if (error) {
    return []
  }

  return data || []
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params
  const product = await getProduct(id)
  
  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </div>
  )
}

export async function generateStaticParams() {
  const { data: products } = await supabase
    .from('ceramic_products')
    .select('id')
    .eq('is_published', true)

  return products?.map((product) => ({
    id: product.id,
  })) || []
}