import { NextResponse } from "next/server";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
import convert from "docx2pdf";
import { readFile } from "fs/promises";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

// Tarih formatlama fonksiyonu
const formatDate = (isoDate: string) => {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  return `${day}.${month}.${year}`;
};

// Şablon doldurma fonksiyonu (setData + render)
async function fillTemplate(templatePath: string, fullData: any) {
  const templateBuffer = await readFile(templatePath, "binary");
  const zip = new PizZip(templateBuffer);
  const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

  // ✅ Doğru kullanım: eski ve garantili olan
  doc.setData(fullData);

  try {
    doc.render();
  } catch (error: any) {
    console.error("❌ Şablon doldurma hatası:", error);
    throw new Error("Şablon doldurulurken hata oluştu.");
  }

  const outputPath = templatePath.replace(".docx", "_filled.docx");
  const generatedBuffer = doc.getZip().generate({ type: "nodebuffer" });
  writeFileSync(outputPath, generatedBuffer);
  return outputPath;
}

// Ana POST handler
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { stajTuru, ucretli, cumartesiCalisiyorMu, calismaGunleri = [], ...formData } = data;

    const fullData: any = {
      adSoyad: formData.adSoyad || "",
      tcKimlik: formData.tcKimlik || "",
      dogumTarihi: formatDate(formData.dogumTarihi),
      ogrenciNo: formData.ogrenciNo || "",
      bolum: formData.bolum || "",
      eposta: formData.eposta || "",
      telefon: formData.telefon || "",
      stajYeri: formData.stajYeri || "",
      faaliyetAlani: formData.faaliyetAlani || "",
      baslangicTarihi: formatDate(formData.baslangicTarihi),
      bitisTarihi: formatDate(formData.bitisTarihi),
      calisanSayisi: formData.calisanSayisi || "",
      muhendisSayisi: formData.muhendisSayisi || "",
      isverenAdi: formData.isverenAdi || "",
      isverenGorevi: formData.isverenGorevi || "",
      isverenEposta: formData.isverenEposta || "",
      isverenTelefon: formData.isverenTelefon || "",
      faksNo: formData.faksNo || "",
      stajUcreti: formData.stajUcreti || "",
      firmaVergiNo: formData.firmaVergiNo || "",
      vergiDairesi: formData.vergiDairesi || "",
      firmaAdi: formData.firmaAdi || "",
      firmaAdres: formData.firmaAdres || "",
      firmaTelefon: formData.firmaTelefon || "",
      firmaBanka: formData.firmaBanka || "",
      firmaIBAN: formData.firmaIBAN || "",
      stajYeritelefon: formData.stajYeritelefon || "",
      stajyerieposta: formData.stajyerieposta || "",
      stajTuru,
      ucretli,
      cumartesiCalisiyorMu,
    };

    // Dönem içi staj ise çalışma günlerini işaretle
    if (stajTuru === "donem") {
      const gunMap: { [key: string]: string } = {
        Pazartesi: "gun_pzt",
        Salı: "gun_sal",
        Çarşamba: "gun_car",
        Perşembe: "gun_per",
        Cuma: "gun_cum",
        Cumartesi: "gun_cmt",
      };

      Object.entries(gunMap).forEach(([gun, key]) => {
        fullData[key] = calismaGunleri.includes(gun) ? "X" : "";
      });
    }

    const documentsDir = path.join(process.cwd(), "public/documents");
    const outputDir = path.join(process.cwd(), "public/output");
    if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

    const templateName = stajTuru === "yaz" ? "staj_yaz.docx" : "staj_donem.docx";
    const templatePath = path.join(documentsDir, templateName);
    if (!existsSync(templatePath)) throw new Error(`Şablon dosyası bulunamadı: ${templateName}`);

    const filledDocs = [await fillTemplate(templatePath, fullData)];

    if (ucretli) {
      const ek2Path = path.join(documentsDir, "ek2.docx");
      if (existsSync(ek2Path)) {
        const filledEk2Path = await fillTemplate(ek2Path, fullData);
        filledDocs.push(filledEk2Path);
      }
    }

    const pdfPaths = [];
    for (const docPath of filledDocs) {
      await convert(docPath);
      pdfPaths.push(docPath.replace(".docx", ".pdf"));
    }

    const finalPdfPath = pdfPaths[0];
    const pdfBuffer = await readFile(finalPdfPath);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="staj_belgesi.pdf"',
      },
    });
  } catch (error: any) {
    console.error("❌ Hata:", error.message);
    return new NextResponse(error.message || "Hata oluştu", { status: 500 });
  }
}
