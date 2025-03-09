import { isWeekend, addDays } from "date-fns";

// Türkiye için resmi tatil listesi (Gerekirse güncellenebilir)
const resmiTatilListesi = [
  "2025-01-01", // Yılbaşı
  "2025-04-23", // 23 Nisan Ulusal Egemenlik ve Çocuk Bayramı
  "2025-05-01", // İşçi Bayramı
  "2025-05-19", // Atatürk'ü Anma, Gençlik ve Spor Bayramı
  "2025-07-15", // Demokrasi ve Milli Birlik Günü
  "2025-08-30", // Zafer Bayramı
  "2025-10-29", // Cumhuriyet Bayramı
];

/**
 * Belirtilen başlangıç ve bitiş tarihleri arasında kaç iş günü olduğunu hesaplar.
 * @param baslangicTarihi Başlangıç tarihi (YYYY-MM-DD)
 * @param bitisTarihi Bitiş tarihi (YYYY-MM-DD)
 * @param cumartesiDahil Cumartesi günleri iş günü olarak sayılacak mı?
 * @returns İş günü sayısı
 */
export function isGunleriniHesapla(
  baslangicTarihi: string,
  bitisTarihi: string,
  cumartesiDahil: boolean
): number {
  let startDate = new Date(baslangicTarihi);
  let endDate = new Date(bitisTarihi);
  let isGunleri = 0;

  while (startDate <= endDate) {
    const tarihStr = startDate.toISOString().split("T")[0]; // YYYY-MM-DD formatına çevir
    const haftaSonuMu = isWeekend(startDate);
    const tatilMi = resmiTatilListesi.includes(tarihStr);

    // Eğer cumartesi iş günü olarak sayılacaksa, sadece Pazar'ı (0) çıkar.
    if ((!haftaSonuMu || (cumartesiDahil && startDate.getDay() !== 0)) && !tatilMi) {
      isGunleri++;
    }

    startDate = addDays(startDate, 1); // Bir gün ileri git
  }

  return isGunleri;
}
