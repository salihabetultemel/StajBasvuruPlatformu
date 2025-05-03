"use client";

import { useState } from "react";
import Navbar from "../../../components/navbar";
import SidebarMenu from "../../../components/sidebarmenu";

export default function AboutPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen font-sans bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 ease-in-out">
      {/* Sidebar */}
      <SidebarMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-[var(--card-bg)] bg-opacity-90 border-b border-[var(--border-color)]">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content */}
      <main
        style={{ paddingTop: "5rem" }}
        className={`p-6 sm:p-10 ${isSidebarOpen ? "md:ml-64" : ""}`}
      >
        <div className="max-w-4xl mx-auto mt-6 p-8 rounded-lg shadow-md bg-[var(--card-bg)] text-[var(--card-text)] border border-[var(--border-color)] transition-all duration-300">
          {/* Başlık */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-[var(--foreground)]">
            Platform Hakkında
          </h1>

          {/* İçerik */}
          <div className="space-y-6 text-base sm:text-lg leading-relaxed">
            <p>
              Bu platform,{" "}
              <strong className="text-[var(--foreground)]">Saliha Betül Temel</strong>{" "}
              tarafından bir bitirme projesi olarak hayata geçirilmiştir. Öncelikli hedefi,
              üniversite öğrencilerinin staj başvuru süreçlerini dijitalleştirerek daha{" "}
              <strong className="text-[var(--foreground)]">
                hızlı, kolay erişilebilir ve verimli
              </strong>{" "}
              hale getirmektir.
            </p>

            {/* Öğrenci Faydaları */}
            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-3 text-[var(--foreground)]">
                Öğrenciler İçin Neler Sunuyor?
              </h2>
              <p>
                Stajyer adayları, platformumuz aracılığıyla başvuruları için gerekli tüm bilgilere
                ve belgelere merkezi bir noktadan ulaşabilirler. Başvuru adımlarını takip etmek,
                belgeleri yüklemek ve süreci yönetmek artık çok daha basit. Amacımız, öğrencilerin
                bürokratik işlemlerle daha az zaman harcayarak staj deneyimine odaklanmalarını
                sağlamaktır.
              </p>
            </section>

            {/* Chatbot Özelliği */}
            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-3 text-[var(--foreground)]">
                Akıllı Yardımcınız: Chatbot
              </h2>
              <p>
                Platformun yenilikçi özelliklerinden biri, entegre <strong>chatbot</strong>{" "}
                sistemidir. Bu chatbot, yaygın öğrenci soruları ve üniversitenin staj el kitabı gibi
                kaynaklarla eğitilmiştir. Öğrencilerin staj süreciyle ilgili sorularına{" "}
                <strong>anında ve doğru yanıtlar</strong> sunarak, onlara yol gösterir ve olası kafa
                karışıklıklarını giderir. Chatbot, 7/24 destek sağlayarak bilgiye erişimi
                kolaylaştırır.
              </p>
            </section>

            {/* Danışmanlara Faydalar */}
            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-3 text-[var(--foreground)]">
                Danışmanlar İçin Kolaylık ve Verimlilik
              </h2>
              <p>
                Bu platform, sadece öğrencilere değil, aynı zamanda değerli danışman öğretim
                üyelerine de önemli avantajlar sunar. Tekrarlayan soruların chatbot tarafından
                yanıtlanması ve başvuru süreçlerinin dijital ortamda takip edilebilmesi,
                danışmanların{" "}
                <strong>idari yükünü önemli ölçüde azaltır.</strong> Bu sayede, öğretim üyeleri
                öğrencilere akademik ve kariyer odaklı rehberlik için daha fazla zaman
                ayırabilirler.
              </p>
            </section>

            <p className="mt-10 text-center font-medium text-[var(--foreground)]">
              Staj başvurusu yolculuğunuzda size destek olmak ve süreci kolaylaştırmak için
              buradayız!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
