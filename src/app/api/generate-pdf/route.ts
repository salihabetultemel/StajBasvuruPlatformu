import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs-extra";
import { PDFDocument } from "pdf-lib";
import path from "path";
import { Document, Packer, Paragraph, TextRun } from "docx";

// Form verilerini Word'e ekleyip PDF olarak döndüren API
export async function POST(req: Request) {
  try {
    const formData = await req.json();
    
    // Staj türüne göre doğru belgeyi seç
    let templateFile = "";
    if (formData.stajTuru === "yaz") {
      templateFile = "staj_yaz.docx";
    } else if (formData.stajTuru === "donem") {
      templateFile = "staj_donem.docx";
    }

    // Ücretli ise EK-2 formu da oluşturulmalı
    const ek2Gerekli = formData.ucretli;

    // Dosya yolları
    const docPath = path.join(process.cwd(), "public/documents", templateFile);
    const ek2Path = path.join(process.cwd(), "public/documents", "ek2.docx");

    // Word dosyasını oku
    const docBuffer = await readFile(docPath);

    // Yeni Word belgesi oluştur
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun(`Adı Soyadı: ${formData.adSoyad}`),
                new TextRun("\n"),
                new TextRun(`T.C. Kimlik No: ${formData.tcKimlik}`),
                new TextRun("\n"),
                new TextRun(`Öğrenci No: ${formData.ogrenciNo}`),
                new TextRun("\n"),
                new TextRun(`E-posta: ${formData.eposta}`),
                new TextRun("\n"),
                new TextRun(`Telefon: ${formData.telefon}`),
                new TextRun("\n"),
                new TextRun(`Staj Yeri: ${formData.stajYeri}`),
                new TextRun("\n"),
                new TextRun(`Faaliyet Alanı: ${formData.faaliyetAlani}`),
                new TextRun("\n"),
                new TextRun(`Başlangıç Tarihi: ${formData.baslangicTarihi}`),
                new TextRun("\n"),
                new TextRun(`Bitiş Tarihi: ${formData.bitisTarihi}`),
                new TextRun("\n"),
                new TextRun(`Cumartesi Çalışılıyor mu?: ${formData.cumartesiCalisiyorMu ? "Evet" : "Hayır"}`),
              ],
            }),
          ],
        },
      ],
    });

    // Yeni Word belgesini buffer olarak kaydet
    const wordBuffer = await Packer.toBuffer(doc);
    
    // Word'ü PDF'ye çevir
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();

    page.drawText(`Staj Belgesi\n\nAdı Soyadı: ${formData.adSoyad}\nT.C. Kimlik No: ${formData.tcKimlik}`, {
      x: 50,
      y: height - 100,
      size: 12,
    });

    const pdfBytes = await pdfDoc.save();

    // PDF'yi geri döndür
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="staj_belgesi.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF oluşturma hatası:", error);
    return new NextResponse("Hata oluştu", { status: 500 });
  }
}
