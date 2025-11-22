const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    console.log('Veritabanı dolduruluyor...')

    // Önce mevcut verileri temizle
    await prisma.news.deleteMany({})
    await prisma.event.deleteMany({})
    await prisma.member.deleteMany({})
    console.log('✅ Eski veriler temizlendi')

    // Üyeler
    const members = [
        {
            name: 'Ahmet Yılmaz',
            role: 'Head',
            bio: 'Haliç CODE topluluğunun kurucusu ve lideri. Full-stack geliştirme ve topluluk yönetimi konusunda deneyimli.',
            linkedin: 'https://linkedin.com/in/ahmetyilmaz',
            email: 'ahmet@haliccode.com'
        },
        {
            name: 'Ayşe Demir',
            role: 'Head',
            bio: 'Front-end uzmanı ve UI/UX tasarımcısı. Modern web teknolojileri konusunda tutkulu.',
            linkedin: 'https://linkedin.com/in/aysedemir',
            email: 'ayse@haliccode.com'
        },
        {
            name: 'Mehmet Kaya',
            role: 'Social Media',
            bio: 'Sosyal medya yöneticisi ve içerik üreticisi. Topluluk etkinliklerini tanıtmaktan sorumlu.',
            instagram: 'https://instagram.com/mehmetkaya',
            twitter: 'https://twitter.com/mehmetkaya'
        },
        {
            name: 'Zeynep Arslan',
            role: 'Social Media',
            bio: 'Grafik tasarımcı ve sosyal medya içerik yaratıcısı.',
            instagram: 'https://instagram.com/zeyneparslan'
        },
        {
            name: 'Can Özdemir',
            role: 'Sponsor Finder',
            bio: 'İş geliştirme uzmanı. Topluluk için sponsor ve işbirlikleri arıyor.',
            linkedin: 'https://linkedin.com/in/canozdemir',
            email: 'can@haliccode.com'
        },
        {
            name: 'Elif Yıldız',
            role: 'Sponsor Finder',
            bio: 'Kurumsal ilişkiler sorumlusu ve etkinlik organizatörü.',
            linkedin: 'https://linkedin.com/in/elifyildiz'
        },
        {
            name: 'Burak Şahin',
            role: 'Member',
            bio: 'Back-end geliştirici. Node.js ve Python konusunda uzman.'
        },
        {
            name: 'Selin Aydın',
            role: 'Member',
            bio: 'Mobil uygulama geliştiricisi. React Native ile çalışıyor.'
        },
        {
            name: 'Emre Çelik',
            role: 'Member',
            bio: 'DevOps Engineer. Cloud altyapı ve CI/CD konusunda deneyimli.'
        },
        {
            name: 'Deniz Koç',
            role: 'Member',
            bio: 'Data Scientist. Makine öğrenmesi ve veri analizi ile ilgileniyor.'
        }
    ]

    for (const member of members) {
        await prisma.member.create({ data: member })
    }
    console.log(`✅ ${members.length} üye eklendi`)

    // Etkinlikler
    const events = [
        {
            title: 'Haliç CODE Hackathon 2024',
            description: 'Topluluğumuzun en büyük etkinliği! 48 saat boyunca kod yazacak, proje geliştirecek ve ödüller kazanacaksınız.',
            date: new Date('2024-12-15'),
            status: 'Future',
            location: 'Haliç Üniversitesi Kampüsü',
            registrationLink: 'https://forms.gle/hackathon2024'
        },
        {
            title: 'Web Development Workshop',
            description: 'Modern web teknolojileri workshop\'u: React, Next.js ve Tailwind CSS ile proje geliştirme.',
            date: new Date('2024-11-30'),
            status: 'Active',
            location: 'Online - Zoom',
            registrationLink: 'https://forms.gle/webworkshop'
        },
        {
            title: 'Yapay Zeka ve Makine Öğrenmesi Semineri',
            description: 'AI ve ML temellerini öğreneceğiniz, pratik uygulamalar yapacağınız bir seminer.',
            date: new Date('2024-12-05'),
            status: 'Active',
            location: 'Haliç Üniversitesi - Konferans Salonu',
            registrationLink: 'https://forms.gle/aiseminar'
        },
        {
            title: 'Career Day - Tech Talks',
            description: 'Sektör profesyonelleri ile tanışma ve kariyer planlama etkinliği.',
            date: new Date('2025-01-20'),
            status: 'Future',
            location: 'Haliç Üniversitesi'
        },
        {
            title: 'Mobil Uygulama Geliştirme Bootcamp',
            description: 'React Native ile cross-platform mobil uygulama geliştirme eğitimi.',
            date: new Date('2024-12-22'),
            status: 'Future',
            location: 'Online',
            registrationLink: 'https://forms.gle/mobilebootcamp'
        }
    ]

    for (const event of events) {
        await prisma.event.create({ data: event })
    }
    console.log(`✅ ${events.length} etkinlik eklendi`)

    // Haberler
    const news = [
        {
            title: 'Haliç CODE Topluluğu Kuruldu!',
            content: `Haliç Üniversitesi öğrencileri tarafından kurulan CODE topluluğu, teknoloji meraklılarını bir araya getirmeyi hedefliyor. 

Topluluğumuz, yazılım geliştirme, veri bilimi, yapay zeka ve daha pek çok teknoloji alanında etkinlikler düzenleyecek. Üyelerimiz birlikte projeler geliştirecek, workshoplara katılacak ve sektör profesyonelleri ile tanışma fırsatı bulacak.

Vizyonumuz, öğrencilerin teknik becerilerini geliştirmelerine yardımcı olmak ve sektöre hazırlamaktır. Samimi bir topluluk atmosferi içinde birlikte öğrenip, büyümeyi ve başarılı projelere imza atmayı hedefliyoruz.`,
            date: new Date('2024-11-01')
        },
        {
            title: 'İlk Hackathon\'umuz 15 Aralık\'ta!',
            content: `CODE topluluğu olarak ilk büyük etkinliğimizi duyurmaktan gurur duyuyoruz! 15 Aralık 2024 tarihinde Haliç Üniversitesi kampüsünde gerçekleşecek olan Hackathon etkinliğimize tüm öğrencileri bekliyoruz.

48 saat boyunca sürecek olan etkinlikte, takımlar halinde projeler geliştirecek, mentorlardan destek alacak ve harika ödüller kazanma şansı yakalayacaksınız.

Kategoriler:
- Web Geliştirme
- Mobil Uygulama
- Yapay Zeka ve Veri Bilimi
- Oyun Geliştirme

Kayıtlar başladı! Yerini kapmak için hemen başvur.`,
            date: new Date('2024-11-15')
        },
        {
            title: 'Web Development Workshop\'u Başarıyla Tamamlandı',
            content: `Geçtiğimiz hafta sonu düzenlediğimiz Web Development Workshop'u büyük bir ilgi gördü. 50\'den fazla katılımcı ile React, Next.js ve Tailwind CSS teknolojilerini öğrendik.

Workshop\'ta katılımcılar:
- Modern React kavramlarını öğrendi
- Next.js ile server-side rendering deneyimledi
- Tailwind CSS ile hızlı UI geliştirdi
- Gerçek dünya projeleri üzerinde çalıştı

Eğitmenlerimiz Ahmet Yılmaz ve Ayşe Demir\'e teşekkür ederiz. Katılımcılarımızın geri bildirimleri harika oldu ve bir sonraki workshop için şimdiden planlamaya başladık!`,
            date: new Date('2024-11-18')
        }
    ]

    for (const newsItem of news) {
        await prisma.news.create({ data: newsItem })
    }
    console.log(`✅ ${news.length} haber eklendi`)

    console.log('✨ Veritabanı başarıyla dolduruldu!')
}

main()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
