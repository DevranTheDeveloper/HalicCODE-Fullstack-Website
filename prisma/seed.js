const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Veritabanı dolduruluyor...');

    // Önce mevcut verileri temizle
    await prisma.news.deleteMany();
    await prisma.event.deleteMany();
    await prisma.member.deleteMany();
    await prisma.role.deleteMany();
    console.log('✅ Eski veriler temizlendi');

    // Rolleri oluştur
    const roles = [
        { name: 'President', nameTr: 'Başkan', order: 1 },
        { name: 'Vice Leader', nameTr: 'Başkan Yardımcısı', order: 2 },
        { name: 'Management Team', nameTr: 'Yönetim Kurulu', order: 3 },
        { name: 'Social Media', nameTr: 'Sosyal Medya', order: 4 },
        { name: 'Developer', nameTr: 'Geliştirici', order: 4 },
        { name: 'Sponsor Finder', nameTr: 'Sponsor Sorumlusu', order: 5 },
        { name: 'Member', nameTr: 'Üye', order: 6 },
    ];

    const createdRoles = {};
    for (const role of roles) {
        const createdRole = await prisma.role.create({ data: role });
        createdRoles[role.name] = createdRole.id;
    }
    console.log('✅ Roller oluşturuldu');

    // Üyeleri oluştur
    const members = [
        {
            name: "Ahmet Yılmaz",
            roleId: createdRoles['President'],
            bio: "Haliç CODE topluluğunun kurucusu ve başkanı. Full-stack geliştirme ve topluluk yönetimi konusunda deneyimli.",
            linkedin: "https://linkedin.com/in/ahmetyilmaz",
            email: "ahmet@haliccode.com"
        },
        {
            name: "Ayşe Demir",
            roleId: createdRoles['Vice Leader'],
            bio: "Topluluk organizasyonlarından sorumlu başkan yardımcısı. Etkinlik planlama uzmanı.",
            twitter: "https://twitter.com/aysedemir",
            email: "ayse@haliccode.com"
        },
        {
            name: "Mehmet Kaya",
            roleId: createdRoles['Developer'],
            bio: "Yazılım ekibi lideri. React, Node.js ve Python konularında uzman.",
            linkedin: "https://linkedin.com/in/mehmetkaya",
            instagram: "https://instagram.com/mehmetkaya"
        },
        {
            name: "Zeynep Çelik",
            roleId: createdRoles['Social Media'],
            bio: "Sosyal medya hesaplarımızın yönetimi ve içerik üretimi.",
            instagram: "https://instagram.com/zeynepcelik"
        },
        {
            name: "Can Yıldız",
            roleId: createdRoles['Member'],
            bio: "Yeni teknolojiler öğrenmeye hevesli bilgisayar mühendisliği öğrencisi.",
            email: "can@haliccode.com"
        }
    ];

    for (const member of members) {
        await prisma.member.create({
            data: member
        });
    }
    console.log('✅ Üyeler eklendi');

    // Etkinlikleri oluştur
    const events = [
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
