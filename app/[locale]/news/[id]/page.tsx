import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';

const prisma = new PrismaClient();

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const newsId = parseInt(id);
    const locale = await getLocale();

    if (isNaN(newsId)) {
        notFound();
    }

    const news = await prisma.news.findUnique({
        where: { id: newsId },
    });

    if (!news) {
        notFound();
    }

    // Parse translations
    const getLocalizedContent = (content: string, translations: string | null) => {
        if (!translations) return content;
        try {
            const parsed = JSON.parse(translations);
            return parsed[locale] || content;
        } catch (e) {
            return content;
        }
    };

    const title = getLocalizedContent(news.title, news.titleTranslations);
    const content = getLocalizedContent(news.content, news.contentTranslations);

    // Parse photos from JSON
    const photos = news.photos ? JSON.parse(news.photos) : [];

    return (
        <div className="relative min-h-screen">
            {/* Hero Header */}
            <div className="relative h-[60vh] min-h-[400px]">
                {news.imageUrl ? (
                    <Image
                        src={news.imageUrl}
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-primary to-accent" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                {/* Back Button */}
                <div className="absolute top-8 left-8 z-10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light/80 backdrop-blur-sm border border-gray-700 rounded-lg text-white hover:bg-primary-light transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Ana Sayfaya Dön
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 -mt-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="bg-primary-light rounded-2xl border border-gray-800 p-8 md:p-12 shadow-2xl">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-8 w-1 bg-accent rounded-full" />
                            <span className="text-gray-400 text-sm">
                                {new Date(news.date).toLocaleDateString(locale === 'tr' ? 'tr-TR' : locale, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            {title}
                        </h1>
                    </div>

                    {/* Content */}
                    <div className="prose prose-invert prose-lg max-w-none mb-12">
                        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                            {content}
                        </p>
                    </div>

                    {/* Photo Gallery */}
                    {photos.length > 0 && (
                        <div className="border-t border-gray-800 pt-8">
                            <h2 className="text-2xl font-bold text-white mb-6">Fotoğraf Galerisi</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {photos.map((photo: string, index: number) => (
                                    <div
                                        key={index}
                                        className="relative aspect-video rounded-xl overflow-hidden bg-primary-dark border border-gray-700 hover:border-accent/50 transition-colors group"
                                    >
                                        <Image
                                            src={photo}
                                            alt={`${title} - Fotoğraf ${index + 1}`}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="mt-12 pt-8 border-t border-gray-800">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Tüm Haberlere Dön
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
