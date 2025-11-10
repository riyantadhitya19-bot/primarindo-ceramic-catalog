export interface Database {
  public: {
    Tables: {
      ceramic_products: {
        Row: {
          id: string
          nama: string
          kode_produk: string
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
          merk: string | null
          logo_url: string | null
          isi_per_dus: number | null
          m2_per_dus: number | null
          rls_antislip: boolean | null
          harga: number | null
          kategori: string | null
        }
        Insert: {
          id?: string
          nama: string
          kode_produk: string
          ukuran: string
          finish: string
          deskripsi?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
          image_url?: string | null
          additional_images?: string[] | null
          tipe?: 'Lantai' | 'Dinding' | null
          area_penggunaan?: 'Indoor' | 'Outdoor' | 'Both' | null
          warna?: string | null
          merk?: string | null
          logo_url?: string | null
          isi_per_dus?: number | null
          m2_per_dus?: number | null
          rls_antislip?: boolean | null
          harga?: number | null
          kategori?: string | null
        }
        Update: {
          nama?: string
          kode_produk?: string
          ukuran?: string
          finish?: string
          deskripsi?: string | null
          is_published?: boolean
          updated_at?: string
          image_url?: string | null
          additional_images?: string[] | null
          tipe?: 'Lantai' | 'Dinding' | null
          area_penggunaan?: 'Indoor' | 'Outdoor' | 'Both' | null
          warna?: string | null
          merk?: string | null
          logo_url?: string | null
          isi_per_dus?: number | null
          m2_per_dus?: number | null
          rls_antislip?: boolean | null
          harga?: number | null
          kategori?: string | null
        }
      }
      inspiration_gallery: {
        Row: {
          id: string
          title: string
          description: string | null
          image_url: string
          products_used: string[] | null
          created_at: string
          is_published: boolean
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          image_url: string
          products_used?: string[] | null
          created_at?: string
          is_published?: boolean
        }
        Update: {
          title?: string
          description?: string | null
          image_url?: string
          products_used?: string[] | null
          is_published?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}