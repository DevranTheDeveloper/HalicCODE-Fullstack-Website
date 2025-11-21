const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const members = []
    for (let i = 1; i <= 48; i++) {
        members.push({
            name: `Member ${i}`,
            role: 'Member',
            bio: 'Member of Haliç CODE',
        })
    }

    await prisma.member.createMany({
        data: members,
    })

    await prisma.event.create({
        data: {
            title: 'Haliç CODE Meetup',
            description: 'Our weekly community meetup to discuss tech and projects.',
            date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            status: 'Active',
            location: 'Haliç University',
        },
    })

    await prisma.event.create({
        data: {
            title: 'Future Tech Talk',
            description: 'An upcoming talk about the future of AI.',
            date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            status: 'Future',
            location: 'Online',
        },
    })

    console.log('Seeding completed.')
}

main()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
