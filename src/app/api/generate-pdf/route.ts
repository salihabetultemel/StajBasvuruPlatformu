import { NextResponse } from "next/server";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
import convert from "docx2pdf";
import { readFile } from "fs/promises";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

// Tarih formatlama fonksiyonu
const formatDate = (isoDate: string) => {
  const [year, month, day] = isoDate.split("-");
  return `${day}.${month}.${year}`;
};

// Şablon doldurma
async function fillTemplate(templatePath: string, fullData: any) {
  const templateBuffer = await readFile(templatePath, "binary");
  const zip = new PizZip(templateBuffer);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

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

  console.log("✅ Word şablon dolduruldu:", outputPath);
  return outputPath;
}

// Ana handler
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { stajTuru, ucretli, cumartesiCalisiyorMu, calismaGunleri = [], ...formData } = data;

    const documentsDir = path.join(process.cwd(), "public/documents");
    const outputDir = path.join(process.cwd(), "public/output");

    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
      console.log("📁 'output' klasörü oluşturuldu.");
    }

    const templateName = stajTuru === "yaz" ? "staj_yaz.docx" : "staj_donem.docx";
    const templatePath = path.join(documentsDir, templateName);

    if (!existsSync(templatePath)) {
      throw new Error(`Şablon dosyası bulunamadı: ${templateName}`);
    }

    // Şablona gönderilecek veri
    const fullData: any = {
      ...formData,
      stajTuru,
      ucretli,
      cumartesiCalisiyorMu,
      dogumTarihi: formatDate(formData.dogumTarihi),
      baslangicTarihi: formatDate(formData.baslangicTarihi),
      bitisTarihi: formatDate(formData.bitisTarihi),
    };

    // Eğer dönem içi staj ise çalışma günlerini X olarak ekle
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
        fullData[key] = calismaGunleri?.includes(gun) ? "X" : "";
      });
    }
    

    console.log("🧾 Form verisi:", fullData);

    const filledDocPath = await fillTemplate(templatePath, fullData);
    const filledDocs = [filledDocPath];

    if (ucretli) {
      const ek2Path = path.join(documentsDir, "ek2.docx");
      if (existsSync(ek2Path)) {
        const filledEk2Path = await fillTemplate(ek2Path, fullData);
        filledDocs.push(filledEk2Path);
        console.log("✅ EK-2 belgesi de oluşturuldu.");
      } else {
        console.warn("⚠️ EK-2 belgesi bulunamadı, atlanıyor.");
      }
    }

    const pdfPaths: string[] = [];
    for (const docPath of filledDocs) {
      console.log("📄 PDF'ye dönüştürülüyor:", docPath);
      await convert(docPath);
      const pdfPath = docPath.replace(".docx", ".pdf");
      pdfPaths.push(pdfPath);
    }

    const finalPdfPath = pdfPaths[0];
    const pdfBuffer = await readFile(finalPdfPath);
    console.log("✅ PDF oluşturuldu. Boyut:", pdfBuffer.length, "bayt");

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="staj_belgesi.pdf"',
      },
    });
  } catch (error: any) {
    console.error("❌ PDF oluşturma hatası:", error.message);
    return new NextResponse(error.message || "Bilinmeyen bir hata oluştu.", { status: 500 });
  }
}
