import { isGunleriniHesapla } from "./isGunleriniHesapla"; // İş günü hesaplama fonksiyonu

export function validateForm(formData: any, cumartesiDahil: boolean): string | null {
  const { tcKimlik, ogrenciNo, eposta, telefon, baslangicTarihi, bitisTarihi } = formData;

  // TC Kimlik No doğrulama
  if (tcKimlik.length !== 11 || !/^\d+$/.test(tcKimlik)) {
    return "TC Kimlik Numarası 11 haneli ve sadece rakamlardan oluşmalıdır.";
  }

  // Öğrenci No doğrulama
  if (ogrenciNo.length !== 12 || !/^\d+$/.test(ogrenciNo)) {
    return "Öğrenci Numarası 12 haneli ve sadece rakamlardan oluşmalıdır.";
  }

  // E-posta doğrulama
  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(eposta)) {
    return "Geçerli bir e-posta adresi giriniz.";
  }

  // Telefon doğrulama (10 haneli, sadece rakam)
  if (!/^\d{10}$/.test(telefon)) {
    return "Telefon numarası 10 haneli olmalıdır (örn: 5551234567).";
  }

  // Tarih formatı ve iş günü hesaplama
  if (!/^\d{4}-\d{2}-\d{2}$/.test(baslangicTarihi) || !/^\d{4}-\d{2}-\d{2}$/.test(bitisTarihi)) {
    return "Tarih formatı hatalı. Lütfen YYYY-MM-DD formatında giriniz.";
  }

  const isGunleri = isGunleriniHesapla(baslangicTarihi, bitisTarihi, cumartesiDahil);
  if (isGunleri !== 20) {
    return `Staj süresi tam olarak 20 iş günü olmalıdır. Şu an hesaplanan: ${isGunleri} iş günü.`;
  }

  return null; // Hata yoksa null dön
}
