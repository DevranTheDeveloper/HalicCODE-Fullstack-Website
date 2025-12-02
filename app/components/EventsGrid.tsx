'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useFormatter } from 'next-intl';

type Event = {
    id: number;
    title: string;
    description: string;
    date: Date | string;
    location: string | null;
    imageUrl: string | null;
    status: string;
    registrationLink: string | null;
};

export default function EventsGrid({ activeEvents, futureEvents, pastEvents }: { activeEvents: Event[], futureEvents: Event[], pastEvents: Event[] }) {
    const [hoveredEvent, setHoveredEvent] = useState<Event | null>(null);
    const [isClosing, setIsClosing] = useState(false);
    const t = useTranslations('Home');
    const format = useFormatter();

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setHoveredEvent(null);
            setIsClosing(false);
        }, 200); // Match animation duration
    };

    // Prevent body scroll when overlay is open
    useEffect(() => {
        if (hoveredEvent) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [hoveredEvent]);

    const isPastEvent = (event: Event) => {
        return new Date(event.date) < new Date();
    };

    return (
        <div className="space-y-16">
            {/* Full Screen Overlay for Hovered Event */}
            {hoveredEvent && (
                <div
                    className="fixed inset-0 z-[100] min-h-screen min-w-full flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={handleClose}
                >
                    <div
                        className={`bg-primary-dark border border-accent/50 rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl shadow-accent/20 relative flex flex-col md:flex-row max-h-[85vh] md:max-h-[90vh] ${isClosing ? 'animate-overlay-out' : 'animate-overlay-in'
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Full Sized Image Section */}
                        <div className="relative h-48 md:h-auto md:w-1/2 bg-gray-900 flex-shrink-0">
                            {hoveredEvent.imageUrl ? (
                                <Image
                                    src={hoveredEvent.imageUrl}
                                    alt={hoveredEvent.title}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-primary">
                                    <span className="text-6xl opacity-20">📅</span>
                                </div>
                            )}
                        </div>

                        {/* Info Section */}
                        <div className="p-6 md:p-8 md:w-1/2 flex flex-col bg-primary-dark overflow-hidden">
                            <div className="mb-4 flex-shrink-0">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${hoveredEvent.status === 'Active' ? 'bg-accent/20 text-accent' : 'bg-purple-500/20 text-purple-400'}`}>
                                    {hoveredEvent.status}
                                </span>
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{hoveredEvent.title}</h2>
                                <div className="flex items-center text-gray-400 text-sm gap-4">
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        {format.dateTime(new Date(hoveredEvent.date), { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        {hoveredEvent.location || 'Belirlenecek'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar min-h-0">
                                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                                    {hoveredEvent.description}
                                </p>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-800 flex-shrink-0">
                                {hoveredEvent.registrationLink && !isPastEvent(hoveredEvent) ? (
                                    <a
                                        href={hoveredEvent.registrationLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-accent hover:bg-accent-hover text-white font-bold py-3 px-4 rounded-lg transition-colors text-center"
                                    >
                                        {t('registerNow')}
                                    </a>
                                ) : (
                                    <button disabled className="w-full bg-gray-700 text-gray-400 font-bold py-3 px-4 rounded-lg cursor-not-allowed">
                                        {t('registrationClosed')}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Active Events */}
            <section>
                <div className="section-header">
                    <div className="section-indicator bg-accent" />
                    <h2 className="section-title">{t('activeEvents')}</h2>
                </div>

                {activeEvents.length > 0 ? (
                    <div className="events-grid mb-8">
                        {activeEvents.map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                type="active"
                                onHover={() => setHoveredEvent(event)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <p className="text-gray-400">{t('noActiveEvents')}</p>
                    </div>
                )}
            </section>

            {/* Future Events */}
            <section>
                <div className="section-header">
                    <div className="section-indicator bg-purple-500" />
                    <h2 className="section-title">{t('futureEvents')}</h2>
                </div>

                {futureEvents.length > 0 ? (
                    <div className="events-grid">
                        {futureEvents.map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                type="future"
                                onHover={() => setHoveredEvent(event)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <p className="text-gray-400">{t('noFutureEvents')}</p>
                    </div>
                )}
            </section>

            {/* Past Events */}
            <section>
                <div className="section-header">
                    <div className="section-indicator bg-gray-500" />
                    <h2 className="section-title">{t('pastEvents')}</h2>
                </div>

                {pastEvents.length > 0 ? (
                    <div className="events-grid">
                        {pastEvents.map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                type="past"
                                onHover={() => setHoveredEvent(event)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <p className="text-gray-400">{t('noPastEvents')}</p>
                    </div>
                )}
            </section>
        </div>
    );
}

function EventCard({ event, type, onHover }: { event: Event, type: 'active' | 'future' | 'past', onHover: () => void }) {
    const format = useFormatter();

    return (
        <div
            className="event-card group cursor-pointer"
            onClick={onHover}
        >
            <div className="event-image-wrapper">
                {/* Shadow Overlay - Top and Bottom Dark Blue Shadows */}
                <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_20px_30px_-10px_rgba(2,6,23,0.8),inset_0_-20px_30px_-10px_rgba(2,6,23,0.8)]"></div>

                {event.imageUrl ? (
                    <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        className="event-image"
                    />
                ) : (
                    <div className={`event-placeholder ${type === 'active' ? 'bg-gradient-to-br from-blue-900 to-primary' : 'bg-gradient-to-br from-purple-900 to-primary'}`}>
                        <span className="text-4xl opacity-20">📅</span>
                    </div>
                )}
                <div className="event-date-badge">
                    {format.dateTime(new Date(event.date), { month: 'short', day: 'numeric' })}
                </div>
            </div>

            <div className="event-content">
                <h3 className="event-title">
                    {event.title}
                </h3>
                <p className="event-description">
                    {event.description}
                </p>

                <div className="event-footer">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location || 'Belirlenecek'}
                </div>
            </div>
        </div>
    );
}
