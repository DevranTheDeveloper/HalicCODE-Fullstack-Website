# Vercel ile Adım Adım Yayınlama Rehberi

Sitenizi Vercel'e yüklemek ve veritabanını ayarlamak için aşağıdaki adımları sırasıyla uygulayın.

## 1. Hazırlık (Benim Yaptıklarım)
Sizin için gerekli kod değişikliklerini yaptım:
*   `package.json` dosyasına Vercel'in kurulum yapabilmesi için gerekli komutu ekledim.
*   `schema.prisma` dosyasını **PostgreSQL** kullanacak şekilde güncelledim.
    *   ⚠️ **Dikkat:** Bu değişiklikten sonra yerel bilgisayarınızda `npm run dev` komutu hata verebilir çünkü yerelde Postgres veritabanı yok. Endişelenmeyin, Vercel'de çalışacak.

## 2. GitHub'a Yükleme
Projenizi GitHub'a yüklemeniz gerekiyor. Eğer henüz yapmadıysanız:
1.  [GitHub.com](https://github.com) üzerinde yeni bir **Repository** oluşturun (Public veya Private olabilir).
2.  Terminal'i açın ve proje klasörünüzde şu komutları yazın:
    ```bash
    git init
    git add .
    git commit -m "Vercel deployment hazirlik"
    git branch -M main
    git remote add origin https://github.com/KULLANICI_ADINIZ/REPO_ADINIZ.git
    git push -u origin main
    ```

## 3. Vercel Projesi Oluşturma
1.  [Vercel.com](https://vercel.com) adresine gidin ve GitHub hesabınızla giriş yapın.
2.  **"Add New..."** butonuna tıklayın ve **"Project"** seçin.
3.  GitHub reponuzu listede göreceksiniz, yanındaki **"Import"** butonuna basın.

## 4. Veritabanı Oluşturma (Vercel Postgres)
Vercel projesi oluşturma ekranındayken (henüz Deploy'a basmayın):
1.  Sol menüden veya ekrandaki **Storage** sekmesinden **"Postgres"** seçeneğini bulun ve **"Add"** veya **"Create"** deyin.
2.  Veritabanına bir isim verin (örn: `topluluk-db`) ve bölge olarak **Frankfurt (fra1)** seçin (Türkiye'ye en yakın).
3.  Oluşturduktan sonra Vercel size `.env.local` sekmesinde bazı gizli anahtarlar gösterecek.
4.  **ÖNEMLİ:** `POSTGRES_PRISMA_URL` veya `DATABASE_URL` değerini kopyalayın.

## 5. Environment Variables (Ortam Değişkenleri)
Proje kurulum ekranındaki **"Environment Variables"** kısmını açın ve şunları ekleyin:

| Key (Anahtar) | Value (Değer) |
|---------------|---------------|
| `DATABASE_URL` | Az önce kopyaladığınız Postgres URL'i (örn: `postgres://...`) |
| `JWT_SECRET` | Rastgele uzun ve karmaşık bir şifre yazın (örn: `gizli-sifre-123-xyz`) |
| `ADMIN_PASSWORD` | `password123` (veya istediğiniz başka bir admin şifresi) |
| `GROQ_API_KEY` | Mevcut `.env.local` dosyanızdaki Groq API anahtarı |

## 6. Deploy (Yayınlama)
1.  Her şeyi ekledikten sonra **"Deploy"** butonuna basın.
2.  Vercel kurulumu başlatacak. Yaklaşık 1-2 dakika sürebilir.
3.  Eğer "Build Failed" hatası alırsanız logları kontrol edin, genellikle veritabanı bağlantısıyla ilgilidir.

## 7. Veritabanını Hazırlama (Deploy Sonrası)
Site yayına girdikten sonra veritabanı tablolarını oluşturmamız lazım.
1.  Vercel panelinde projenize girin.
2.  Üst menüden **"Settings"** -> **"Functions"** -> **"Redeploy"** yapmanıza gerek yok ama tabloların oluşması için bir komut çalıştırmalıyız.
3.  En kolayı: Bilgisayarınızdaki terminalden Vercel veritabanına bağlanıp tabloları oluşturmaktır.
    *   `.env` dosyanızdaki `DATABASE_URL` kısmını Vercel'den aldığınız yeni URL ile değiştirin.
    *   Terminalde: `npx prisma migrate deploy` komutunu çalıştırın.
    *   Terminalde: `node prisma/seed-admins.js` komutunu çalıştırın (Admin kullanıcısını oluşturmak için).

## 8. Domain Bağlama
1.  Vercel panelinde **Settings** -> **Domains** sekmesine gelin.
2.  Satın aldığınız domaini yazın (örn: `topluluk.com`).
3.  Vercel size **A Record** (IP adresi) ve **CNAME** verecek.
4.  Domaini aldığınız firmanın paneline gidip bu kayıtları ekleyin.

Tebrikler! Siteniz artık yayında! 🚀
