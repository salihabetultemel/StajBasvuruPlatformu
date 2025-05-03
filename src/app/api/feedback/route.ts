// src/app/api/feedback/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Ortam değişkenlerinden Resend API anahtarını ve diğer bilgileri al
// Değişkenlerin .env.local dosyasında ve Vercel'de tanımlı olduğundan emin ol
const resendApiKey = process.env.RESEND_API_KEY;
const recipientEmail = process.env.FEEDBACK_RECIPIENT_EMAIL;
const fromEmail = process.env.EMAIL_FROM_ADDRESS;

// Resend istemcisini başlatmadan önce API anahtarının varlığını kontrol et
if (!resendApiKey) {
  // Geliştirme ortamında konsola hata yazdır
  console.error("RESEND_API_KEY ortam değişkeni bulunamadı. Lütfen .env.local dosyasını kontrol edin.");
  // Üretim ortamında, API anahtarı olmadan devam etmek anlamsız olacağı için
  // istemciyi başlatmamak veya bir hata fırlatmak daha güvenli olabilir.
  // Şimdilik sadece konsola yazdırıyoruz ama gerçek uygulamada daha katı bir kontrol gerekebilir.
}

// Resend istemcisini API anahtarıyla başlat
// API anahtarı undefined ise Resend kütüphanesi kendi içinde hata verecektir.
const resend = new Resend(resendApiKey);

// POST isteğini işleyecek fonksiyon
export async function POST(request: Request) {
  // Gerekli diğer ortam değişkenlerinin varlığını fonksiyon içinde tekrar kontrol et
  if (!recipientEmail || !fromEmail) {
    console.error("Gerekli ortam değişkenleri eksik: FEEDBACK_RECIPIENT_EMAIL veya EMAIL_FROM_ADDRESS");
    // İstemciye genel bir sunucu hatası mesajı döndür
    return NextResponse.json({ error: 'Sunucu yapılandırma hatası.' }, { status: 500 });
  }
  

  // API anahtarının varlığını tekrar kontrol edebiliriz, özellikle yukarıdaki ilk kontrolü
  // sadece uyarı olarak bıraktıysak.
  if (!resendApiKey) {
      console.error("Resend API anahtarı eksik olduğu için e-posta gönderilemiyor.");
      return NextResponse.json({ error: 'E-posta servisi yapılandırılamadı.' }, { status: 500 });
  }

  try {
    // İstek gövdesini JSON olarak işle
    const body = await request.json();
    const { name, email, message } = body;

    // Gelen verilerin temel doğrulamasını yap (boş olmamalı)
    if (!name || !email || !message) {
      // Eksik bilgi varsa istemciye 400 Bad Request hatası döndür
      return NextResponse.json({ error: 'Lütfen tüm alanları doldurun.' }, { status: 400 });
    }

    // E-posta gönderme işlemi
    // 'reply_to' yerine 'replyTo' kullanıldığına dikkat et
    const { data, error } = await resend.emails.send({
      from: fromEmail,                   // Gönderen e-posta adresi (Resend'de yapılandırılmış)
      to: [recipientEmail],              // Alıcı e-posta adresi (ortam değişkeninden)
      subject: `Yeni Geri Bildirim: ${name}`, // E-posta konusu
      replyTo: email,                   // Cevapla butonu tıklandığında kullanılacak e-posta adresi
      html: `
        <h1>Yeni Geri Bildirim Alındı</h1>
        <p><strong>Gönderen Adı:</strong> ${name}</p>
        <p><strong>Gönderen E-posta:</strong> ${email}</p>
        <hr>
        <p><strong>Mesaj:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>  // Mesajdaki satır sonlarını HTML <br> etiketine çevir
      `,
    });

    // Resend servisinden bir hata döndüyse kontrol et
    if (error) {
      console.error("Resend e-posta gönderme hatası:", error);
      // İstemciye genel bir e-posta gönderim hatası mesajı döndür
      return NextResponse.json({ error: 'E-posta gönderilirken bir sorun oluştu.' }, { status: 500 });
    }

    // Her şey yolunda gittiyse, başarı mesajını logla ve istemciye başarı yanıtı döndür
    console.log("E-posta başarıyla gönderildi. Resend ID:", data?.id); // data null olabilir, kontrol ekledik
    return NextResponse.json({ success: true, message: 'Geri bildiriminiz başarıyla alındı.' });

  } catch (err) {
    // İstek işleme sırasında beklenmedik bir hata olursa (örn: JSON parse hatası) yakala
    console.error("API Route Hatası:", err);
    // İstemciye genel bir sunucu hatası mesajı döndür
    return NextResponse.json({ error: 'İstek işlenirken beklenmedik bir hata oluştu.' }, { status: 500 });
  }
}