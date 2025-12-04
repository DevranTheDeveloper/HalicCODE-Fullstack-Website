'use client';

import Image from 'next/image';
import Link from 'next/link';

type NewsItem = {
    id: number;
    title: string;
    content: string;
    imageUrl: string | null;
    date: Date;
};

export default function NewsSection({ news }: { news: NewsItem[] }) {

    if (news.length === 0) {
        return null;
    }

    return (
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16">
            <div className="flex items-center gap-4 mb-8">
                <div className="h-8 w-1 bg-blue-500 rounded-full" />
                <h2 className="text-3xl font-bold text-white">CODE Haberler</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {news.map((item) => (
                    <Link
                        key={item.id}
                        href={`/news/${item.id}`}
                        className="bg-primary-light border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/10 flex flex-col h-full group cursor-pointer"
                    >
                        <div className="relative h-48 w-full bg-gray-800 overflow-hidden">
                            {item.imageUrl ? (
                                <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-primary">
                                    <span className="text-4xl opacity-20">📰</span>
                                </div>
                            )}
                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-white/10">
                                {new Date(item.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
                                {item.content}
                            </p>
                            <div className="flex items-center gap-2 text-blue-400 text-sm font-medium group-hover:gap-3 transition-all">
                                <span>Devamını Oku</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
