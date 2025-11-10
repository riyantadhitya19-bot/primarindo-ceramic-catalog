import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;
  try {
    const { id } = params

    // Fetch the main product
    const { data: product, error: productError } = await supabase
      .from('ceramic_products')
      .select('*')
      .eq('id', id)
      .eq('is_published', true)
      .single()

    if (productError || !product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Fetch related products (same finish or similar size)
    const { data: relatedProducts, error: relatedError } = await supabase
      .from('ceramic_products')
      .select('*')
      .neq('id', id)
      .eq('is_published', true)
      .or(`finish.eq.${product.finish},ukuran.eq.${product.ukuran}`)
      .limit(4)

    return NextResponse.json({
      product,
      relatedProducts: relatedProducts || []
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}