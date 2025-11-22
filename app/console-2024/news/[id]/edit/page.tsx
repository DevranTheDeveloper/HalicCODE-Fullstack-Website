import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import EditNewsForm from './EditNewsForm';

const prisma = new PrismaClient();

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const newsId = parseInt(id);

    if (isNaN(newsId)) {
        notFound();
    }

    const newsItem = await prisma.news.findUnique({
        where: { id: newsId },
    });

    if (!newsItem) {
        notFound();
    }

    return <EditNewsForm newsItem={newsItem} />;
}
