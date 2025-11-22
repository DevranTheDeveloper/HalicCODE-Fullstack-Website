const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    console.log('🔄 Migration: Rolleri veritabanına ekleme...')

    // Varsayılan rolleri oluştur
    const roles = [
        { name: 'Head', nameTr: 'Lider', order: 1 },
        { name: 'Social Media', nameTr: 'Sosyal Medya', order: 2 },
        { name: 'Sponsor Finder', nameTr: 'Sponsor Sorumlusu', order: 3 },
        { name: 'Member', nameTr: 'Üye', order: 4 }
    ];

    for (const roleData of roles) {
        await prisma.role.upsert({
            where: { name: roleData.name },
            update: {},
            create: roleData
        });
    }

    console.log('✅ Varsayılan roller eklendi!')
}

main()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
