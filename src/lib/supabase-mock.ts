// Mock Supabase client for demo purposes
import { CeramicProduct } from '@/types/product'

interface Inspiration {
  id: string
  title: string
  description: string
  image_url: string
  is_published: boolean
  created_at: string
  updated_at: string
}

// Mock data for demonstration
const mockProducts: CeramicProduct[] = [
  {
    id: '1',
    nama: 'Keramik Polos Putih',
    kode_produk: 'KPP-001',
    merk: 'OCTAGON',
    logo_url: '/brands/octagon-logo.png',
    ukuran: '30x30cm',
    finish: 'Matt',
    deskripsi: 'Keramik dinding polos dengan warna putih bersih',
    tipe: 'Dinding',
    area_penggunaan: 'Indoor',
    warna: 'Putih',
    harga: 125000,
    isi_per_dus: 6,
    m2_per_dus: 1.08,
    rls_antislip: false,
    kategori: 'Polos',
    is_published: true,
    image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    additional_images: [],
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    nama: 'Keramik Marmer Emas',
    kode_produk: 'KME-002',
    merk: 'Prima',
    logo_url: 'https://via.placeholder.com/150x50.png?text=Prima',
    ukuran: '60x60cm',
    finish: 'Polished',
    deskripsi: 'Keramik lantai motif marmer dengan sentuhan emas',
    tipe: 'Lantai',
    area_penggunaan: 'Indoor',
    warna: 'Emas',
    harga: 285000,
    isi_per_dus: 4,
    m2_per_dus: 1.44,
    rls_antislip: true,
    kategori: 'Marmer',
    is_published: true,
    image_url: 'https://images.unsplash.com/photo-1564540579594-0930edb6de43?w=400&h=400&fit=crop',
    additional_images: [],
    created_at: '2024-01-16T00:00:00Z',
    updated_at: '2024-01-16T00:00:00Z'
  },
  {
    id: '3',
    nama: 'Keramik Batu Alam',
    kode_produk: 'KBA-003',
    merk: 'Prima',
    logo_url: 'https://via.placeholder.com/150x50.png?text=Prima',
    ukuran: '20x40cm',
    finish: 'Textured',
    deskripsi: 'Keramik outdoor dengan tekstur batu alam',
    tipe: 'Lantai',
    area_penggunaan: 'Outdoor',
    warna: 'Coklat',
    harga: 195000,
    isi_per_dus: 8,
    m2_per_dus: 0.96,
    rls_antislip: true,
    kategori: 'Tekstur',
    is_published: true,
    image_url: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=400&fit=crop',
    additional_images: [],
    created_at: '2024-01-17T00:00:00Z',
    updated_at: '2024-01-17T00:00:00Z'
  },
  {
    id: '4',
    nama: 'Keramik Motif Kayu',
    kode_produk: 'KMK-004',
    merk: 'Prima',
    logo_url: 'https://via.placeholder.com/150x50.png?text=Prima',
    ukuran: '15x60cm',
    finish: 'Matt',
    deskripsi: 'Keramik dinding motif kayu vintage',
    tipe: 'Dinding',
    area_penggunaan: 'Indoor',
    warna: 'Coklat Tua',
    harga: 165000,
    isi_per_dus: 12,
    m2_per_dus: 1.08,
    rls_antislip: false,
    kategori: 'Kayu',
    is_published: true,
    image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    additional_images: [],
    created_at: '2024-01-18T00:00:00Z',
    updated_at: '2024-01-18T00:00:00Z'
  },
  {
    id: '5',
    nama: 'Keramik Granit Hitam',
    kode_produk: 'KGH-005',
    merk: 'Prima',
    logo_url: 'https://via.placeholder.com/150x50.png?text=Prima',
    ukuran: '80x80cm',
    finish: 'Polished',
    deskripsi: 'Keramik lantai granit warna hitam elegan',
    tipe: 'Lantai',
    area_penggunaan: 'Indoor',
    warna: 'Hitam',
    harga: 385000,
    isi_per_dus: 2,
    m2_per_dus: 1.28,
    rls_antislip: true,
    kategori: 'Granit',
    is_published: true,
    image_url: 'https://images.unsplash.com/photo-1564540579594-0930edb6de43?w=400&h=400&fit=crop',
    additional_images: [],
    created_at: '2024-01-19T00:00:00Z',
    updated_at: '2024-01-19T00:00:00Z'
  },
  {
    id: '6',
    nama: 'Keramik Mosaic Color',
    kode_produk: 'KMC-006',
    merk: 'Prima',
    logo_url: 'https://via.placeholder.com/150x50.png?text=Prima',
    ukuran: '30x30cm',
    finish: 'Glossy',
    deskripsi: 'Keramik dinding mosaic multi warna',
    tipe: 'Dinding',
    area_penggunaan: 'Both',
    warna: 'Multi Color',
    harga: 225000,
    isi_per_dus: 6,
    m2_per_dus: 1.08,
    rls_antislip: false,
    kategori: 'Mosaic',
    is_published: true,
    image_url: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=400&fit=crop',
    additional_images: [],
    created_at: '2024-01-20T00:00:00Z',
    updated_at: '2024-01-20T00:00:00Z'
  }
]

const mockInspirations: Inspiration[] = [
  {
    id: '1',
    title: 'Desain Ruang Tamu Modern',
    description: 'Kombinasi keramik marmer emas dengan furniture minimalis',
    image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
    is_published: true,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    title: 'Dapur Minimalis Putih',
    description: 'Keramik polos putih memberikan kesan bersih dan luas',
    image_url: 'https://images.unsplash.com/photo-1564540579594-0930edb6de43?w=600&h=400&fit=crop',
    is_published: true,
    created_at: '2024-01-16T00:00:00Z',
    updated_at: '2024-01-16T00:00:00Z'
  },
  {
    id: '3',
    title: 'Taman Belakang Alam',
    description: 'Keramik batu alam menciptakan suasana natural',
    image_url: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600&h=400&fit=crop',
    is_published: true,
    created_at: '2024-01-17T00:00:00Z',
    updated_at: '2024-01-17T00:00:00Z'
  }
]

export const mockSupabase = {
  storage: {
    from: (bucket: string) => ({
      upload: async (path: string, file: File) => {
        // Mock successful upload
        const mockPublicUrl = `https://mock-storage.supabase.co/${bucket}/${path}`;
        return {
          data: { path: mockPublicUrl },
          error: null
        };
      },
      getPublicUrl: (path: string) => ({
        data: { publicUrl: `https://mock-storage.supabase.co/${bucket}/${path}` },
        error: null
      }),
      remove: async (paths: string[]) => ({
        data: { path: paths },
        error: null
      })
    })
  },
  from: (table: string) => {
    let currentFilters: Array<{column: string, value: any, operator: string}> = []
    
    const buildQuery = () => {
      if (table === 'ceramic_products') {
        let filteredProducts = mockProducts
        currentFilters.forEach(filter => {
          if (filter.operator === 'eq') {
            filteredProducts = filteredProducts.filter(p => p[filter.column as keyof CeramicProduct] === filter.value)
          } else if (filter.operator === 'neq') {
            filteredProducts = filteredProducts.filter(p => p[filter.column as keyof CeramicProduct] !== filter.value)
          }
        })
        return filteredProducts
      }
      if (table === 'inspirations') {
        let filteredInspirations = mockInspirations
        currentFilters.forEach(filter => {
          if (filter.operator === 'eq') {
            filteredInspirations = filteredInspirations.filter(i => i[filter.column as keyof Inspiration] === filter.value)
          } else if (filter.operator === 'neq') {
            filteredInspirations = filteredInspirations.filter(i => i[filter.column as keyof Inspiration] !== filter.value)
          }
        })
        return filteredInspirations
      }
      return []
    }
    
    return {
      select: (columns = '*') => ({
        eq: (column: string, value: any) => {
          currentFilters.push({ column, value, operator: 'eq' })
          return {
            single: async () => {
              const results = buildQuery()
              return { data: results[0] || null, error: null }
            },
            order: async (orderColumn = 'created_at', options = { ascending: false }) => {
              const results = buildQuery()
              return { data: results, error: null }
            },
            neq: (column: string, value: any) => {
              currentFilters.push({ column, value, operator: 'neq' })
              return {
                limit: async (limit: number) => {
                  const results = buildQuery()
                  return { data: results.slice(0, limit), error: null }
                },
                order: async (orderColumn = 'created_at', options = { ascending: false }) => {
                  const results = buildQuery()
                  return { data: results, error: null }
                }
              }
            }
          }
        },
        neq: (column: string, value: any) => {
          currentFilters.push({ column, value, operator: 'neq' })
          return {
            order: async (orderColumn = 'created_at', options = { ascending: false }) => {
              const results = buildQuery()
              return { data: results, error: null }
            }
          }
        },
        order: async (orderColumn = 'created_at', options = { ascending: false }) => {
          if (table === 'ceramic_products') {
            return { data: mockProducts, error: null }
          }
          if (table === 'inspirations') {
            return { data: mockInspirations, error: null }
          }
          return { data: [], error: null }
        },
        in: (column: string, values: any[]) => ({
          order: async (orderColumn = 'created_at', options = { ascending: false }) => {
            if (table === 'ceramic_products') {
              const filteredProducts = mockProducts.filter(p => values.includes(p[column as keyof CeramicProduct]))
              return { data: filteredProducts, error: null }
            }
            return { data: [], error: null }
          }
        })
      })
    }
  },
  auth: {
    getSession: async () => ({ 
      data: { 
        session: { 
          access_token: 'mock-token',
          user: { email: 'admin@example.com', id: '1' }
        }
      }, 
      error: null 
    }),
    onAuthStateChange: (callback: any) => {
      // Simulate authenticated user
      callback('SIGNED_IN', { 
        access_token: 'mock-token',
        user: { email: 'admin@example.com', id: '1' }
      })
      return { data: { subscription: { unsubscribe: () => {} } } }
    },
    signInWithPassword: async (credentials: any) => {
      if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
        return { 
          data: { 
            user: { email: 'admin@example.com', id: '1' }, 
            session: { access_token: 'mock-token', user: { email: 'admin@example.com', id: '1' } } 
          }, 
          error: null 
        };
      }
      return { data: null, error: { message: 'Invalid credentials' } };
    },
    signOut: async () => ({ data: null, error: null })
  }
}

export const mockSupabaseAdmin = {
  from: (table: string) => ({
    select: () => ({
      order: async () => {
        if (table === 'ceramic_products') {
          return { data: mockProducts, error: null }
        }
        return { data: [], error: null }
      }
    }),
    insert: async (data: any) => {
      // Simulate successful insert with mock ID
      const newData = {
        ...data,
        id: `mock-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockProducts.push(newData);
      return { data: newData, error: null };
    },
    update: async (data: any) => {
      // Simulate successful update
      const index = mockProducts.findIndex(p => p.id === data.id);
      if (index !== -1) {
        mockProducts[index] = {
          ...mockProducts[index],
          ...data,
          updated_at: new Date().toISOString()
        };
        return { data: mockProducts[index], error: null };
      }
      return { data: null, error: null };
    },
    delete: () => ({
      eq: async (column: string, value: string) => {
        // Simulate successful delete
        const index = mockProducts.findIndex(p => p[column as keyof typeof p] === value);
        if (index !== -1) {
          mockProducts.splice(index, 1);
        }
        return { data: null, error: null };
      }
    })
  }),
  auth: {
    signInWithPassword: async () => ({ data: { user: { email: 'admin@example.com' } }, error: null }),
    signOut: async () => ({ data: null, error: null }),
    getSession: async () => ({ data: { session: { user: { email: 'admin@example.com' } } }, error: null })
  }
}