export interface CeramicProduct {
  id: string
  nama: string
  merk: string | null
  logo_url: string | null
  ukuran: string
  finish: string
  deskripsi: string | null
  is_published: boolean
  created_at: string
  updated_at: string
  image_url: string | null
  additional_images: string[] | null
  tipe: 'Lantai' | 'Dinding' | null
  area_penggunaan: 'Indoor' | 'Outdoor' | 'Both' | null
  warna: string | null
  harga: number | null
  kategori: string | null
}

export interface FilterOptions {
  search: string
  ukuran: string[]
  finish: string[]
  tipe: string[]
  area_penggunaan: string[]
  warna: string[]
}