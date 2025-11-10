// Mock NextRequest and NextResponse
jest.mock('next/server', () => ({
  NextRequest: jest.fn().mockImplementation((url) => ({
    url,
    nextUrl: new URL(url)
  })),
  NextResponse: {
    json: jest.fn().mockImplementation((data, options) => ({
      status: options?.status || 200,
      json: async () => data
    }))
  }
}))

import { GET } from './route'
import { NextRequest } from 'next/server'

// Mock supabase client
jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      or: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({
        data: [
          {
            id: 1,
            kode_produk: 'TEST001',
            nama: 'Test Product',
            merk: 'Test Brand',
            ukuran: '60x60',
            finish: 'Glossy',
            tipe: 'Floor Tile',
            area_penggunaan: 'Indoor',
            warna: 'White',
            image_url: 'test.jpg',
            logo_url: 'logo.jpg',
            created_at: '2025-11-08T00:00:00Z'
          }
        ],
        error: null
      })
    }))
  }
}))

describe('Products API', () => {
  const mockRequest = (params = {}) => {
    const searchParams = new URLSearchParams(params)
    return new NextRequest(`http://localhost:3000/api/products?${searchParams.toString()}`)
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return products and filters without query params', async () => {
    const req = mockRequest()
    const res = await GET(req)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data).toHaveProperty('products')
    expect(data).toHaveProperty('filters')
    expect(Array.isArray(data.products)).toBe(true)
  })

  it('should filter products by search term', async () => {
    const req = mockRequest({ search: 'test' })
    const res = await GET(req)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.products).toHaveLength(1)
    expect(data.products[0].nama).toBe('Test Product')
  })

  it('should filter products by brand', async () => {
    const req = mockRequest({ merk: 'Test Brand' })
    const res = await GET(req)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.products).toHaveLength(1)
    expect(data.products[0].merk).toBe('Test Brand')
  })

  it('should filter products by multiple criteria', async () => {
    const req = mockRequest({
      ukuran: '60x60',
      finish: 'Glossy',
      tipe: 'Floor Tile',
      area_penggunaan: 'Indoor',
      warna: 'White'
    })
    const res = await GET(req)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.products).toHaveLength(1)
    expect(data.products[0]).toMatchObject({
      ukuran: '60x60',
      finish: 'Glossy',
      tipe: 'Floor Tile',
      area_penggunaan: 'Indoor',
      warna: 'White'
    })
  })

  it('should handle supabase error gracefully', async () => {
    // Mock supabase to throw an error
    const mockSupabase = require('@/lib/supabase')
    jest.spyOn(mockSupabase.supabase, 'from').mockImplementationOnce(() => {
      throw new Error('Supabase error')
    })

    const req = mockRequest()
    const res = await GET(req)
    const data = await res.json()

    expect(res.status).toBe(500)
    expect(data).toHaveProperty('error')
  })
})