import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-6">Aydınlatma Metni</h1>

      <p className="mb-4">
        Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında,
        <strong> Yapay Zeka Destekli Staj Başvuru Platformu</strong> üzerinden toplanan kişisel verilerin
        işlenme usul ve esasları hakkında ilgili kişileri bilgilendirmek amacıyla hazırlanmıştır.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Veri İşleme Amacı ve Süresi</h2>
      <p className="mb-4">
        Platform üzerinde sunulan staj başvuru belgesi oluşturma hizmetinden yararlanılabilmesi için
        kullanıcıdan geçici olarak bazı kişisel veriler talep edilmektedir. Bu bilgiler yalnızca belgenin
        oluşturulması sürecinde kullanılır, <strong>kalıcı olarak sistemde saklanmaz</strong>, herhangi bir
        veritabanına kaydedilmez veya üçüncü kişilerle paylaşılmaz.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Zorunlu ve İsteğe Bağlı Bilgiler</h2>
      <p className="mb-4">
        Kayıt işlemi esnasında <strong>isim, soyisim ve okul numarası</strong> zorunlu olarak talep
        edilmekte ve bu bilgiler “Profil Bilgilerim” sayfasında görüntülenmektedir. Bunun dışında
        <strong> TC kimlik numarası, bölüm ve sınıf bilgisi</strong> gibi ek alanların doldurulması tamamen
        kullanıcının takdirindedir ve bu alanlar isteğe bağlıdır.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Chatbot Kullanımı ve Veri Kaynağı</h2>
      <p className="mb-4">
        Platformda entegre edilen yapay zeka destekli sohbet robotu (chatbot), öğrencilerin staj
        süreçlerine ilişkin sorularını yanıtlamak amacıyla geliştirilmiştir. Bu sistemde kullanılan içerikler,
        geçmişte danışman akademisyenlere yöneltilen e-posta mesajları ve resmi bilgilendirme belgeleri
        temel alınarak oluşturulmuştur.
      </p>
      <p className="mb-4">
        Kullanıcılar tarafından chatbot aracılığıyla yöneltilen yeni sorular da, kimlik bilgileriyle
        ilişkilendirilmeden <strong>anonimleştirilmiş biçimde</strong> değerlendirilerek sistemin bilgi tabanının
        geliştirilmesi amacıyla kullanılabilecektir.
      </p>
    </div>
  );
}
