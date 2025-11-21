import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

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
              Meet Our Members
            </Link>
            <a
              href="#events"
              className="btn-secondary"
            >
              See Events
            </a>
          </div>
        </div>
      </section>

      {/* Content Overlay */}
      <div className="relative z-10 bg-background space-y-16 pt-16 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        {/* Features / What We Do Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-primary-light/50 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl hover:border-purple-500/50 transition-colors group">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Build Projects</h3>
              <p className="text-gray-400">Collaborate on real-world projects and build your portfolio with fellow students.</p>
            </div>
            <div className="bg-primary-light/50 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl hover:border-accent/50 transition-colors group">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Learn Together</h3>
              <p className="text-gray-400">Participate in workshops, hackathons, and study groups to master new technologies.</p>
            </div>
            <div className="bg-primary-light/50 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl hover:border-blue-500/50 transition-colors group">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Network</h3>
              <p className="text-gray-400">Connect with industry professionals and like-minded peers to grow your career.</p>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <div id="events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16">

          {/* Active Events */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-8 w-1 bg-accent rounded-full" />
              <h2 className="text-3xl font-bold text-white">Active Events</h2>
            </div>

            {activeEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {activeEvents.map((event) => (
                  <EventCard key={event.id} event={event} type="active" />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-primary-light/30 rounded-2xl border border-dashed border-gray-700">
                <p className="text-gray-400">No active events at the moment.</p>
              </div>
            )}
          </section>

          {/* Future Events */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-8 w-1 bg-purple-500 rounded-full" />
              <h2 className="text-3xl font-bold text-white">Future Events</h2>
            </div>

            {futureEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {futureEvents.map((event) => (
                  <EventCard key={event.id} event={event} type="future" />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-primary-light/30 rounded-2xl border border-dashed border-gray-700">
                <p className="text-gray-400">Stay tuned for future events!</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function EventCard({ event, type }: { event: any, type: 'active' | 'future' }) {
  return (
    <div className="group bg-primary-light border border-gray-800 rounded-2xl overflow-hidden hover:border-accent/50 transition-all hover:shadow-xl hover:shadow-accent/10 flex flex-col h-full">
      <div className="relative h-48 w-full bg-gray-800">
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${type === 'active' ? 'bg-gradient-to-br from-blue-900 to-primary' : 'bg-gradient-to-br from-purple-900 to-primary'}`}>
            <span className="text-4xl opacity-20">📅</span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-white/10">
          {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
          {event.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
          {event.description}
        </p>

        <div className="flex items-center text-sm text-gray-500 mt-auto pt-4 border-t border-gray-800">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {event.location || 'TBA'}
        </div>
      </div>
    </div>
  );
}
