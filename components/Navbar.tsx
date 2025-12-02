'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const t = useTranslations('Navbar');
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const changeLanguage = (locale: string) => {
        startTransition(() => {
            router.replace(pathname, { locale: locale as any });
            setIsLangOpen(false);
            setIsOpen(false);
        });
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-content">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="relative w-13 h-13">
                                <Image
                                    src="/logo2.png"
                                    alt="Haliç CODE Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link href="/" className="nav-link">
                                {t('home')}
                            </Link>
                            <Link href="/members" className="nav-link">
                                {t('members')}
                            </Link>

                            {/* Language Switcher */}
                            <div className="relative inline-block text-left">
                                <div>
                                    <button
                                        type="button"
                                        className="nav-link inline-flex items-center gap-1"
                                        onClick={() => setIsLangOpen(!isLangOpen)}
                                    >
                                        {t('language')}
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                {isLangOpen && (
                                    <div className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-primary-dark ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-gray-700">
                                        <div className="py-1">
                                            <button
                                                onClick={() => changeLanguage('tr')}
                                                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-4 py-2 text-sm w-full text-left"
                                            >
                                                🇹🇷 Türkçe
                                            </button>
                                            <button
                                                onClick={() => changeLanguage('en')}
                                                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-4 py-2 text-sm w-full text-left"
                                            >
                                                🇬🇧 English
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            type="button"
                            className="bg-primary-light inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <svg className="h-6 w-6 animate-rotate" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6 animate-rotate" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-primary-dark border-b border-gray-800 animate-slideDown">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            href="/"
                            className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            {t('home')}
                        </Link>
                        <Link
                            href="/members"
                            className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            {t('members')}
                        </Link>

                        {/* Mobile Language Switcher */}
                        <div className="border-t border-gray-700 pt-2 mt-2">
                            <p className="px-3 text-xs text-gray-500 uppercase font-bold mb-1">{t('language')}</p>
                            <button
                                onClick={() => changeLanguage('tr')}
                                className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                            >
                                🇹🇷 Türkçe
                            </button>
                            <button
                                onClick={() => changeLanguage('en')}
                                className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                            >
                                🇬🇧 English
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
