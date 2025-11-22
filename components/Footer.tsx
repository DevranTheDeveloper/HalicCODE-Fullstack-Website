import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="relative w-10 h-10">
                                <Image
                                    src="/logo2.png"
                                    alt="Haliç CODE Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-white">Haliç CODE</h3>
                        </div>
                        <p className="footer-text max-w-xs">
                            Teknolojinin geleceğini, her seferinde bir satır kodla inşa ediyoruz. Geliştiriciler ve mühendisler topluluğumuza katılın.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="footer-title">Hızlı Bağlantılar</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="footer-link flex items-center gap-2">
                                    <span className="text-accent">›</span> Ana Sayfa
                                </Link>
                            </li>
                            <li>
                                <Link href="/members" className="footer-link flex items-center gap-2">
                                    <span className="text-accent">›</span> Üyeler
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Socials */}
                    <div>
                        <h3 className="footer-title">Bize Ulaşın</h3>
                        <div className="space-y-4">
                            {/* Email */}
                            <a href="mailto:haliccode@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center border border-gray-800 group-hover:border-accent/50 transition-colors">
                                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span>code@halic.edu.tr</span>
                            </a>

                            {/* Social Icons */}
                            <div className="flex gap-4">
                                <a href="https://www.instagram.com/haliccode/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center border border-gray-800 hover:border-[#E1306C] hover:bg-[#E1306C]/10 hover:text-[#E1306C] text-gray-400 transition-all">
                                    <span className="sr-only">Instagram</span>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.225-.149-4.771-1.664-4.919-4.919-.058-1.265-.069-1.644-.069-4.849 0-3.204.012-3.584.069-4.849.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                </a>
                                <a href="https://www.linkedin.com/company/haliccode/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center border border-gray-800 hover:border-[#0077b5] hover:bg-[#0077b5]/10 hover:text-[#0077b5] text-gray-400 transition-all">
                                    <span className="sr-only">LinkedIn</span>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Haliç CODE. Tüm hakları saklıdır.</p>
                    <p>Haliç CODE Ekibi tarafından tasarlandı ve geliştirildi</p>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-xs text-primary-dark select-all">Made By DevranTheDeveloper</p>
                </div>
            </div>
        </footer>
    );
}
