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
  const [calismaGunleri, setCalismaGunleri] = useState<string[]>([]);
  const [hata, setHata] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    tcKimlik: "",
    adSoyad: "",
    dogumTarihi: "",
    ogrenciNo: "",
    bolum: "",
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
    faksNo: "",
    stajUcreti: "",
    firmaVergiNo: "",
    vergiDairesi: "",
    firmaAdi: "",
    firmaAdres: "",
    firmaTelefon: "",
    firmaBanka: "",
    firmaIBAN: "",
    stajYeritelefon: "",
    stajyerieposta: "",
  });


  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if ((name === "tcKimlik" && value.length > 11) || (name === "ogrenciNo" && value.length > 12)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function calculateWorkingDays(start: string, end: string, selectedDays: string[]) {
    const dayMap: { [key: number]: string } = {
      0: "Pazar",
      1: "Pazartesi",
      2: "Salı",
      3: "Çarşamba",
      4: "Perşembe",
      5: "Cuma",
      6: "Cumartesi",
    };
    const startDate = new Date(start);
    const endDate = new Date(end);
    let count = 0;
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dayName = dayMap[d.getDay()];
      if (selectedDays.includes(dayName)) count++;
    }
    return count;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hataMesaji = validateForm(formData);
    if (hataMesaji) {
      setHata(hataMesaji);
      return;
    }

    if (stajTuru === "donem") {
      if (calismaGunleri.length < 3) {
        setHata("Dönem içi staj için haftada en az 3 gün seçilmelidir.");
        return;
      }
      const workDayCount = calculateWorkingDays(
        formData.baslangicTarihi,
        formData.bitisTarihi,
        calismaGunleri
      );
      if (workDayCount < 20) {
        setHata(`Seçtiğiniz günlerle bu tarih aralığında sadece ${workDayCount} iş günü var. En az 20 iş günü gerekir.`);
        return;
      }
    }

    setHata("");
    setLoading(true);

    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ucretli,
          cumartesiCalisiyorMu,
          stajTuru,
          calismaGunleri,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "PDF oluşturulamadı");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "staj_belgesi.docx";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF oluşturma hatası:", err);
      setHata("PDF oluşturulamadı");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans">
      <SidebarMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="bg-[var(--card-bg)] bg-opacity-95 fixed top-0 left-0 w-full z-50 border-b border-[var(--border-color)]">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex flex-col items-center mt-5 px-4">
        <h1 className="text-4xl font-extrabold mb-6 text-[var(--foreground)] drop-shadow-md">Belge Oluştur</h1>

        <form onSubmit={handleSubmit} className="bg-[var(--card-bg)] text-[var(--card-text)] p-8 rounded-2xl shadow-2xl w-full max-w-2xl border border-[var(--border-color)]">
          <label className="block mb-2 font-medium">Staj Türü:</label>
          <select
            name="stajTuru"
            className="w-full p-2 border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--card-text)] rounded-lg mb-4"
            value={stajTuru}
            onChange={(e) => setStajTuru(e.target.value)}
            required
          >
            <option value="">Seçiniz</option>
            <option value="yaz">Yaz Stajı</option>
            <option value="donem">Dönem İçi Staj</option>
          </select>

          {stajTuru === "donem" && (
            <div className="mb-4">
              <label className="block font-medium mb-2">
                Haftalık Çalışma Günleri (en az 3 gün):
              </label>
              {["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"].map((gün) => (
                <label key={gün} className="inline-flex items-center mr-4 mb-1">
                  <input
                    type="checkbox"
                    className="accent-purple-600 mr-2"
                    checked={calismaGunleri.includes(gün)}
                    onChange={(e) => {
                      setCalismaGunleri(
                        e.target.checked
                          ? [...calismaGunleri, gün]
                          : calismaGunleri.filter((g) => g !== gün)
                      );
                    }}
                  />
                  {gün}
                </label>
              ))}
            </div>
          )}

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
                <label className="block font-medium capitalize mb-1">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type={
                    key.toLowerCase().includes("tarihi")
                      ? "date"
                      : key.toLowerCase().includes("eposta")
                        ? "email"
                        : "text"
                  }
                  name={key}
                  value={formData[key as keyof typeof formData]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--card-text)] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>
            ))}

          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              className="mr-2 accent-purple-600"
              checked={cumartesiCalisiyorMu}
              onChange={(e) => setCumartesiCalisiyorMu(e.target.checked)}
            />
            Cumartesi çalışılıyor mu?
          </label>

          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              className="mr-2 accent-purple-600"
              checked={ucretli}
              onChange={(e) => setUcretli(e.target.checked)}
            />
            Ücretli
          </label>

          {ucretli && (
            <div className="bg-[var(--background)] p-4 rounded-xl mt-4 border border-[var(--border-color)]">
              <h2 className="text-lg font-semibold mb-2">EK-2 Formu Bilgileri</h2>
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
                  <label className="block font-medium">{label}:</label>
                  <input
                    type="text"
                    name={name}
                    value={formData[name as keyof typeof formData] || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--card-text)] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>
              ))}
            </div>
          )}

          {hata && <p className="text-red-500 mt-4">{hata}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-bold py-2 rounded-lg mt-6 transition ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-purple-700 hover:bg-purple-800"
              }`}
          >
            {loading ? "Oluşturuluyor..." : "PDF Oluştur"}
          </button>
        </form>
      </div>
    </div>
  );
}