'use client'

import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { CeramicProduct } from '@/types/product'
import { Upload, X, Plus, Trash2 } from 'lucide-react'

interface ProductFormProps {
  product?: CeramicProduct
  onSave: () => void
  onCancel: () => void
}

export default function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    nama: product?.nama || '',
    merk: product?.merk || '',
    ukuran: product?.ukuran || '',
    finish: product?.finish || '',
    tipe: product?.tipe || '',
    area_penggunaan: product?.area_penggunaan || '',
    warna: product?.warna || '',
    deskripsi: product?.deskripsi || '',
    logo_url: product?.logo_url || '',
    image_url: product?.image_url || '',
    is_published: product?.is_published ?? true,
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>(product?.image_url || '')
  const [logoPreview, setLogoPreview] = useState<string>(product?.logo_url || '')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const logoInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleFileUpload = async (file: File, type: 'image' | 'logo') => {
    setUploading(true)
    try {
      const fileName = `${Date.now()}-${file.name}`
      const filePath = `${type === 'image' ? 'products' : 'logos'}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('foto-keramik')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from('foto-keramik')
        .getPublicUrl(filePath)

      if (type === 'image') {
        setFormData(prev => ({ ...prev, image_url: publicUrl }))
        setImagePreview(publicUrl)
        setImageFile(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      } else {
        setFormData(prev => ({ ...prev, logo_url: publicUrl }))
        setLogoPreview(publicUrl)
        setLogoFile(null)
        if (logoInputRef.current) {
          logoInputRef.current.value = ''
        }
      }
    } catch (error) {
      console.error(`Error uploading ${type}:`, error)
      alert(`Gagal mengunggah ${type === 'image' ? 'gambar' : 'logo'}`)
    } finally {
      setUploading(false)
    }
  }

  const handleImageUpload = () => {
    if (imageFile) {
      handleFileUpload(imageFile, 'image')
    }
  }

  const handleLogoUpload = () => {
    if (logoFile) {
      handleFileUpload(logoFile, 'logo')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'logo') => {
    const file = e.target.files?.[0]
    if (file) {
      if (type === 'image') {
        setImageFile(file)
        const reader = new FileReader()
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        setLogoFile(file)
        const reader = new FileReader()
        reader.onload = (e) => {
          setLogoPreview(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Upload image and logo if there are new files
      if (imageFile) {
        await handleFileUpload(imageFile, 'image')
      }
      
      if (logoFile) {
        await handleFileUpload(logoFile, 'logo')
      }

      // Prepare data for saving
      const saveData = {
        ...formData,
        updated_at: new Date().toISOString(),
      }

      if (product) {
        // Update existing product
        const { error } = await supabase
          .from('ceramic_products')
          .update(saveData)
          .eq('id', product.id)

        if (error) throw error
      } else {
        // Create new product
        const { error } = await supabase
          .from('ceramic_products')
          .insert([{
            ...saveData,
            created_at: new Date().toISOString(),
          }])

        if (error) throw error
      }

      // Trigger rebuild
      try {
        await fetch('/api/rebuild', {
          method: 'POST',
        })
      } catch (rebuildError) {
        console.error('Error triggering rebuild:', rebuildError)
      }

      alert('Produk berhasil disimpan!')
      onSave()
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Gagal menyimpan produk')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Upload */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-black mb-4">Gambar Produk</h3>
        
        {imagePreview && (
          <div className="mb-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-xs h-48 object-cover rounded-lg border"
            />
          </div>
        )}

        <div className="flex items-center space-x-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'image')}
            className="block w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {imageFile && (
            <button
              type="button"
              onClick={handleImageUpload}
              disabled={uploading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {uploading ? 'Mengunggah...' : 'Unggah'}
            </button>
          )}

          {/* Logo Upload */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-black mb-2">Logo Brand</h4>
            {logoPreview && (
              <div className="mb-4 h-12 relative">
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="h-full object-contain"
                />
              </div>
            )}
            <div className="flex items-center space-x-4">
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'logo')}
                className="block w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {logoFile && (
                <button
                  type="button"
                  onClick={handleLogoUpload}
                  disabled={uploading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {uploading ? 'Mengunggah...' : 'Unggah'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-black mb-4">Informasi Dasar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Nama Produk *
            </label>
              <input
              type="text"
              name="nama"
              required
              value={formData.nama}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Contoh: Keramik Polos Putih"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Merk
            </label>
            <input
              type="text"
              name="merk"
              value={formData.merk}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Contoh: Roman, Mulia, Arwana"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Ukuran *
            </label>
            <input
              type="text"
              name="ukuran"
              required
              value={formData.ukuran}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Contoh: 30x30cm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Finish/Permukaan *
            </label>
            <select
              name="finish"
              required
              value={formData.finish}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">Pilih Finish</option>
              <option value="Matte">Matte</option>
              <option value="Glossy">Glossy</option>
              <option value="Polished">Polished</option>
              <option value="Textured">Textured</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-black mb-4">Detail Produk</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Tipe
            </label>
            <select
              name="tipe"
              value={formData.tipe}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">Pilih Tipe</option>
              <option value="Lantai">Lantai</option>
              <option value="Dinding">Dinding</option>
              <option value="Lantai & Dinding">Lantai & Dinding</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Area Penggunaan
            </label>
            <select
              name="area_penggunaan"
              value={formData.area_penggunaan}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">Pilih Area</option>
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Indoor & Outdoor">Indoor & Outdoor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Warna
            </label>
            <input
              type="text"
              name="warna"
              value={formData.warna}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Contoh: Putih, Abu-abu, Cokelat"
            />
          </div>

        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-black mb-2">
            Deskripsi
          </label>
          <textarea
            name="deskripsi"
            rows={4}
            value={formData.deskripsi}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="Deskripsi lengkap produk..."
          />
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-black mb-4">Pengaturan</h3>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_published"
            name="is_published"
            checked={formData.is_published}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="is_published" className="ml-2 block text-sm text-black">
            Publikasikan produk (tampil di website)
          </label>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Menyimpan...' : 'Simpan & Publikasikan'}
        </button>
      </div>
    </form>
  )
}