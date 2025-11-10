'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-400/90 to-amber-200/90 backdrop-blur-sm text-white mt-16 border-t border-amber-400/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-stone-700 to-amber-600 bg-clip-text text-transparent tracking-wide font-playfair">
                PT. PRIMARINDO ARGATILE
              </h1>
              <p className="text-black/90 text-sm mt-2 font-bold">PRIMATILES High Quality Ceramic Tiles</p>
            </div>
            <p className="text-black/90 text-sm leading-relaxed font-bold italic">
                Kami Menyediakan Berbagai Macam Keramik Berkualitas Tinggi Untuk Kebutuhan Interior dan Eksterior Anda.
              </p>
          </div>

          {/* Factory Address */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-amber-600 flex items-center font-poppins">
              Factory
            </h4>
            <p className="text-black/90 text-sm leading-relaxed font-bold">
              Jl. Raya Jakarta–Serang KM. 68<br />
              Desa Nambo Ilir, Kecamatan Kibin<br />
              Kabupaten Serang - Banten
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center text-black/90 text-sm font-inter group hover:text-amber-300 transition-colors duration-300 cursor-pointer">
                <Phone className="h-4 w-4 mr-2 transform group-hover:rotate-12 transition-transform duration-300" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">+62 812-9888-3897</span>
              </div>
              <div className="flex items-center text-black/90 text-sm font-inter group hover:text-amber-300 transition-colors duration-300 cursor-pointer">
                <Mail className="h-4 w-4 mr-2 transform group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">info@primarindo-argatile.com</span>
              </div>
              <div className="flex items-center text-black/90 text-sm font-inter group hover:text-amber-300 transition-colors duration-300 cursor-pointer">
                <Clock className="h-4 w-4 mr-2 transform group-hover:rotate-180 transition-transform duration-700" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">Senin - Jumat: 08:00 - 17:00</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
              <h4 className="text-lg font-semibold text-amber-600 font-poppins">Tautan Cepat</h4>
            <nav className="space-y-2">
              <Link href="/" className="block text-black/90 hover:text-amber-300 transition-all duration-300 text-sm font-inter transform hover:translate-x-2">
                Beranda
              </Link>
              <Link href="/produk" className="block text-black/90 hover:text-amber-300 transition-all duration-300 text-sm font-inter transform hover:translate-x-2">
                Produk
              </Link>
              <Link href="/inspirasi" className="block text-black/90 hover:text-amber-300 transition-all duration-300 text-sm font-inter transform hover:translate-x-2">
                Inspirasi
              </Link>
              <Link href="/tentang" className="block text-black/90 hover:text-amber-300 transition-all duration-300 text-sm font-inter transform hover:translate-x-2">
                Tentang Kami
              </Link>
              <Link href="/kontak" className="block text-black/90 hover:text-amber-300 transition-all duration-300 text-sm font-inter transform hover:translate-x-2">
                Kontak
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-700 mt-8 pt-8">
          <p className="text-black/80 text-center text-sm font-bold font-bold">
            © 2024 PT. PRIMARINDO ARGATILE BY NAGA HITAM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}