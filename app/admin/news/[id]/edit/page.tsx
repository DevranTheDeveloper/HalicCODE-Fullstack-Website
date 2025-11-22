import { updateNews } from '../../../../actions';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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

    const updateNewsWithId = updateNews.bind(null, newsId);

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <Link href="/admin" className="text-accent hover:text-accent-hover text-sm mb-2 inline-block">
                    &larr; Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold text-white">Edit News</h1>
            </div>

            <form action={updateNewsWithId} className="space-y-6 bg-primary-light p-8 rounded-xl border border-gray-800">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        defaultValue={newsItem.title}
                        required
                        className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">
                        Content
                    </label>
                    <textarea
                        name="content"
                        id="content"
                        defaultValue={newsItem.content}
                        required
                        rows={6}
                        className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    />
                </div>

                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
                        Date
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            required
                            defaultValue={newsItem.date.toISOString().split('T')[0]}
                            className="w-full bg-primary-dark border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all cursor-pointer"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-1">
                        Image URL (Optional)
                    </label>
                    <input
                        type="url"
                        name="imageUrl"
                        id="imageUrl"
                        defaultValue={newsItem.imageUrl || ''}
                        className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3 px-4 rounded-lg transition-colors"
                    >
                        Update News
                    </button>
                </div>
            </form>
        </div>
    );
}
