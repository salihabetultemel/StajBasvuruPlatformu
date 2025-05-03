"use client";

import { useState } from "react";
import Navbar from "../../../components/navbar"; // Varsayılan path, kendi yapınıza göre düzeltin
import SidebarMenu from "../../../components/sidebarmenu"; // Varsayılan path, kendi yapınıza göre düzeltin

export default function FeedbackPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error', message: string }>({ type: 'idle', message: '' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Gönderiliyor...' }); // Gönderim başladığında durumu güncelle

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        // Sunucudan gelen hata mesajını kullan veya genel bir mesaj göster
        throw new Error(result.error || 'Bir hata oluştu.');
      }

      // Başarılı ise
      setStatus({ type: 'success', message: 'Mesajınız başarıyla alındı. Teşekkür ederiz!' });
      console.log("Geri bildirim başarıyla gönderildi:", result);
      setForm({ name: "", email: "", message: "" }); // Formu temizle

      // 5 saniye sonra başarı mesajını temizle
      setTimeout(() => setStatus({ type: 'idle', message: '' }), 5000);

    } catch (error) {
      // Hata durumunda
      console.error("Geri bildirim gönderilirken hata:", error);
      const errorMessage = error instanceof Error ? error.message : 'Mesaj gönderilemedi. Lütfen tekrar deneyin.';
      setStatus({ type: 'error', message: `Hata: ${errorMessage}` });

      // Hata mesajını bir süre sonra temizleyebilirsiniz, isteğe bağlı
      // setTimeout(() => setStatus({ type: 'idle', message: '' }), 7000);
    }
  };
  return (
    <div className="min-h-screen font-sans bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 ease-in-out">
      <SidebarMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-col">
        <div className="fixed top-0 left-0 w-full z-50 bg-[var(--card-bg)] bg-opacity-90 border-b border-[var(--border-color)]">
          <Navbar toggleSidebar={toggleSidebar} />
        </div>

        <main
          style={{ paddingTop: '5rem' }}
          className={`p-6 sm:p-10 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'md:ml-64' : ''
          }`}
        >
          <div className="max-w-2xl mx-auto mt-6 p-8 rounded-lg shadow-md bg-[var(--card-bg)] text-[var(--card-text)] border border-[var(--border-color)]">
            <h1 className="text-3xl font-bold mb-6 text-center text-purple-700 dark:text-purple-300">
              Geri Bildirim
            </h1>

            <p className="mb-8 text-center text-[var(--foreground)]">
              Projemizi geliştirmemize yardımcı olmak için lütfen geri bildirimlerinizi bizimle paylaşın.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Input alanları aynı kalacak */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Adınız</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Adınız"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--card-text)] rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                  required
                  disabled={status.type === 'loading'} // Gönderim sırasında disable et
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">E-posta Adresiniz</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="E-posta adresiniz"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--card-text)] rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                  required
                  disabled={status.type === 'loading'} // Gönderim sırasında disable et
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Mesajınız</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Mesajınız"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--card-text)] rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                  required
                  disabled={status.type === 'loading'} // Gönderim sırasında disable et
                ></textarea>
              </div>

              <div className="flex justify-start items-center space-x-4">
                <button
                  type="submit"
                  className={`bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150 ${status.type === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={status.type === 'loading'} // Gönderim sırasında butonu disable et
                >
                  {status.type === 'loading' ? 'Gönderiliyor...' : 'Gönder'}
                </button>

                {/* Durum Mesajı */}
                {status.message && (
                  <p className={`text-sm font-medium ${
                    status.type === 'success' ? 'text-green-600' :
                    status.type === 'error' ? 'text-red-600' :
                    'text-gray-500' // loading durumu için
                  }`}>
                    {status.message}
                  </p>
                )}
              </div>

            </form>
          </div>
        </main>
      </div>
    </div>
  );
}