# Staj Başvuru Platformu

Bu proje, Balıkesir Üniversitesi Bilgisayar Mühendisliği öğrencileri için hazırlanmış bir **Staj Başvuru Platformu**dur. Öğrenciler staj belgelerini düzenleyebilir, bilgilerini kaydedebilir ve platform üzerinden belgeleri oluşturabilir.

---

## 🚀 Kurulum

Aşağıdaki adımları sırasıyla uygulayarak projeyi bilgisayarınıza kurabilirsiniz:

```bash
# Projeyi Klonlayın
git clone https://github.com/kendi-reponuz/stajbasvuru_platformu.git
cd stajbasvuru_platformu

# Gerekli Paketleri Kurun
npm install

# Veritabanı Kurulumu
createdb StajBasvuruPlatformu
psql -U postgres -d StajBasvuruPlatformu < database/veritabani.sql

# Projeyi Başlatın
npm run dev
```