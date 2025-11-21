import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
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
                            <Link
                                href="/"
                                className="nav-link"
                            >
                                Home
                            </Link>
                            <Link
                                href="/members"
                                className="nav-link"
                            >
                                Members
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button (Placeholder) */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            type="button"
                            className="bg-primary-light inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
