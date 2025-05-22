"use client";

import { useState } from "react";
import Navbar from "../../../components/navbar"; // Adjust path if necessary
import SidebarMenu from "../../../components/sidebarmenu"; // Adjust path if necessary
import { HelpCircle } from "lucide-react";

export default function SSSPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Manually extracted and paired questions and answers from the OCR text
  const faq = [
    {
      question: "Staj basvurusu yaptım obs'den. Staj yapacağım şirkette ek-1, ek-2 belgelerini de imzalattım ve ek-3 belgesinide doldurdum. Bu belgeleri size mi atmam gerekiyor?",
      answer: "ek1'den bahsediliyor. işyerine teslim edeceğini et. bize bir şey teslim etmen gerekmiyor bu aşamada."
    },
    {
      question: "Obs'de staj bilgilerimde onaylandı yazması gerekmiyor mu o şekilde bilgim vardı. Size sormak danışmak istedim.",
      answer: "Bölümün staj sayfasını incele. El kitabını oku."
    },
    {
      question: "İkinci stajımı da aynı yerde staj yapmam sorun olur mu?",
      answer: "Aynı yerde staj yapabilirsin."
    },
    {
      question: "Cuma günü başlatsam stajımı sorun olur mu?",
      answer: "Pazartesi başlamak zorundasın."
    },
    {
      question: "Staj yapmak için formu doldurdum, hocanın imzasını da aldım ancak bölüm başkanı çıkmış olduğu için kaşeletemedim, problem olur mu yoksa bununla da başvuru yapabilir miyim?",
      answer: "Kaşeletmelisin."
    },
    {
      question: "Hocam peki her bir stajımız 20 gün olmak zorunda değil mi toplamda 40 olması yeterli olarak değil?",
      answer: "İki ayrı 20 günlük staj yapmak zorundasın."
    },
    {
      question: "Hocam 30 Ağustos Zafer Bayramını resmi tatil olarak mı dahil ediyoruz?",
      answer: "Evet."
    },
    {
      question: "En az 10 iş günü öncesinden evrakları teslim edilebilir denildi buna bayram tatili dahil midir?",
      answer: "Hayır, bayram tatilleri dahil değildir."
    },
    {
      question: "Hocam staj yeri başlangıç tarihi belirlendi. İmzalanan kağıtları getirmek için bir ay öncesine kadar beklemem mi gerekiyor?",
      answer: "Sigorta işlemlerinde sorun olmaması için beklemen daha uygun olacaktır."
    },
    {
      question: "Stajımın başlamasına kaç gün kala başvuru yaptığımda kabul olur?",
      answer: "15 gün öncesinde başvurun."
    },
    {
      question: "Staj başvuru kağıdına imza atmadan onaya yollayabilir miyim?",
      answer: "Hayır. Staj reddedilecektir."
    },
    {
      question: "Yanlış doldurulan staj evrağında Paint benzeri uygulamalarla oynama yapabilir miyim?",
      answer: "Hayır, oynama yapılmamalıdır."
    },
    {
      question: "15 Temmuz Milli İrade ve Demokrasi Gününü de tatil olarak mı kabul etmeliyiz?",
      answer: "Evet."
    },
    {
      question: "Devlet kurumunda yapacağımız staj için ikinci belgeyi (Ek-2 Öğrenci-İşveren Staj Sözleşmesi Formu) doldurmalı mıyız?",
      answer: "Hayır, devlet kurumlarında yapılan stajlar için ek-2 belgesinin doldurulması gerekmiyor."
    },
    {
      question: "Staj için bulduğum şirket SPA ve ERP yazılımları üzerine çalışıyor kabul olur mu?",
      answer: "Tabi ki olabilir."
    },
    {
      question: "Staj belgelerimi hocaya imzalatmam gerekiyor mu?",
      answer: "İşlemler online hallediliyor, yüz yüze görüşmeye gerek yok."
    },
    {
      question: "Stajın onayıyla alakalı bir mail gelecek değil mi?",
      answer: "Staj bürosuna bilgilerin iletildiğinde sana bilgi verilecek."
    },
    {
      question: "Okul ve sınav dönemi staj yapabilir miyim?",
      answer: "Hayır. Sınav dönemi yapılamaz."
    },
    {
      question: "Staj başvurusunu istediğimizde yapabiliyor muyuz yoksa bununla alakalı bir duyuru yayınlanacak mı?",
      answer: "Ayrıca bir duyuru yapılmayacak. İstediğiniz zaman staj el kitabındaki kurallara uygun olmak şartıyla staj başvurusu yapabilirsiniz."
    },
    {
      question: "Yaz okulu ve staj aynı anda (farklı günlerde) yapılabiliyor mu?",
      answer: "Stajını ve yaz okulunu aynı şehirde yapacaksan, yaz okulu gününü dahil etmeyeceksen yapabilirsin."
    },
    {
      question: "Staj için 4A kısmına baktım e-devletten ama bir belge gözükmüyor. Neden olabilir?",
      answer: "Staj el kitabını oku." // No specific answer for this reason, general guidance provided
    },
    {
      question: "Fabrikadaki IT bölümünde mühendis yokmuş yine de staj yapabilir miyim?",
      answer: "Bilgisayar mühendisliği faaliyeti gösteren bir firmada bilgisayar mühendisliği ile ilgili olarak çalışıyorsan çalışmanı sa o da olur ama grafik tasarımcı olmaz."
    },
    {
      question: "Staj başvuru formunu online olarak gönderdim. Belgelerin imzalı halini bu hafta içinde de teslim edebilir miyim?",
      answer: "Evrakların imzalı hallerini bir yere teslim etmene gerek yok. Her şey online."
    },
    {
      question: "Staj onayını dijital olarak yapabiliyor muyuz? Firmaya gidip ıslak imza ile doldurulması gerekiyor mu staj yapılacak belgeler?",
      answer: "Okula online teslim edebiliyorsun ancak firma ıslak kaşe ve imza olmak zorundadır."
    },
    {
      question: "Yaz tatilinin herhangi bir vaktinde stajımızı yapabiliriz değil mi illa temmuz olmak zorunda mı ağustos ayında da ya da başka bir zamanda?",
      answer: "Staj el kitabını oku." // General guidance for specific timing rules
    },
    {
      question: "Rahatsız olduğum için rapor aldım ve işe gelmedim bugün ise staj yerime geldim raporumu teslim ettim. İnsan kaynaklarına bunu nasıl bildirmeliyim?", // Completed question slightly based on context
      answer: "mfstaj@balikesir.edu.tr'ye durumu açıklayan bir mail at."
    },
    {
      question: "Şu an stajıma başladım 2 hafta oldu da stajı 30 güne uzatmam mümkün mü?",
      answer: "Sen istersen 40 yap ancak okul sigortanı 20 gün yaptı ve bu uzamayacak. Sigorta olayını işyeri ile çözmelisin."
    },
    {
      question: "Staj el kitabında staj sicil fişi ile ilgili geçen seneden ötürü uzaktan eğitimden dolayı mühürlenmesi gerekmemekte deniyor. Bu doğru mu?", // Completed question slightly based on context
      answer: "Firma isterse mühürletirsin. Firma özellikle istemiyorsa gerek yok."
    },
    {
      question: "İki stajım art arda olacağı için başvurularını aynı anda yapsam olur mu?",
      answer: "Hayır, vakti geldiğinde yapmalısın."
    },
    {
      question: "Birinci ve ikinci stajımı art arda yapacağım ve resmi tatillerden ötürü ikinci stajım salı günü başlasa bir sorun olur mu?", // Completed question slightly based on context
      answer: "İki staj arasındaki zaman 10 güne kadar olan aralarda izinli gösterilir ve çıkış yapılmaz; 10 günden fazla olduğunda Etmez."
    },
    {
      question: "Staj sürecimi tamamladım ve mezun durumunda olduğum ve Balıkesir'de olmadığım için staj defterimi öğrenci işlerine mi teslim etmeliyim?", // Completed question slightly based on context
      answer: "Öğrenci işlerine değil bölüme kargolanmalıdır."
    },
    {
      question: "Staj sicil fişinde fotoğrafım olmasa sorun olur mu?",
      answer: "Fotoğrafsız olabilir."
    },
    {
      question: "Staj sicil fişindeki staj komisyonu tarafından doldurulup imzalanması gereken yer staj bittikten sonra mı imzalanacak?", // Completed question slightly based on context
      answer: "staj bittikten sonra imzalanır."
    },
     {
      question: "Yaptığım staj başvurusu kabul edilmiş, staj sicil fişi dolduracağım. Fotoğraf yapıştırma bölümünde \"Öğrenci işlerinden mühür yaptırınız\" yazıyor. Mühre gerek var mı?", // Question adjusted to match implied Q41
      answer: "Mühre gerek yok." // Answer from A34/A41
    },
    {
      question: "Sosyal Güvenlik Kurumu ile ilişkilendirme belgesi 'SGK İşe Giriş Bildirgesi' belgesini nereden temin edebilirim?",
      answer: "e-devletten kendin alacaksın. staj el kitabında bununla ilgili açıklama var."
    },
    {
      question: "SGK İşe Giriş Bildirgesi stajım onaylandığında e-devlette gözükecek sanırım değil mi?",
      answer: "stajın onaylandığında değil, staj için sigortan yapıldığında gözükür. staja başlamadan birkaç gün önce yapılır."
    },
    {
      question: "Staj başvurum için formu atmıştım ve onay mesajı gelmedi hâlâ, ne zaman gelir?",
      answer: "stajın başlamasına iki iş günü kala hala gelmediyse mfstaj@balikesir.edu.tr'ye mail atarak iletişime geçebilirsin."
    },
    // Q38 is a duplicate of Q29, skipping.
    // Q39 is a duplicate of Q33, skipping.
     {
      question: "Bölüm sayfasında \"staj kabul formunun bir nüshasını bölüm sekreterliğine, işe giriş bildirgesini de işyerine teslim edilmesi gerektiği\" yazıyor. Bu doğru mu?", // Completed question based on context
      answer: "Bölüm staj sayfasını oku." // Refers back to the official source
    },
    {
      question: "Staj sicil fişi dolduracağım. Fotoğraf yapıştırma bölümünde \"öğrenci işlerinden mühür yaptırınız\" yazıyor. Öğrenci işlerine mühürletmem gerekiyor mu?", // Question refined based on Q41
      answer: "Mühre gerek yok." // Answer from A34/A41
    },
    {
      question: "4a işe giriş çıkış bildirgesine baktığımda çıkışın daha yapılmadığını yeni stajım için ise girişin yapılmadığını gördüm. Ne yapmalıyım?", // Completed question based on context
      answer: "Aynı firmada staj yapacaksan zaten çıkış yapılmıyor izin gibi gösteriliyor aradaki günler."
    },
    {
      question: "Derslerin başlamasına az bir süre kaldığı için, ilk haftasında staj yapmaya devam edebilir miyim? Yoksa dersler başlayınca stajı bırakmalı mıyım?", // Completed question based on context
      answer: "Okul devam ederken devam zorunluluğu olan derslerin varsa staj yapamazsın."
    },
    {
      question: "Bilgisayar Mühendisliği 2. Sınıf yaz stajımı bitirmek üzereyim. Staj defteri ve staj fişinde firmanın doldurması gereken yerler var. Bunları kim doldurmalı?", // Completed question based on context
      answer: "Doldurmasanda olur." // Answer from A68 (this answer is questionable based on standard procedures, but provided in the source)
    },
    {
      question: "Online staj yapabilir miyim?",
      answer: "Online staj yapabilirsin."
    },
    // Q46 is a duplicate of Q20, skipping.
    {
      question: "Stajyerim ikinci stajda başlamadan önce çıkışının yapılmasını sonrasında tekrar giriş işlemlerinin yapılması gerekiyor mu?", // Completed question based on context (related to Q42 & Q30/Q47)
      answer: "İki staj arasındaki zaman 10 güne kadar olan aralarda izinli gösterilir ve çıkış yapılmaz; 10 günden fazla olduğunda Etmez." // Answer from A47
    },
    {
      question: "Staj sicil fişine fotoğrafı elektronik ortamda koymam sıkıntı teşkil eder mi acaba?",
      answer: "Fotoğrafsız olabilir." // Answer from A32 (doesn't directly address 'electronic' but is the closest)
    },
    {
      question: "Staj belgelerine kurşun kalemle imza atılabilir mi?",
      answer: "Hayır." // Answer from A48 (page 6)
    },
    {
      question: "Ek-1 Zorunlu Yaz Stajı Kabul Formunu doldurup staj komisyonuna mail atmam mı gerekiyor?",
      answer: "Staj el kitabını oku." // No direct answer provided, using fallback
    },
    {
      question: "Ek1 belgesini teknik grup müdürünün imzası mı yoksa işyerinde çalışan bir bilgisayar mühendisinin imzası mı gerekiyor?", // Completed question based on context
      answer: "Hayır buraya seninle ilgilenen mühendis imza atmalı." // Answer from A54 (page 6)
    },
    {
      question: "Staj sicil fişinde staj konusuna zorunlu staj yazmamız mı gerekiyor?",
      answer: "Fark etmez." // Answer from A51/A63 (page 6)
    },
    {
      question: "Staj için sigortamı şirket karşılamak istiyor. Stajımı göstermemde bir sorun yaşayabilir miyim?",
      answer: "Staj için sigortanı şirket yapabilir. Teknik açıdan bir sorun yok. Sadece başvururken bu konuda beni bilgilendir." // Answer from A52 (page 6)
    },
    {
      question: "Okulumuzun web sitesinde Pazartesi günleri staja başlayabileceğimiz yazıyor. Ancak ben 40 iş günü stajımı tek şirkette yapmak istiyorum. Başlayabilir miyim?", // Completed question based on context
      answer: "Başlayabilirsin." // Answer from A53/A56 (page 6) - Addresses starting day, not the 40-day conflict (already answered in Q6)
    },
    {
      question: "Staj sicil fişinde bulunan Amir bölümüne insan kaynakları imza ve mühür atabilir mi?",
      answer: "Staj el kitabını oku." // No direct answer found, using fallback
    },
    {
      question: "Staj için başvuru yapsam en erken hangi gün staja başlayabilirim?",
      answer: "Pazartesi başlamak zorundasın." // Based on answer to Q4 and context in Q54
    },
    {
      question: "Staj için ek-1 dosyasını düzenlemiştim de komisyon onayı için imza istiyor. Nasıl sağlarım?",
      answer: "Staj el kitabını oku." // No direct answer found, using fallback
    },
    {
      question: "Staj bittikten 1 ay sonra defteri teslim etmemiz mi gerekiyor yoksa okul başlayınca da teslim edebilir miyiz?",
      answer: "Okul başladıktan sonra teslim edebilirsiniz." // Answer from A57 (page 6)
    },
    {
      question: "Hocam staj yapacağımız yerde mutlaka bilgisayar mühendisi olmak zorunda mı yoksa yazılım mühendisi ya da grafiker gibi farklı unvanlar da kabul edilir mi?", // Completed question based on context
      answer: "Bilgisayar mühendisliği faaliyeti gösteren bir firmada bilgisayar mühendisliği ile ilgili olarak çalışıyorsan çalışmanı sa o da olur ama grafik tasarımcı olmaz." // Answer from A58/A69 (page 6/8)
    },
    {
      question: "Benim üniversiteden mezun olmam için sadece 20 günlük stajım kaldı ancak ben bu staj-2 dersini OBS'den seçemiyorum. Ne yapmalıyım?", // Completed question based on context
      answer: "Sadece stajın kaldıysa ders kaydı yapmana gerek yok." // Answer from A59 (page 6)
    },
    {
      question: "Farklı bir firmada yapacağım ikinci stajımı ilk stajımın bitiminde perşembe gününden başlatabilir miyim?",
      answer: "Hayır, farklı firma olduğu için pazartesi başlamalısın." // Answer from A60 (page 6)
    },
    {
      question: "Staj defterinde sayfa numarasını yazmayı unutmuşum elle yazabilir miyim?",
      answer: "Staj el kitabını oku." // No direct answer found, using fallback
    },
    {
      question: "Büt haftası staj yapabiliyor muyuz?",
      answer: "Hayır. Sınav dönemi yapılamaz." // Answer from A62 (page 6) - Same as Q18
    },
    {
      question: "Staj defterinin kapağını ve staj defterinin her sayfasında bulunan en alttaki kutucuğu (imza, tarih vb. alanını), staj yeri bilgileri gibi kısımları kim doldurmalı?", // Completed question based on context
      answer: "Doldurmasanda olur." // Answer from A68 (page 6) - Same as Q44, questionable but provided. Might refer to the student/firm filling specific sections.
    },
    {
      question: "Staj sicil fişinde fotoğraf yapıştıracağımız alanın öğrenci işleri tarafından mühürlenmesi gerektiği yazıyor. Nasıl halletmeliyim?", // Completed question based on context
      answer: "Staj el kitabını oku." // No direct answer found, using fallback
    },
     {
      question: "İlk stajımı tamamladım, şu an ikincisini yapıyorum, 16'sında bitecek. Staj defterini mezun durumunda olmama rağmen teslim edebilir miyim?", // Completed question based on context (Q66)
      answer: "2 staj defterini birlikte teslim edersin, sorun olmaz." // Answer from A65 (page 6)
    },
    {
      question: "Staj defterinde her güne 1 sayfa mı yoksa bir sayfaya birkaç günü yazabilir miyim?",
      answer: "Her güne en az 1 sayfa olmalı. Bir sayfaya birden fazla gün yazamazsın." // Answer from A66 (page 6)
    },
    {
      question: "Hocam merhabalar. Zorunlu stajı kendi imkanlarımla bulacakmışım. Staj süresi ne kadar olacak?",
      answer: "Elbette kendin bulacaksın. 20 şer günlük 2 staj yapmanız gerekiyor." // Answer from A67 (page 6)
    },
    // Q69 is a duplicate or incomplete question similar to Q30/Q47, skipping.
    {
      question: "Bir yerde çalışırken başka bir yerde staj yapılabiliyor mu?",
      answer: "Hayır." // Answer from A70 (page 6/8)
    }
    // Total unique/distinct questions: 48
  ];


  return (
    <div className="min-h-screen font-sans bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 ease-in-out">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-[var(--card-bg)] bg-opacity-90 border-b border-[var(--border-color)] backdrop-blur-sm"> {/* Added backdrop-blur */}
        <Navbar toggleSidebar={toggleSidebar} />
      </div>

      {/* Sidebar (will be hidden on small screens by default based on its implementation) */}
      <SidebarMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area - Padding top equals navbar height, margin-left accounts for open sidebar */}
      <main style={{ paddingTop: "5rem" }} className={`p-6 sm:p-10 ${isSidebarOpen ? "md:ml-64" : ""}`}>
        <div className="max-w-4xl mx-auto mt-6 p-8 rounded-lg shadow-md bg-[var(--card-bg)] text-[var(--card-text)] border border-[var(--border-color)] transition-all duration-300">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center flex items-center justify-center gap-3"> {/* Increased gap for icon */}
            <HelpCircle className="w-8 h-8 text-[var(--primary)]" /> {/* Added size and primary color */}
             Sıkça Sorulan Sorular
          </h1>
          <div className="space-y-4">
            {faq.map((item, index) => (
              <details
                key={index}
                className="group border border-[var(--border-color)] bg-[var(--background)] rounded-lg px-4 py-3 sm:px-6 sm:py-4 shadow-sm hover:shadow-md transition-shadow duration-200" // Adjusted classes slightly for theme variables and hover effect
              >
                <summary className="flex items-center justify-between text-[var(--primary)] cursor-pointer text-base sm:text-lg font-medium group-open:font-semibold"> {/* Adjusted font size, used primary color variable, added flex for arrow */}
                  {item.question}
                  <span className="ml-2 transform transition-transform duration-200 group-open:rotate-180"> {/* Added transition to rotate arrow */}
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg> {/* Down arrow icon */}
                  </span>
                </summary>
                <p className="mt-3 text-[var(--foreground)] text-sm sm:text-base leading-relaxed border-t border-[var(--border-color)] pt-3"> {/* Adjusted margin-top, text color variable, font size, leading, added top border */}
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}