import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { productIds } = await request.json()

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json({ products: [] })
    }

    const { data: products, error } = await supabase
      .from('ceramic_products')
      .select('*')
      .in('id', productIds)
      .eq('is_published', true)

    if (error) {
      console.error('Error fetching favorite products:', error)
      return NextResponse.json(
        { error: 'Failed to fetch favorite products' },
        { status: 500 }
      )
    }

    return NextResponse.json({ products: products || [] })
  } catch (error) {
    console.error('Error in favorites API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}