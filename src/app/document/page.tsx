"use client";

import Navbar from "../../../components/navbar";
import { useState } from "react";
import SidebarMenu from "../../../components/sidebarmenu";
import { validateForm } from "../utils/validateForm";

export default function DocumentPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stajTuru, setStajTuru] = useState("");
  const [ucretli, setUcretli] = useState(false);
  const [cumartesiCalisiyorMu, setCumartesiCalisiyorMu] = useState(false);
  const [hata, setHata] = useState("");

  const [formData, setFormData] = useState({
    tcKimlik: "33303602036",
    adSoyad: "ali",
    dogumTarihi: "2002-01-20",
    ogrenciNo: "45645646464",
    bolum: "bilg müh",
    eposta: "ali@gmial.com",
    telefon: "5562362365",
    stajYeri: "akdlsjds",
    faaliyetAlani: "yazuılm",
    baslangicTarihi: "2025-07-07",
    bitisTarihi: "2025-08-05",
    calisanSayisi: "5",
    muhendisSayisi: "5",
    isverenAdi: "ldldl",
    isverenGorevi: "müh",
    isverenEposta: "müh@gmail.com",
    isverenTelefon: "5562365623",
    faksNo: "1313131313131",
    stajUcreti: "3000",
    firmaVergiNo: "4545454545",
    vergiDairesi: "ist ",
    firmaAdi: "akakaka",
    firmaAdres: "aldksdkşskdşa",
    firmaTelefon: "5556662323",
    firmaBanka: "aknank",
    firmaIBAN: "tr6464654646644",
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if ((name === "tcKimlik" && value.length > 11) || (name === "ogrenciNo" && value.length > 12)) {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hataMesaji = validateForm(formData, cumartesiCalisiyorMu);
    if (hataMesaji) {
      setHata(hataMesaji);
      return;
    }

    setHata("");

    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, ucretli, cumartesiCalisiyorMu, stajTuru }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "PDF oluşturulamadı");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "staj_belgesi.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error("PDF oluşturma hatası:", error.message);
      setHata(`PDF oluşturulamadı: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <SidebarMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="bg-gray-900 bg-opacity-95 fixed top-0 left-0 w-full z-50 shadow-lg">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>

      <h1 className="text-2xl font-bold mb-4">Belge Oluştur</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full">
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

        {Object.keys(formData)
          .filter(
            (key) =>
              ![
                "firmaVergiNo",
                "vergiDairesi",
                "firmaAdi",
                "firmaAdres",
                "firmaBanka",
                "firmaIBAN",
                "stajUcreti",
                "firmaTelefon",
              ].includes(key)
          )
          .map((key) => (
            <div key={key} className="mb-4">
              <label className="block font-medium text-black capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type={key.includes("Tarihi") ? "date" : key.includes("eposta") ? "email" : "text"}
                name={key}
                value={formData[key as keyof typeof formData]}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>
          ))}

        <label className="block mb-2 font-medium text-black flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={cumartesiCalisiyorMu}
            onChange={(e) => setCumartesiCalisiyorMu(e.target.checked)}
          />
          Cumartesi çalışılıyor mu?
        </label>

        <label className="block mb-2 font-medium text-black flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={ucretli}
            onChange={(e) => setUcretli(e.target.checked)}
          />
          Ücretli
        </label>

        {ucretli && (
          <div className="bg-gray-200 p-4 rounded mt-4">
            <h2 className="text-lg font-bold text-black mb-2">EK-2 Formu Bilgileri</h2>
            {[
              { name: "stajUcreti", label: "Stajyer Ödenecek Ücret" },
              { name: "firmaVergiNo", label: "Firma Vergi No" },
              { name: "vergiDairesi", label: "Vergi Dairesi" },
              { name: "firmaAdi", label: "Firma Adı" },
              { name: "firmaAdres", label: "Firma Adresi" },
              { name: "firmaTelefon", label: "Firma Telefon" },
              { name: "firmaBanka", label: "Firma Banka / Şube" },
              { name: "firmaIBAN", label: "Firma IBAN" },
            ].map(({ name, label }) => (
              <div key={name} className="mb-4">
                <label className="block font-medium text-black">{label}:</label>
                <input
                  type="text"
                  name={name}
                  value={formData[name as keyof typeof formData] || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded text-black"
                  required
                />
              </div>
            ))}
          </div>
        )}

        {hata && <p className="text-red-500">{hata}</p>}

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
