import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const ukuran = searchParams.get('ukuran')
    const finish = searchParams.get('finish')
    const tipe = searchParams.get('tipe')
    const area_penggunaan = searchParams.get('area_penggunaan')
    const warna = searchParams.get('warna')
    const merk = searchParams.get('merk')

    let query = supabase
      .from('ceramic_products')
      .select(`
        id,
        kode_produk,
        nama,
        merk,
        ukuran,
        finish,
        tipe,
        area_penggunaan,
        warna,
        image_url,
        logo_url,
        created_at
      `)
      .eq('is_published', true)

    // Apply filters
  if (search) {
    query = query.or(`nama.ilike.%${search}%,kode_produk.ilike.%${search}%,merk.ilike.%${search}%`)
  }
  if (merk) {
    query = query.eq('merk', merk)
  }
    if (ukuran) {
      query = query.eq('ukuran', ukuran)
    }
    if (finish) {
      query = query.eq('finish', finish)
    }
    if (tipe) {
      query = query.eq('tipe', tipe)
    }
    if (area_penggunaan) {
      query = query.eq('area_penggunaan', area_penggunaan)
    }
    if (warna) {
      query = query.eq('warna', warna)
    }

    const { data: products, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching products:', error)
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      )
    }

    // Get unique values for filters
    const { data: allProducts } = await supabase
      .from('ceramic_products')
      .select('ukuran, finish, tipe, area_penggunaan, warna, merk')
      .eq('is_published', true)

    const filters = {
      ukuran: [...new Set(allProducts?.map((p: any) => p.ukuran).filter(Boolean))].sort(),
      finish: [...new Set(allProducts?.map((p: any) => p.finish).filter(Boolean))].sort(),
      tipe: [...new Set(allProducts?.map((p: any) => p.tipe).filter(Boolean))].sort(),
      area_penggunaan: [...new Set(allProducts?.map((p: any) => p.area_penggunaan).filter(Boolean))].sort(),
      warna: [...new Set(allProducts?.map((p: any) => p.warna).filter(Boolean))].sort(),
      merk: [...new Set(allProducts?.map((p: any) => p.merk).filter(Boolean))].sort(),
    }

    return NextResponse.json({ 
      products: products || [],
      filters 
    })
  } catch (error) {
    console.error('Error in products API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}