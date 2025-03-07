"use client";

import Navbar from "../../../components/navbar";
import { useState } from "react";
import SidebarMenu from "../../../components/sidebarmenu";

export default function DocumentPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stajTuru, setStajTuru] = useState(""); // Yaz Stajı veya Dönem İçi
  const [ucretli, setUcretli] = useState(false);
  const [cumartesiCalisiyorMu, setCumartesiCalisiyorMu] = useState(false);
  const [hata, setHata] = useState("");

  // Form Bilgileri
  const [formData, setFormData] = useState({
    tcKimlik: "",
    adSoyad: "",
    dogumTarihi: "",
    ogrenciNo: "",
    eposta: "",
    telefon: "",
    stajYeri: "",
    faaliyetAlani: "",
    baslangicTarihi: "",
    bitisTarihi: "",
    calisanSayisi: "",
    muhendisSayisi: "",
    isverenAdi: "",
    isverenGorevi: "",
    isverenEposta: "",
    isverenTelefon: "",
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // TC Kimlik No, e-posta vb. inputları kontrol etme
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // TC Kimlik No için 11 karakter sınırı koy
    if (name === "tcKimlik" && value.length > 11) return;

    setFormData({ ...formData, [name]: value });
  };

  // 20 iş günü kontrolü
  const isGunleriniHesapla = (baslangic: string, bitis: string) => {
    let startDate = new Date(baslangic);
    let endDate = new Date(bitis);
    let count = 0;

    while (startDate <= endDate) {
      const day = startDate.getDay(); // 0 = Pazar, 6 = Cumartesi
      if (day !== 0 && (day !== 6 || cumartesiCalisiyorMu)) {
        count++;
      }
      startDate.setDate(startDate.getDate() + 1);
    }

    return count;
  };

  // PDF oluşturma işlemi
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isGunSayisi = isGunleriniHesapla(formData.baslangicTarihi, formData.bitisTarihi);

    // Tarih aralığı tam olarak 20 iş günü değilse hata ver
    if (isGunSayisi !== 20) {
      setHata(`Seçilen tarih aralığında tam olarak 20 iş günü olmalıdır. Şu an ${isGunSayisi} iş günü seçildi.`);
      return;
    }

    setHata("");

    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("PDF oluşturulamadı");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "staj_belgesi.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF oluşturma hatası:", error);
      setHata("PDF oluşturulurken hata meydana geldi.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Sidebar Menu */}
      <SidebarMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Navbar */}
      <div className="bg-gray-900 bg-opacity-95 fixed top-0 left-0 w-full z-50 shadow-lg">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>

      <h1 className="text-2xl font-bold mb-4">Belge Oluştur</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {/* Staj Türü Seçimi */}
        <label className="block mb-2 font-medium text-black">Staj Türü:</label>
        <select
          name="stajTuru"
          className="w-full p-2 border rounded mb-4 text-black"
          value={stajTuru}
          onChange={(e) => setStajTuru(e.target.value)}
          required
        >
          <option value="">Seçiniz</option>
          <option value="yaz">Yaz Stajı</option>
          <option value="donem">Dönem İçi Staj</option>
        </select>

        {/* Tüm Form Bilgileri */}
        {Object.keys(formData).map((key) => (
          <div key={key} className="mb-4">
            <label className="block font-medium text-black capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
            <input
              type={key.includes("Tarih") ? "date" : key.includes("eposta") ? "email" : "text"}
              name={key}
              value={formData[key as keyof typeof formData]}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        ))}

        {/* Cumartesi Çalışılıyor mu? */}
        <label className="block mb-2 font-medium text-black flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={cumartesiCalisiyorMu}
            onChange={(e) => setCumartesiCalisiyorMu(e.target.checked)}
          />
          Cumartesi çalışılıyor mu?
        </label>

        {/* Ücretli mi? */}
        <label className="block mb-2 font-medium text-black flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={ucretli}
            onChange={(e) => setUcretli(e.target.checked)}
          />
          Ücretli
        </label>

        {/* EK-2 Formu (Eğer Ücretliyse) */}
        {ucretli && (
          <div className="bg-gray-200 p-4 rounded mt-4">
            <h2 className="text-lg font-bold text-black">EK-2 Formu Bilgileri</h2>
            <label className="block mb-2 font-medium text-black">Stajyer Ödenecek Ücret:</label>
            <input
              type="text"
              name="stajUcreti"
              className="w-full p-2 border rounded mb-4 text-black"
              placeholder="TL cinsinden"
              required
            />
            <label className="block mb-2 font-medium text-black">Firma Vergi Numarası:</label>
            <input type="text" name="firmaVergiNo" className="w-full p-2 border rounded mb-4 text-black" required />
            <label className="block mb-2 font-medium text-black">Firma IBAN:</label>
            <input type="text" name="firmaIBAN" className="w-full p-2 border rounded mb-4 text-black" required />
          </div>
        )}

        {/* Hata mesajı */}
        {hata && <p className="text-red-500">{hata}</p>}

        {/* PDF Oluştur Butonu */}
        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded mt-4 hover:bg-purple-800 transition"
        >
          PDF Oluştur
        </button>
      </form>
    </div>
  );
}
