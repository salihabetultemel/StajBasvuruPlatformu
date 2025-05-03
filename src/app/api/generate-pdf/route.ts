import { NextResponse } from "next/server";
import path from "path";
import { readFile, writeFile, unlink } from "fs/promises";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { tmpdir } from "os";
import { randomUUID } from "crypto";
import { existsSync } from "fs";

const formatDate = (isoDate: string) => {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  return `${day}.${month}.${year}`;
};

async function fillTemplate(templatePath: string, fullData: Record<string, unknown>) {
  const templateBuffer = await readFile(templatePath, "binary");
  const zip = new PizZip(templateBuffer);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  try {
    doc.render({ data: fullData });
  } catch (error: unknown) {
    console.error("❌ Şablon doldurma hatası:", error);
    throw new Error("Şablon doldurulurken hata oluştu.");
  }

  const buffer = doc.getZip().generate({ type: "nodebuffer" });
  const outputPath = path.join(tmpdir(), `${randomUUID()}.docx`);
  await writeFile(outputPath, buffer);
  return outputPath;
}

export async function POST(req: Request) {
  console.log("✅ API isteği alındı");

  try {
    const data = await req.json();
    const { stajTuru, ucretli, cumartesiCalisiyorMu, calismaGunleri = [], ...formData } = data;

    const fullData: Record<string, unknown> = {
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

    if (stajTuru === "donem") {
      const gunMap: Record<string, string> = {
        Pazartesi: "gun_pzt",
        Salı: "gun_sal",
        Çarşamba: "gun_car",
        Perşembe: "gun_per",
        Cuma: "gun_cum",
        Cumartesi: "gun_cmt",
      };
      for (const [gun, key] of Object.entries(gunMap)) {
        fullData[key] = calismaGunleri.includes(gun) ? "X" : "";
      }
    }

    const documentsDir = path.join(process.cwd(), "public/documents");
    const templateName = stajTuru === "yaz" ? "staj_yaz.docx" : "staj_donem.docx";
    const templatePath = path.join(documentsDir, templateName);

    if (!existsSync(templatePath)) throw new Error(`Şablon dosyası bulunamadı: ${templateName}`);
    console.log("✅ Şablon bulundu:", templatePath);

    const filledDocPath = await fillTemplate(templatePath, fullData);
    const docxBuffer = await readFile(filledDocPath);

    // Temizlik
    await unlink(filledDocPath).catch(() => {});

    return new NextResponse(docxBuffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": 'attachment; filename="staj_belgesi.docx"',
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Hata oluştu";
    console.error("❌ Backend Hatası:", message);

    return new NextResponse(JSON.stringify({ error: message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
