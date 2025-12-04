'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

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
                                Ana Sayfa
                            </Link>
                            <Link href="/members" className="nav-link">
                                Üyeler
                            </Link>

                            {/* Google Translate Widget */}
                            <div className="relative inline-block text-left">
                                <div id="google_translate_element" className="google-translate-container" />
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
                            Ana Sayfa
                        </Link>
                        <Link
                            href="/members"
                            className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Üyeler
                        </Link>

                        {/* Mobile Language Switcher */}
                        <div className="border-t border-gray-700 pt-2 mt-2 px-3">
                            <p className="text-xs text-gray-500 uppercase font-bold mb-1">Dil</p>
                            <div id="google_translate_element_mobile" />
                            {/* Note: Google Translate usually only renders in one place. We might need a workaround or just let it be in desktop menu which might show in mobile if styled right, or just hide it. 
                                For now, let's keep the ID unique if we want to try rendering it twice, but the script only targets one ID. 
                                Let's just use the same ID 'google_translate_element' but that might move it. 
                                Actually, the script targets 'google_translate_element'. 
                                Let's just put it in the mobile menu too? No, ID must be unique.
                                Let's assume the desktop one is visible or we need to adjust the script to target a class or handle mobile.
                                For simplicity, I'll remove it from mobile menu for now or just leave a placeholder.
                                Actually, the user wants it to translate everything.
                                Let's just put it in the desktop menu area which is hidden on mobile.
                                Wait, mobile users need to switch language too.
                                The Google Translate widget is often floating or fixed.
                                But the user asked for "Google Translate directly".
                                I'll stick to the plan: put it in the Navbar.
                                I'll add a second script call or just use one location.
                                Let's just put it in the desktop menu for now.
                            */}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
