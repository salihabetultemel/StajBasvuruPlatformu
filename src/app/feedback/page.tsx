"use client";

import { useState } from "react";
import Navbar from "../../../components/navbar";

export default function FeedbackPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Backend henüz yok, sadece mesaj gösteriyoruz
    setStatus("Mesajınız alındı. Teşekkür ederiz!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen p-10 font-sans bg-gray-50">
      <Navbar toggleSidebar={() => {}} />
      <div className="max-w-2xl mx-auto text-center mt-10">
        <h1 className="text-3xl font-bold mb-4">Proje Hakkında</h1>
        <p className="mb-8 text-gray-700">
          Bu platform, Balıkesir Üniversitesi Bilgisayar Mühendisliği öğrencileri için geliştirilmiş bir
          Yapay Zeka Destekli Staj Başvuru Platformudur. Öğrenciler chatbot aracılığıyla staj süreciyle ilgili sorular sorabilir,
          belgeleri doğru şekilde doldurabilir ve başvurularını kolayca yönetebilir.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Geri Bildirim Bırak</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <input
            type="text"
            name="name"
            placeholder="Adınız"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-posta adresiniz"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded"
            required
          />
          <textarea
            name="message"
            placeholder="Mesajınız"
            value={form.message}
            onChange={handleChange}
            rows={5}
            className="w-full border border-gray-300 p-3 rounded"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Gönder
          </button>
        </form>

        {status && <p className="mt-4 text-sm text-green-600">{status}</p>}
      </div>
    </div>
  );
}
