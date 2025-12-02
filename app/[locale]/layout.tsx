import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Haliç CODE - Community Of Developer Engineers",
  description: "Official website of Haliç University CODE community.",
  icons: {
    icon: '/logo2.png',
  },
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Chatbot />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
