export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Tentang Kami
          </h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Katalog Keramik Online
              </h2>
              <p className="text-gray-600 mb-6">
                Selamat datang di katalog keramik online kami. Kami menyediakan berbagai macam produk keramik berkualitas tinggi untuk kebutuhan interior dan eksterior Anda.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Produk Kami
              </h3>
              <p className="text-gray-600 mb-6">
                Kami menawarkan berbagai jenis keramik dengan berbagai ukuran, finish, dan warna untuk memenuhi kebutuhan desain Anda. Dari keramik dinding hingga lantai, indoor maupun outdoor.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Fitur Katalog
              </h3>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• Pencarian dan filter produk yang mudah digunakan</li>
                <li>• Detail produk lengkap dengan spesifikasi teknis</li>
                <li>• Galeri inspirasi untuk ide desain</li>
                <li>• Fitur favorit untuk menyimpan produk pilihan</li>
                <li>• Kontak WhatsApp langsung untuk informasi lebih lanjut</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Kontak Kami
              </h3>
              <p className="text-gray-600">
                Untuk informasi lebih lanjut atau pertanyaan mengenai produk kami, silakan hubungi kami melalui WhatsApp yang tersedia di setiap halaman produk.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <a
              href="https://wa.me/6281298883897"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Hubungi Kami via WhatsApp
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}