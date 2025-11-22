'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { updateNews } from '../../../../actions';

type NewsItem = {
    id: number;
    title: string;
    content: string;
    imageUrl: string | null;
    photos: string;
    date: Date;
};

export default function EditNewsPage({ newsItem }: { newsItem: NewsItem }) {
    const [photos, setPhotos] = useState<string[]>([]);
    const [newPhotoUrl, setNewPhotoUrl] = useState('');

    useEffect(() => {
        // Parse existing photos
        try {
            const existingPhotos = newsItem.photos ? JSON.parse(newsItem.photos) : [];
            setPhotos(existingPhotos);
        } catch {
            setPhotos([]);
        }
    }, [newsItem.photos]);

    const handleAddPhoto = () => {
        if (newPhotoUrl.trim()) {
            setPhotos([...photos, newPhotoUrl.trim()]);
            setNewPhotoUrl('');
        }
    };

    const handleRemovePhoto = (index: number) => {
        setPhotos(photos.filter((_, i) => i !== index));
    };

    const handleSubmit = async (formData: FormData) => {
        formData.append('photos', JSON.stringify(photos));
        await updateNews(newsItem.id, formData);
    };

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <Link href="/console-2024" className="text-accent hover:text-accent-hover text-sm mb-2 inline-block">
                    &larr; Yöneticiye Dön
                </Link>
                <h1 className="text-3xl font-bold text-white">Haberi Düzenle</h1>
            </div>

            <form action={handleSubmit} className="space-y-6 bg-primary-light p-8 rounded-xl border border-gray-800">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                        Başlık
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
                        İçerik
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
                        Tarih
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
                        Kapak Fotoğrafı URL <span className="text-gray-500">(İlk görünen resim)</span>
                    </label>
                    <input
                        type="url"
                        name="imageUrl"
                        id="imageUrl"
                        defaultValue={newsItem.imageUrl || ''}
                        className="w-full bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    />
                </div>

                {/* Ek Fotoğraflar Bölümü */}
                <div className="border-t border-gray-700 pt-6">
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                        Ek Fotoğraflar <span className="text-gray-500">(Detay sayfasında gösterilecek)</span>
                    </label>

                    {/* Fotoğraf Ekleme Input */}
                    <div className="flex gap-2 mb-4">
                        <input
                            type="url"
                            value={newPhotoUrl}
                            onChange={(e) => setNewPhotoUrl(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddPhoto())}
                            className="flex-1 bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                            placeholder="Fotoğraf URL'si girin..."
                        />
                        <button
                            type="button"
                            onClick={handleAddPhoto}
                            className="bg-accent hover:bg-accent-hover text-white px-6 py-2 rounded-lg transition-colors font-medium"
                        >
                            + Fotoğraf Ekle
                        </button>
                    </div>

                    {/* Eklenmiş Fotoğraflar Listesi */}
                    {photos.length > 0 && (
                        <div className="space-y-2">
                            {photos.map((photo, index) => (
                                <div key={index} className="flex items-center gap-2 bg-primary-dark p-3 rounded-lg border border-gray-700">
                                    <div className="flex-1 flex items-center gap-2">
                                        <span className="text-gray-400 text-sm">#{index + 1}</span>
                                        <span className="text-white text-sm truncate">{photo}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemovePhoto(index)}
                                        className="text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        Sil
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {photos.length === 0 && (
                        <p className="text-gray-500 text-sm text-center py-4">Henüz ek fotoğraf eklenmedi</p>
                    )}
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3 px-4 rounded-lg transition-colors"
                    >
                        Güncelle
                    </button>
                </div>
            </form>
        </div>
    );
}
