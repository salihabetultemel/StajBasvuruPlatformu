import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs-extra";
import { PDFDocument } from "pdf-lib";
import path from "path";
import { Document, Packer, Paragraph, TextRun } from "docx";

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    // 1️⃣ **Doğru Word Belgesini Seç**
    let templateFile = formData.stajTuru === "yaz" ? "staj_yaz.docx" : "staj_donem.docx";
    let docPath = path.join(process.cwd(), "public/documents", templateFile);
    let ek2Path = path.join(process.cwd(), "public/documents", "ek2.docx"); // EK-2 dosyası

    // 2️⃣ **Word Belgesini Oku ve Verileri İşle**
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun(`Adı Soyadı: ${formData.adSoyad}`),
                new TextRun("\n"),
                new TextRun(`T.C. Kimlik No: ${formData.tcKimlik}`),
                new TextRun("\n"),
                new TextRun(`Öğrenci No: ${formData.ogrenciNo}`),
                new TextRun("\n"),
                new TextRun(`Bölüm: ${formData.bolum}`),
                new TextRun("\n"),
                new TextRun(`E-posta: ${formData.eposta}`),
                new TextRun("\n"),
                new TextRun(`Telefon: ${formData.telefon}`),
                new TextRun("\n"),
                new TextRun(`Staj Yeri: ${formData.stajYeri}`),
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

    // 3️⃣ **Eğer Ücretli Seçildiyse EK-2 Formunu İşle**
    let ek2Doc = null;
    if (formData.ucretli) {
      ek2Doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                children: [
                  new TextRun(`Firma Vergi No: ${formData.firmaVergiNo}`),
                  new TextRun("\n"),
                  new TextRun(`Firma Adı: ${formData.firmaAdi}`),
                  new TextRun("\n"),
                  new TextRun(`Firma IBAN: ${formData.firmaIBAN}`),
                  new TextRun("\n"),
                  new TextRun(`Stajyere Ödenecek Ücret: ${formData.stajUcreti} TL`),
                  new TextRun("\n"),
                ],
              }),
            ],
          },
        ],
      });
    }

    // 4️⃣ **Word'ü PDF'ye Çevir**
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();

    page.drawText(
      `Staj Belgesi\n\nAdı Soyadı: ${formData.adSoyad}\nT.C. Kimlik No: ${formData.tcKimlik}\nÖğrenci No: ${formData.ogrenciNo}`,
      {
        x: 50,
        y: height - 100,
        size: 12,
      }
    );

    const pdfBytes = await pdfDoc.save();

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
