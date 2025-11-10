export const supabaseMock = {
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