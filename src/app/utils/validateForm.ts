export function validateForm(
  formData: unknown
): string | null {
  if (typeof formData !== "object" || formData === null) {
    return "Form verisi hatalı.";
  }

  const {
    tcKimlik,
    ogrenciNo,
    eposta,
    telefon,
    baslangicTarihi,
    bitisTarihi,
    stajTuru,
    calismaGunleri = [],
  } = formData as {
    tcKimlik: string;
    ogrenciNo: string;
    eposta: string;
    telefon: string;
    baslangicTarihi: string;
    bitisTarihi: string;
    stajTuru: string;
    calismaGunleri?: string[];
  };

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

  // Tarih formatı kontrolü
  if (!/^\d{4}-\d{2}-\d{2}$/.test(baslangicTarihi) || !/^\d{4}-\d{2}-\d{2}$/.test(bitisTarihi)) {
    return "Tarih formatı hatalı. Lütfen YYYY-MM-DD formatında giriniz.";
  }

  const startDate = new Date(baslangicTarihi);
  const endDate = new Date(bitisTarihi);

  if (endDate < startDate) {
    return "Bitiş tarihi, başlangıç tarihinden önce olamaz.";
  }

  if (stajTuru === "donem") {
    if (calismaGunleri.length < 3) {
      return "Dönem içi stajda haftada en az 3 gün seçilmelidir.";
    }

    const dayMap: { [key: number]: string } = {
      0: "Pazar",
      1: "Pazartesi",
      2: "Salı",
      3: "Çarşamba",
      4: "Perşembe",
      5: "Cuma",
      6: "Cumartesi",
    };

    let workDayCount = 0;
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dayName = dayMap[d.getDay()];
      if (calismaGunleri.includes(dayName)) {
        workDayCount++;
      }
    }

    if (workDayCount !== 20) {
      return `Dönem içi staj süresi tam olarak 20 iş günü olmalıdır. Seçilen günlere göre bu aralıkta ${workDayCount} iş günü var.`;
    }
  }

  return null;
}
