// app/about/page.tsx

"use client";

import { useState } from "react";
import Navbar from "../../../components/navbar"; // Doğru yolu kontrol et
import SidebarMenu from "../../../components/sidebarmenu"; // Doğru yolu kontrol et

export default function AboutPage() {
  // Sidebar durumunu yönetmek için state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sidebar'ı açıp kapatan fonksiyon
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Genel stil sınıfları (Tailwind)
  const primaryBg = "bg-gray-100";
  const primaryText = "text-gray-800";
  const cardBg = "bg-white";
  const accentColor = "text-violet-700";
  const headingColor = "text-gray-900"; // Ana başlıklar için
  const paragraphColor = "text-gray-600"; // Paragraf metinleri için

  return (
    // Ana kapsayıcı
    <div className={`min-h-screen font-sans ${primaryBg} ${primaryText}`}>

      {/* Sidebar: Her zaman render edilir, görünürlüğü `isOpen` ile kontrol edilir */}
      <SidebarMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Navbar: Sabitlenmiş ve z-index'i yüksek olmalı (Navbar component'inin kendisinde ayarlı) */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Sayfa İçeriği Alanı */}
      {/* Navbar'ın yüksekliği (5rem = h-20) kadar padding-top UYGULANMALI */}
      <main
        style={{ paddingTop: '5rem' }} // Güvenilir yöntem olarak inline style kullanıldı
        className={`p-6 sm:p-10 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'md:ml-64' : '' // Sidebar açıkken içeriği sağa kaydır
        }`}
      >
        {/* İçerik Kartı */}
        <div className={`max-w-4xl mx-auto mt-6 p-8 rounded-lg shadow-md ${cardBg}`}>
          {/* Sayfa Başlığı */}
          <h1 className={`text-3xl sm:text-4xl font-bold mb-8 text-center ${accentColor}`}>
            Platform Hakkında
          </h1>

          {/* İçerik Alanı */}
          <div className="space-y-6 text-base sm:text-lg leading-relaxed"> {/* Okunabilirlik için satır aralığı */}

            {/* Giriş Paragrafı */}
            <p className={paragraphColor}>
              Bu platform, <strong className={headingColor}>Saliha Betül Temel</strong> tarafından bir bitirme projesi olarak hayata geçirilmiştir. Öncelikli hedefi, üniversite öğrencilerinin staj başvuru süreçlerini dijitalleştirerek daha <strong className={headingColor}>hızlı, kolay erişilebilir ve verimli</strong> hale getirmektir.
            </p>

            {/* Öğrencilere Yönelik Faydalar */}
            <div>
              <h2 className={`text-2xl font-semibold mt-6 mb-3 ${headingColor}`}>
                Öğrenciler İçin Neler Sunuyor?
              </h2>
              <p className={paragraphColor}>
                Stajyer adayları, platformumuz aracılığıyla başvuruları için gerekli tüm bilgilere ve belgelere merkezi bir noktadan ulaşabilirler. Başvuru adımlarını takip etmek, belgeleri yüklemek ve süreci yönetmek artık çok daha basit. Amacımız, öğrencilerin bürokratik işlemlerle daha az zaman harcayarak staj deneyimine odaklanmalarını sağlamaktır.
              </p>
            </div>

            {/* Chatbot Özelliği */}
            <div>
              <h2 className={`text-2xl font-semibold mt-6 mb-3 ${headingColor}`}>
                Akıllı Yardımcınız: Chatbot
              </h2>
              <p className={paragraphColor}>
                Platformun yenilikçi özelliklerinden biri, entegre <strong className={headingColor}>chatbot</strong> sistemidir. Bu chatbot, yaygın öğrenci soruları ve üniversitenin staj el kitabı gibi kaynaklarla eğitilmiştir. Öğrencilerin staj süreciyle ilgili sorularına <strong className={headingColor}>anında ve doğru yanıtlar</strong> sunarak, onlara yol gösterir ve olası kafa karışıklıklarını giderir. Chatbot, 7/24 destek sağlayarak bilgiye erişimi kolaylaştırır.
              </p>
            </div>

            {/* Danışmanlara Yönelik Faydalar */}
            <div>
              <h2 className={`text-2xl font-semibold mt-6 mb-3 ${headingColor}`}>
                Danışmanlar İçin Kolaylık ve Verimlilik
              </h2>
              <p className={paragraphColor}>
                Bu platform, sadece öğrencilere değil, aynı zamanda değerli danışman öğretim üyelerine de önemli avantajlar sunar. Tekrarlayan soruların chatbot tarafından yanıtlanması ve başvuru süreçlerinin dijital ortamda takip edilebilmesi, danışmanların <strong className={headingColor}>idari yükünü önemli ölçüde azaltır.</strong> Bu sayede, öğretim üyeleri öğrencilere akademik ve kariyer odaklı rehberlik için daha fazla zaman ayırabilirler. Platform, genel süreç yönetimini iyileştirerek tüm paydaşlar için daha etkin bir staj deneyimi yaratmayı hedefler.
              </p>
            </div>

             {/* Sonuç Mesajı */}
             <p className={`mt-10 text-center font-medium ${paragraphColor}`}>
                Staj başvurusu yolculuğunuzda size destek olmak ve süreci kolaylaştırmak için buradayız!
             </p>

          </div>
        </div>
      </main>
    </div>
  );
}