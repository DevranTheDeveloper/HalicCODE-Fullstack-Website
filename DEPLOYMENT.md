# Web Sitesini Yayına Alma ve Domain Bağlama Rehberi

Sitenizi internette yayınlamak ve bir domain (örn: `topluluk.com`) bağlamak için iki ana yöntem vardır. Mevcut projeniz **SQLite** veritabanı kullandığı için bu seçim önemlidir.

## Seçenek 1: Vercel (Önerilen - En Kolay ve Hızlı)
Next.js'in yaratıcıları tarafından yapılan Vercel, en iyi performansı ve en kolay kurulumu sunar.
**Önemli Not:** Vercel'de SQLite (dosya tabanlı veritabanı) kalıcı olarak çalışmaz. Veritabanınızı **PostgreSQL**'e taşımanız gerekir (Bu işlem Prisma ile çok kolaydır).

### Adımlar:
1.  **Veritabanını Değiştirme (Postgres'e Geçiş):**
    *   Vercel üzerinde ücretsiz bir Postgres veritabanı oluşturun veya Neon/Supabase kullanın.
    *   `schema.prisma` dosyasında `provider = "sqlite"` kısmını `provider = "postgresql"` yapın.
    *   Yeni veritabanı bağlantı adresini `.env` dosyasına ekleyin.

2.  **GitHub'a Yükleme:**
    *   Projenizi GitHub'a yükleyin.

3.  **Vercel'e Bağlama:**
    *   [Vercel.com](https://vercel.com) adresine gidin ve GitHub hesabınızla giriş yapın.
    *   "Add New Project" diyip GitHub reponuzu seçin.
    *   Environment Variables kısmına `DATABASE_URL`, `JWT_SECRET` gibi değerlerinizi ekleyin.
    *   "Deploy" butonuna basın.

4.  **Domain Bağlama:**
    *   Vercel panelinde projenize girin -> **Settings** -> **Domains**.
    *   Satın aldığınız domaini (örn: `benimsitem.com`) buraya yazın.
    *   Vercel size bazı DNS kayıtları (A Record veya CNAME) verecektir.
    *   Domaini satın aldığınız firmanın (GoDaddy, İsimTescil, Google Domains vb.) paneline gidip bu kayıtları ekleyin.
    *   Tebrikler! Siteniz yayında.

---

## Seçenek 2: VPS Sunucu (DigitalOcean, Hetzner vb.)
Eğer **SQLite** kullanmaya devam etmek istiyorsanız, bir sanal sunucu (VPS) kiralamanız gerekir. Bu yöntem biraz daha teknik bilgi gerektirir.

### Adımlar:
1.  **Sunucu Kiralama:**
    *   Ubuntu yüklü bir sunucu kiralayın.

2.  **Kurulum:**
    *   Sunucuya SSH ile bağlanın.
    *   Node.js, NPM ve PM2 yükleyin.
    *   Projenizi sunucuya çekin (`git clone`).
    *   `npm install` ve `npm run build` komutlarını çalıştırın.
    *   `pm2 start npm --name "website" -- start` ile uygulamayı başlatın.

3.  **Domain Yönlendirme:**
    *   Domain firmanızın paneline gidin.
    *   **A Kaydı (A Record)** oluşturun ve sunucunuzun **IP adresini** yazın.

4.  **Nginx ve SSL (https):**
    *   Nginx kurup 80 portunu 3000 portuna (Next.js) yönlendirin.
    *   Certbot ile ücretsiz SSL sertifikası alın.

---

## Özet Karşılaştırma

| Özellik | Vercel (Önerilen) | VPS (Sunucu) |
|---------|-------------------|--------------|
| **Maliyet** | Başlangıç için Ücretsiz | Aylık $5-10 |
| **Kurulum** | Çok Kolay (Tıkla-Yükle) | Zor (Linux Komutları) |
| **Veritabanı** | Postgres gerektirir | SQLite kullanılabilir |
| **Bakım** | Otomatik | Manuel Güncelleme Gerekir |
| **Domain** | Panelden kolayca eklenir | DNS ayarları manuel yapılır |

### Tavsiyem
Eğer Linux sunucu yönetimiyle uğraşmak istemiyorsanız **Vercel** kullanın. Veritabanını Postgres'e çevirmek için size yardımcı olabilirim, bu sadece 5 dakikalık bir işlemdir.
