const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const password = 'password123'; // Default password for all
    const hashedPassword = await bcrypt.hash(password, 10);

    const admins = [
        { username: 'admin', role: 'SUPER_ADMIN', password: hashedPassword },
        { username: 'memberadmin', role: 'MEMBER_MANAGER', password: hashedPassword },
        { username: 'eventadmin', role: 'EVENT_MANAGER', password: hashedPassword },
        { username: 'newsadmin', role: 'NEWS_MANAGER', password: hashedPassword },
    ];

    console.log('Seeding admin users...');

    for (const admin of admins) {
        const exists = await prisma.adminUser.findUnique({
            where: { username: admin.username },
        });

        if (!exists) {
            await prisma.adminUser.create({
                data: admin,
            });
            console.log(`Created user: ${admin.username}`);
        } else {
            console.log(`User already exists: ${admin.username}`);
        }
    }

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
