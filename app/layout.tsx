import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Haliç CODE - Community Of Developer Engineers",
  description: "Official website of Haliç University CODE community.",
  icons: {
    icon: '/logo2.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground antialiased`}>
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
