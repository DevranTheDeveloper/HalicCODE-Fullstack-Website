'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-primary-dark">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-white mb-4">404</h1>
                <p className="text-xl text-gray-400 mb-8">Sayfa bulunamadı / Page not found</p>
                <Link
                    href="/"
                    className="bg-accent hover:bg-accent-hover text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                    Ana Sayfaya Dön / Return Home
                </Link>
            </div>
        </div>
    );
}
