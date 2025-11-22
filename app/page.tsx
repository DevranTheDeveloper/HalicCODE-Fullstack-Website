import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

import EventsGrid from './components/EventsGrid';
import NewsSection from './components/NewsSection';
import Starfield from '../components/Starfield';

const prisma = new PrismaClient();

async function getEvents() {
  const activeEvents = await prisma.event.findMany({
    where: { status: 'Active' },
    orderBy: { date: 'asc' },
  });
  const futureEvents = await prisma.event.findMany({
    where: { status: 'Future' },
    orderBy: { date: 'asc' },
  });
  return { activeEvents, futureEvents };
}

export default async function Home() {
  const { activeEvents, futureEvents } = await getEvents();

  return (
    <div className="flex flex-col pb-16">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/90 via-primary/95 to-background z-10" />
          <div className="absolute inset-0 bg-grid-pattern z-10 opacity-30" />

          {/* Ambient Blobs */}
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 blob-shape animate-blob z-10"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-accent blob-shape animate-blob animation-delay-2000 z-10"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-600 blob-shape animate-blob animation-delay-4000 z-10"></div>

          {/* Huge centered logo behind everything */}
          <div className="hero-logo-bg">
            <div className="hero-logo-img-container">
              <Image
                src="/logo2.png"
                alt="Haliç CODE Logo Background"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        <div className="hero-content">
          <div className="relative">
            <div className="absolute -inset-1 opacity-25 animate-pulse"></div>
            <h1 className="hero-title relative">
              Haliç CODE
            </h1>
          </div>
          <p className="hero-subtitle">
            Community Of Developer Engineers
          </p>
          <div className="hero-actions">
            <Link
              href="/members"
              className="btn-primary"
            >
              Üyelerimizle Tanışın
            </Link>
            <a
              href="#events"
              className="btn-secondary"
            >
              Etkinlikleri Gör
            </a>
          </div>
        </div>
      </section>

      {/* Content Overlay */}
      <div className="relative z-10 bg-background space-y-16 pt-16 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <Starfield />
        {/* Features / What We Do Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-primary-light/50 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl hover:border-purple-500/50 transition-colors group">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Projeler Geliştirin</h3>
              <p className="text-gray-400">Gerçek dünya projelerinde işbirliği yapın ve öğrenci arkadaşlarınızla portföyünüzü oluşturun.</p>
            </div>
            <div className="bg-primary-light/50 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl hover:border-accent/50 transition-colors group">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Birlikte Öğrenin</h3>
              <p className="text-gray-400">Yeni teknolojilerde uzmanlaşmak için atölyelere, hackathonlara ve çalışma gruplarına katılın.</p>
            </div>
            <div className="bg-primary-light/50 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl hover:border-blue-500/50 transition-colors group">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ağ Kurun</h3>
              <p className="text-gray-400">Kariyerinizi büyütmek için sektör profesyonelleri ve benzer düşünen akranlarınızla bağlantı kurun.</p>
            </div>
          </div>
        </section>

        {/* News Section */}
        <NewsSection />

        {/* Events Section */}
        <div id="events" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16">
          <EventsGrid activeEvents={activeEvents} futureEvents={futureEvents} />
        </div>
      </div>
    </div>
  );
}
