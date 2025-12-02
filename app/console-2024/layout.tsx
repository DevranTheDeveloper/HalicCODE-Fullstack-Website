import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Haliç CODE - Admin Panel",
    description: "Admin panel for Haliç CODE community.",
    icons: {
        icon: '/logo2.png',
    },
};

export const dynamic = 'force-dynamic';

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr">
            <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground antialiased`}>
                <Navbar />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
                <Chatbot />
            </body>
        </html>
    );
}
