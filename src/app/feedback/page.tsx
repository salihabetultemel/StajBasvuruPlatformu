"use client";

import { useState } from "react";
import Navbar from "../../../components/navbar"; // Navbar importu
import SidebarMenu from "../../../components/sidebarmenu"; // Sidebar importu

export default function FeedbackPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Mesajınız alındı. Teşekkür ederiz!");
    console.log("Geri bildirim gönderildi:", form);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus(""), 5000);
  };

  return (
    // Ana kapsayıcı
    <div className="min-h-screen font-sans bg-gradient-to-br from-[#1f1c2c] via-[#302b63] to-[#24243e] text-gray-800">


      {/* Sidebar: Her zaman render edilir, görünürlüğü `isOpen` ile kontrol edilir */}
      <SidebarMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Ana İçerik Alanı Kapsayıcısı: Navbar ve asıl sayfa içeriğini içerir */}
      {/* Önceki flex container yapısını geri ekledim, belki gerekliydi */}
      <div className="flex flex-col">

        {/* Navbar: Sabitlenmiş ve z-index'i yüksek */}
        {/* Navbar component'inin fixed, z-50, h-20 içerdiğinden emin ol */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Sayfa İçeriği (Form Alanı) */}
        {/*
           !!! CSS Specificity sorununu aşmak için INLINE STYLE denemesi !!!
           pt-20 sınıfı kaldırıldı, yerine style eklendi.
           Navbar'ın h-20 (5rem) yüksekliği kadar padding veriyoruz.
        */}
        <main
          style={{ paddingTop: '5rem' }} // <-- ÖNEMLİ DEĞİŞİKLİK BURADA
          className={`p-6 sm:p-10 transition-all duration-300 ease-in-out ${ // pt-20 KALDIRILDI
            isSidebarOpen ? 'md:ml-64' : '' // Sidebar açıkken içeriği sağa kaydır (MD ve üzeri ekranlarda)
          }`}
        >
          {/* Form Kartı */}
          <div
            className="max-w-2xl mx-auto mt-6 p-8 rounded-lg shadow-md bg-white"
          >
            {/* Başlık */}
            <h1 className="text-3xl font-bold mb-6 text-center text-violet-700">
              Geri Bildirim
            </h1>
            {/* Açıklama */}
            <p className="mb-8 text-gray-600 text-center">
              Projemizi geliştirmemize yardımcı olmak için lütfen geri bildirimlerinizi bizimle paylaşın.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Adınız Input Alanı */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Adınız</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Adınız"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              {/* E-posta Input Alanı */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-posta Adresiniz</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="E-posta adresiniz"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              {/* Mesaj Textarea Alanı */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mesajınız</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Mesajınız"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                ></textarea>
              </div>
              {/* Gönder Butonu */}
              <div className="flex justify-start">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
                >
                  Gönder
                </button>
              </div>
              {/* Durum Mesajı Alanı */}
              {status && (
                <p className="mt-4 text-sm font-medium text-green-600">{status}</p>
              )}
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}